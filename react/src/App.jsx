import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Menu from './components/Menu/Menu';
import RequireAuth from './components/Login/RequireAuth/RequireAuth';
const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/menu" 
        element={<RequireAuth><Menu /></RequireAuth>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App