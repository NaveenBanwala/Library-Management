import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService, bookIssueService } from '../services/api';

function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksData, issuedBooksData] = await Promise.all([
                    bookService.getAllBooks(),
                    bookIssueService.getUserActiveIssues('admin')
                ]);
                setBooks(booksData);
                setIssuedBooks(issuedBooksData);
            } catch (err) {
                setError('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-dashboard">
            {/* Books Management */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">All Books ({books.length})</p>
                <div className="btn-group">
                    <Link to="/books" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/books/add" className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            {/* Issued Books */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Issued Books ({issuedBooks.length})</p>
                <div className="btn-group">
                    <Link to="/issued-books" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/issue-book" className="btn btn-sm btn-outline-secondary">Issue</Link>
                </div>
            </div>

            {/* User Management */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">User Management</p>
                <div className="btn-group">
                    <Link to="/users" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/users/add" className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            {/* Reviews */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Book Reviews</p>
                <div className="btn-group">
                    <Link to="/reviews" className="btn btn-sm btn-outline-secondary">View</Link>
                </div>
            </div>

            {/* Waitlist */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Book Waitlist</p>
                <div className="btn-group">
                    <Link to="/waitlist" className="btn btn-sm btn-outline-secondary">View</Link>
                </div>
            </div>

            {/* Reports */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Reports</p>
                <div className="btn-group">
                    <Link to="/reports/overdue" className="btn btn-sm btn-outline-secondary">Overdue</Link>
                    <Link to="/reports/popular" className="btn btn-sm btn-outline-secondary">Popular</Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;