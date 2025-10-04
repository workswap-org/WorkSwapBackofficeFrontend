import StatCard from "./statCards/StatCard";
import OnlineStatCard from "./statCards/OnlineStatCard";

const StatGrid = () => {

    return (
        <div className="stats-grid">
            <StatCard value={0} title="Пользователи" />
            <OnlineStatCard title="Онлайн" />
            <StatCard value={0} title="Объявления" />
            <StatCard value={0} title="Резюме" />
            <StatCard value={0} title="Просмотры" />
            <StatCard value={0} title="Доход" />
        </div>
    );
};

export default StatGrid;