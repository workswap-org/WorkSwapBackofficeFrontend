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
            setOnline(data.online)
        }

        function loop() {
            loadOnline();
            setTimeout(loop, 5000);
        }
        
        async function loadOnlineMetrics() {
            const data = await getOnlineMetricsMonthly();
            setMetrics(data.metrics)
            console.log(data)
        }

        loop();
        loadOnlineMetrics()
    }, [])

    return (
        <div className="stat-card">
            <div className="stat-card__title">Онлайн</div>
            <Tooltip text="Текущий онлайн">
                <div className="stat-card__value">{online}</div>
            </Tooltip>
            {/* <div className={`stat-card-change ${isPositive ? "positive" : "negative"}`}>
                <i className={`fa-solid ${isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}></i> {changePercent} за месяц
            </div> */}
            {metrics && (
                <>
                    <div className="metrics-container">
                        <Tooltip text="Минимальный / максимальный онлайн за месяц">
                            <div>{metrics?.minOnline} / {metrics?.maxOnline}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="Медиана(типичный онлайн)">
                            <div>{metrics?.medianOnline}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="Средний онлайн за месяц">
                            <div>{metrics?.avgOnline?.toFixed(1)}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="(p95) Онлайн, который почти никогда не превышается">
                            <div>{metrics?.p95Online}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="Стандартное отклонение">
                            <div>{metrics?.stdDeviation?.toFixed(1)}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="Часы онлайна за месяц">
                            <div>{metrics?.totalUserHours}</div>
                        </Tooltip>
                    </div>
                    <div className="metrics-container">
                        <Tooltip text="Час пика онлайна">
                            <div>{metrics?.peakHour}</div>
                        </Tooltip>
                        <div className="divider">|</div>
                        <Tooltip text="День пика онлайна">
                            <FormattedDate isoDate={metrics?.peakDay} format="DM"/>
                        </Tooltip>
                    </div>
                </>
            )}
        </div>
    );
};

export default OnlineStatCard;