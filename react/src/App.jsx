import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import {FaSearch} from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MainMenu from './MainMenu.jsx'
import Stocks from './StocksHub.jsx'
import {createElement} from 'react';
import MusicHub from './musicHub.jsx'
import AiFinance from './aiFinance.jsx'
import {Chart as ChartJS, LinearScale, LineElement, CategoryScale, PointElement} from 'chart.js'
import {Line} from 'react-chartjs-2'
import Axios from 'axios';
import SportsHub from './SportsHub.jsx'
import WhatStock from './whatStock.jsx'
import ImprovementStocks from './improveStocks.jsx'
import ProfilePage from './profilePage.jsx'
import StocksSetting from './stocksSettings.jsx'
import WelcomePage from './welcomePage.jsx'
import SignIn from './signIn.jsx'
import LogIn from './logIn.jsx'
import MoreStocksNews from './moreNews.jsx'
function App() {
  return(
  <Router>
      <Routes>
      <Route path="/" element={<MainMenu/>}/>
      <Route path="/moreNews" element={<MoreStocksNews/>}/>
      <Route path="/welcome" element={<WelcomePage />}/>
      <Route path="/signIn" element={<SignIn />}/>
      <Route path="/logIn" element={<LogIn />}/>
            <Route path="/stocks" element={<Stocks/>}/>
            <Route path="/musicHub" element={<MusicHub/>}/>
            <Route path="/aifinance" element={<AiFinance/>}/>
            <Route path="/sportsHub" element={<SportsHub/>}/>
            <Route path="/whatStock" element={<WhatStock/>}/>
            <Route path="/improveStocks" element={<ImprovementStocks/>}/>
            <Route path="/profilePage" element={<ProfilePage/>}/>
            <Route path="/stocksSetting" element={<StocksSetting/>}/>
            
          </Routes>
          
    </Router>
 
  )
}
export default App;
//<Link to="/">Go to mainMenu</Link>
