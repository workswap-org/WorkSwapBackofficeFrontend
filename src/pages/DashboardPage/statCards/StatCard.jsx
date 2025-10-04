import { useState } from "react";
import Tooltip from "@/components/small-components/Tooltip";

const StatCard = ({ value, metrics, title }) => {
    const [changePercent, setChangePercent] = useState("0%");
    const [isPositive, setIsPositive] = useState(true);

    return (
        <div className="stat-card">
            <div className="stat-card-title">{title}</div>
            <Tooltip text="Метрика">
                <div className="stat-card-value">{value}</div>
            </Tooltip>
            <div className={`stat-card-change ${isPositive ? "positive" : "negative"}`}>
                <i className={`fa-solid ${isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}></i> {changePercent} за месяц
            </div>
        </div>
    );
};

export default StatCard;