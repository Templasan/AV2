import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "boxicons/css/boxicons.min.css";

type SidebarProps = {
  role?: "admin" | "engenheiro" | "operador";
  onToggle?: (closed: boolean) => void;
  activePage?: string;
};

export default function Sidebar({ role, onToggle, activePage }: SidebarProps) {
  const [isClosed, setIsClosed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setIsClosed(true); // força sempre fechado no mobile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      const closing = !isClosed;
      setIsClosed(closing);
      if (onToggle) onToggle(closing);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  const menuItems = [
    { page: "home", icon: "bx bx-home-alt", name: "Home", path: "/home" },
    { page: "funcionarios", icon: "bx bxs-user", name: "Funcionários", path: "/funcionarios" },
    { page: "aeronaves", icon: "bx bxs-plane-alt", name: "Aeronaves", path: "/aeronaves" },
    { page: "pecas", icon: "bx bx-cog", name: "Peças", path: "/pecas" },
    { page: "etapas", icon: "bx bx-flag", name: "Etapas", path: "/etapas" },
    { page: "testes", icon: "bx bx-task", name: "Testes", path: "/testes" },
    { page: "relatorios", icon: "bx bx-file-blank", name: "Relatórios", path: "/relatorios" },
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <nav className={`sidebar ${isClosed ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <div className="text logo-text">
              <span className="name">João Silva</span>
              <span className="profession">Gestor</span>
            </div>
          </div>

          {!isMobile && (
            <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
          )}
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              {menuItems.map((item) => (
                <li
                  key={item.page}
                  className={`nav-link ${activePage === item.page ? "active" : ""}`}
                >
                  <Link to={item.path}>
                    <i className={`${item.icon} icon`}></i>
                    <span className="text nav-text">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <Link to="/">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">
                {isDark ? "Light mode" : "Dark mode"}
              </span>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}