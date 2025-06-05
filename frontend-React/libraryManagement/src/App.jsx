
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarH from "./Components/NavbarH";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Footer from "./Components/Footer";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <Router>
      <NavbarH />
        <div className="container-inner">
        <Routes>
          <Route path="/home" element={<UserDashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
        </Routes>
        </div>
        <Footer/>
    </Router>
  );
}

export default App;
