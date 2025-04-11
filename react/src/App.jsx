import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/LogIn';
import Register from './components/Register/signIn';
const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App