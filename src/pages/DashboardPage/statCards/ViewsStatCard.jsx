import { FormattedDate, Tooltip } from "@core/components";
import { getViewsCountMetrics } from "@core/lib";
import { useEffect, useState } from "react";

const ViewsStatCard = ({interval}) => {
    const [viewsCount, setViewsCount] = useState(0)
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        async function loadOnlineMetrics(interval) {
            const data = await getViewsCountMetrics(interval.type, interval.multiplier);
            console.log(data)
            setMetrics(data);
            setViewsCount(data.viewsCount);
        }

        loadOnlineMetrics(interval)
    }, [interval])

    const onlineMetricsText = `Всего просмотров: ${metrics?.viewsCount} 
        Просмотры от обычных пользователей: ${metrics?.standartsUsersViewsCount}
        Просмотры от временных пользователей: ${metrics?.tempUsersViewsCount}

        Показатели: (${interval.title})
        Все просмотры: ${metrics?.viewsChange > 0 ? "+" : "-"}${metrics?.viewsChange}
        Просмотры от обычных пользователей: ${metrics?.standardUsersViewsChange > 0 ? "+" : "-"}${metrics?.standardUsersViewsChange}
        Просмотры от временных пользователей: ${metrics?.tempUsersViewsChange > 0 ? "+" : "-"}${metrics?.tempUsersViewsChange}
    `

    return (
        <div className="stat-card">
            <div className="stat-card__title">Просмотры</div>
            <Tooltip text={onlineMetricsText}>
                <div className="stat-card__value">{viewsCount}</div>
            </Tooltip>
            <div className={`stat-card__change ${metrics.viewsChange > 0 ? "positive" : "negative"}`}>
                <i className={`fa-solid fa-arrow-${metrics.viewsChange > 0 ? "up" : "down"}`}></i>
                <span>{(metrics.viewsChange / metrics.viewsCount * 100).toFixed(0)}%</span>
            </div>
            {/* <FormattedDate isoDate={metrics?.peakDay} format="DM"/> */}
        </div>
    );

};

export default ViewsStatCard;