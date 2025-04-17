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

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/musichub" element={<MusicHub />} />
          <Route path="/stockhub" element={<StockHub />} />
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
