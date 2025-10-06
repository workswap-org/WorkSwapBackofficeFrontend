import { Link } from "react-router-dom";
import { useActivePage } from "@core/lib";
import Avatar from "@core/components/common/Avatar";

const pageTitles = {
  dashboard: "Панель управления",
  listings: "Управление объявлениями",
  resumes: "Управление резюме",
  users: "Управление пользователями",
  news: "Управление новостями",
  locations: "Управление локациями",
  categories: "Управление категориями",
  tasks: "Задачи",
  localization: "Локализация",
  permissions: "Роли и разрешения",
};

const Header = ({ user, toggleSidebar }) => {

    const { activePage } = useActivePage();
    
    return (
      <header className="admin-header">
            <h1>{pageTitles[activePage]}</h1>

            <Link
                className="logout-btn"
                to="/logout"
            >
                <i
                    className="fa fa-sign-out fa-lg"
                    aria-hidden="true"
                    style={{ transform: "rotate(180deg)" }}
                ></i>
            </Link>

            <div className="admin-user">
                <span>{user?.name || "Администратор"}</span>
                <Avatar 
                    user={user}        // передаём объект пользователя
                    size={40}          // размер аватара, например 40px
                    className="p40-avatar" // дополнительные классы, если нужны
                />
            </div>

            <div className="mobile-menu-btn" onClick={() => toggleSidebar()}>
                <i className="fa-solid fa-bars fa-xl"></i>
            </div>
        </header>
    );
};

export default Header;