import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Stocks from '../Stocks'
import Main from '../MainMenu'
import Welcome from '../welcomePage'
import './App.css'
const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
//        <Route path="/" element={<Stocks />} />
