import RecentListingsTable from "./RecentListingsTable";
import RecentUsersTable from "./RecentUsersTable";
import StatCard from "./StatCard";

const DashboardPage = () => {

    return (
        <>
            <div className="stats-grid">
                <StatCard code="users" title="Пользователи" />
                <StatCard code="listings" title="Объявления" />
                <StatCard code="resumes" title="Резюме" />
                <StatCard code="views" title="Просмотры" />
                <StatCard code="revenue" title="Доход" />
            </div>
            <div className="card admin-page">
                <div className="card-body">
                    
                    <h2>Последние объявления</h2>
                    <RecentListingsTable />
                    <h2>Последние пользователи</h2>
                    <RecentUsersTable />
                </div>
            </div>
        </>
    );
};

export default DashboardPage;