import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
//import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const hideHeaderOn = ["/"];

  return (
    <div className="Layout">
      {!hideHeaderOn.includes(pathname) && <Header />}
      <main>{children}</main>
    </div>
  );
}
