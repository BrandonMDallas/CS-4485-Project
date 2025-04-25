import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Menu from "./components/Menu/Menu";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import MusicHub from "./components/MusicHub/MusicHub";
import StockHub from "./components/StockHub/StockHub";
import SportsHub from "./components/SportsHub/SportsHub";
import Stocks from './components/StockHub/StocksPage.jsx'
import Settings from '../settingsPage.jsx'
const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/musichub" element={<MusicHub />} />
          <Route path="/stockhub" element={<Stocks />} />
          <Route path="/SportsHub" element={<SportsHub />} />
          <Route path="/stocksSetting" element={<Settings />} />
          {/* Protected Routes */}
          <Route
            path="/menu"
            element={
              <RequireAuth>
                <Menu />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
