import { useActivePage } from "../lib/hooks/contexts/useActivePage";
import Avatar from "./small-components/Avatar";

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

const Header = ({ user, onLogout, toggleSidebar }) => {

    const { activePage } = useActivePage();
    
    return (
      <header className="admin-header">
            <h1>{pageTitles[activePage]}</h1>

            <button
                className="logout-btn"
                onClick={(e) => {
                    e.preventDefault();
                    if (onLogout) onLogout();
                }}
            >
                <i
                    className="fa fa-sign-out fa-lg"
                    aria-hidden="true"
                    style={{ transform: "rotate(180deg)" }}
                ></i>
            </button>

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