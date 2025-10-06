import RecentListingsTable from "./RecentListingsTable";
import RecentUsersTable from "./RecentUsersTable";
import StatGrid from "./StatGrid";

const DashboardPage = () => {

    return (
        <>
            <StatGrid />
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