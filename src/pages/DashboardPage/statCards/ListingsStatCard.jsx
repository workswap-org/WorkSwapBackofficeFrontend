import { FormattedDate, Tooltip } from "@core/components";
import { getListingsCountMetrics } from "@core/lib";
import { useEffect, useState } from "react";

const ListingsStatCard = ({interval}) => {
    const [listingsCount, setListingsCount] = useState(0)
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        async function loadOnlineMetrics(interval) {
            const data = await getListingsCountMetrics(interval.type, interval.multiplier);
            console.log(data)
            setMetrics(data);
            setListingsCount(data.publishedListingsCount);
        }

        loadOnlineMetrics(interval)
    }, [interval])

    const onlineMetricsText = `Всего объявлений: ${metrics?.listingsCount} 
        Активных объявлений: ${metrics?.publishedListingsCount}
        Черновиков объявлений: ${metrics?.temporaryListingsCount}

        Показатели: (${interval.title})
        Все объявления: ${metrics?.listingsChange > 0 ? "+" : "-"}${metrics?.listingsChange}
        Активных объявлений: ${metrics?.publishedListingsChange > 0 ? "+" : "-"}${metrics?.publishedListingsChange}
        Черновиков объявлений: ${metrics?.temporaryListingsChange > 0 ? "+" : "-"}${metrics?.temporaryListingsChange}
    `

    return (
        <div className="stat-card">
            <div className="stat-card__title">Объявления</div>
            <Tooltip text={onlineMetricsText}>
                <div className="stat-card__value">{listingsCount}</div>
            </Tooltip>
            <div className={`stat-card__change ${metrics.standardUsersChange > 0 ? "positive" : "negative"}`}>
                <i className={`fa-solid fa-arrow-${metrics.standardUsersChange > 0 ? "up" : "down"}`}></i>
                <span>{(metrics.standardUsersChange / metrics.standartsUsersCount * 100).toFixed(0)}%</span>
            </div>
            {/* <FormattedDate isoDate={metrics?.peakDay} format="DM"/> */}
        </div>
    );
};

export default ListingsStatCard;