// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { auth } = useContext(AuthContext);

  // if logged in, home goes to dashboard, otherwise to welcome (“/”)
  const homePath = auth?.accessToken ? "/dashboard" : "/";

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
