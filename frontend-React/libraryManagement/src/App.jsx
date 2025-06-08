import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from './services/api';
import Navbar from './ui_components/Navbar';
import Footer from './ui_components/Footer';
import PrivateRoute from './ui_components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import BookDetails from './pages/BookDetails';
import MyBooks from './pages/MyBooks';
import Waitlist from './pages/Waitlist';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-gray-50">
                    <Navbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/books/:id" element={<BookDetails />} />

                            {/* Protected Routes */}
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute roles={['ADMIN']}>
                                        <AdminDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute roles={['USER']}>
                                        <UserDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/books/add"
                                element={
                                    <PrivateRoute roles={['ADMIN']}>
                                        <BookForm />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/books/edit/:id"
                                element={
                                    <PrivateRoute roles={['ADMIN']}>
                                        <BookForm />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/books"
                                element={
                                    <PrivateRoute roles={['USER']}>
                                        <MyBooks />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/user/waitlist"
                                element={
                                    <PrivateRoute roles={['USER']}>
                                        <Waitlist />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />

                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/books" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

