import { FormattedDate, Tooltip } from "@core/components";
import { getUsersCountMetrics } from "@core/lib";
import { useEffect, useState } from "react";

const UsersStatCard = ({interval}) => {
    const [usersCount, setUsersCount] = useState(0)
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        async function loadOnlineMetrics(interval) {
            const data = await getUsersCountMetrics(interval.type, interval.multiplier);
            console.log(data)
            setMetrics(data);
            setUsersCount(data.standartsUsersCount);
        }

        loadOnlineMetrics(interval)
    }, [interval])

    const onlineMetricsText = `Всего пользователей: ${metrics?.usersCount} 
        Зарегистрированных пользователей: ${metrics?.standartsUsersCount}
        Временных пользователей: ${metrics?.tempUsersCount}

        Показатели: (${interval.title})
        Все пользователи: ${metrics?.usersChange > 0 ? "+" : "-"}${metrics?.usersChange}
        Зарегистрированные пользователи: ${metrics?.standardUsersChange > 0 ? "+" : "-"}${metrics?.standardUsersChange}
        Временные пользователи: ${metrics?.tempUsersChange > 0 ? "+" : "-"}${metrics?.tempUsersChange}
    `

    return (
        <div className="stat-card">
            <div className="stat-card__title">Пользователи</div>
            <Tooltip text={onlineMetricsText}>
                <div className="stat-card__value">{usersCount}</div>
            </Tooltip>
            <div className={`stat-card__change ${metrics.standardUsersChange > 0 ? "positive" : "negative"}`}>
                <i className={`fa-solid fa-arrow-${metrics.standardUsersChange > 0 ? "up" : "down"}`}></i>
                <span>{(metrics.standardUsersChange / metrics.standartsUsersCount * 100).toFixed(0)}%</span>
            </div>
            {/* <FormattedDate isoDate={metrics?.peakDay} format="DM"/> */}
        </div>
    );
};

export default UsersStatCard;