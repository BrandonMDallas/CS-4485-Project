import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
    <header className={styles.header}>
      <div className={styles.brand}>
        {/* "The Hub" acts as the home link */}
        <NavLink to="/" className={styles.link}>
          The Hub
        </NavLink>
      </div>
      <nav className={styles.nav}>
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
        {/* Add more navigation links as needed */}
      </nav>
    </header>
);

export default Header;
