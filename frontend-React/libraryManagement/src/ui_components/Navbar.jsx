import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Library Management</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="hover:text-blue-200">Admin Dashboard</Link>
                            )}
                            <Link to="/books" className="hover:text-blue-200">Books</Link>
                            <Link to="/my-books" className="hover:text-blue-200">My Books</Link>
                            <Link to="/profile" className="hover:text-blue-200">Profile</Link>
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 