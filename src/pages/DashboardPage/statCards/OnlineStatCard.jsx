import {
    FormattedDate,
    Tooltip
} from "@core/components";
import { getOnlineMetricsMonthly, getOnline } from "@core/lib";
import { useEffect, useState } from "react";

const OnlineStatCard = () => {
    const [online, setOnline] = useState(0)
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        async function loadOnline() {
            const data = await getOnline();
            setOnline(data)
        }

        function loop() {
            loadOnline();
            setTimeout(loop, 5000);
        }
        
        async function loadOnlineMetrics() {
            const data = await getOnlineMetricsMonthly();
            setMetrics(data)
        }

        loop();
        loadOnlineMetrics()
    }, [])

    const onlineMetricsText = `
        Минимальный онлайн: ${metrics?.minOnline} 
        Максимальный онлайн: ${metrics?.maxOnline}
        Медиана(типичный онлайн): ${metrics?.medianOnline}
        Средний онлайн за месяц: ${metrics?.avgOnline?.toFixed(1)}
        (p95) Онлайн, который почти никогда не превышается: ${metrics?.p95Online}
        Стандартное отклонение: ${metrics?.stdDeviation?.toFixed(1)}

        Часы онлайна за месяц: ${metrics?.totalUserHours}

        Дата максимального онлайна: ${metrics?.peakDay} ${metrics?.peakHour}:00
    `

    return (
        <div className="stat-card">
            <div className="stat-card__title">Онлайн</div>
            <Tooltip text={onlineMetricsText}>
                <div className="stat-card__value">{online}</div>
            </Tooltip>
            {/* <div className={`stat-card-change ${isPositive ? "positive" : "negative"}`}>
                <i className={`fa-solid ${isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}></i> {changePercent} за месяц
            </div> */}
            {/* <FormattedDate isoDate={metrics?.peakDay} format="DM"/> */}
        </div>
    );
};

export default OnlineStatCard;