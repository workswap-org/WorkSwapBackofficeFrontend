import { useState, useEffect } from "react";

const StatCard = ({ code, title }) => {
    const [value, setValue] = useState("0");
    const [changePercent, setChangePercent] = useState("0%");
    const [isPositive, setIsPositive] = useState(true);

    useEffect(() => {
        // Подставь реальный URL API
        fetch(`/api/stats/monthly/${code}`, {
            method: "GET",
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка запроса статистики");
                return res.json();
            })
            .then(data => {
                // Предполагаем, что сервер возвращает объект { value, changePercent, isPositive }
                setValue(data.value);
                setChangePercent(data.changePercent);
                setIsPositive(data.isPositive);
            })
            .catch(err => {
                console.error(err);
                // Можно задать fallback
                setValue("0");
                setChangePercent("0%");
                setIsPositive(true);
            });
    }, [code]);

    return (
        <div className="stat-card">
            <div className="stat-card-title">{title}</div>
            <div className="stat-card-value">{value}</div>
            <div className={`stat-card-change ${isPositive ? "positive" : "negative"}`}>
                <i className={`fa-solid ${isPositive ? "fa-arrow-up" : "fa-arrow-down"}`}></i> {changePercent} за месяц
            </div>
        </div>
    );
};

export default StatCard;