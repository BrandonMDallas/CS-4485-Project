// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const homePath = auth?.accessToken ? "/dashboard" : "/";

  const handleLogout = () => {
    setAuth({});
    // after clearing auth, navigate home
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <NavLink to={homePath} className={styles.link}>
          The Hub
        </NavLink>
      </div>
      <nav className={styles.nav}>
        {auth?.accessToken ? (
          <>
            <NavLink
              to="/sportshub"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              SportsHub
            </NavLink>
            <NavLink
              to="/musichub"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              MusicHub
            </NavLink>
            <NavLink
              to="/stockhub"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              StocksHub
            </NavLink>

            {/* now Log Out is a NavLink too */}
            <NavLink
              to="/"
              onClick={handleLogout}
              className={({ isActive }) => {
                const base = isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link;
                // always include logout class for styling
                return `${base} ${styles.logout}`;
              }}
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Sign In
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
