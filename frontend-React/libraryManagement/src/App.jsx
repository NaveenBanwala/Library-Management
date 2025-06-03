import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarH from "./Components/NavbarH";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <NavbarH />
        <div className="container-inner">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
        </div>
      
    </Router>
  );
}

export default App;
