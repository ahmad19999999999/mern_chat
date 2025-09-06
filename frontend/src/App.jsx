import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import LoginPage from './pages/Login.jsx'
import SignUpPage from './pages/Register.jsx'
import ProfilePage from './pages/Profilepage.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* عند فتح المسار الرئيسي، نوجه مباشرة للـ Login */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
