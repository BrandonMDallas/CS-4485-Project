import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Stocks from '../Stocks'
import './App.css'
import MusicHub from './components/MusicHub/MusicHub';
const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/musichub" element={<MusicHub />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
//        <Route path="/" element={<Stocks />} />
