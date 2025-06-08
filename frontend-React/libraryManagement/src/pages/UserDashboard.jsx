import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService, bookIssueService, reviewService } from '../services/api';
import library from '../Images/library.jpg';

function UserDashboard() {
    const [books, setBooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksData, issuedBooksData, reviewsData] = await Promise.all([
                    bookService.getAllBooks(),
                    bookIssueService.getUserActiveIssues('user'),
                    reviewService.getBookReviews()
                ]);
                setBooks(booksData);
                setIssuedBooks(issuedBooksData);
                setReviews(reviewsData);
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
        <div className="user-dashboard">
            <div class="zoom-container">
                <img id="libraryImage" src={library} alt="Library" />
            </div>
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quaerat aut odit repellendus, debitis tempore ea corporis error aliquam. Eligendi, fuga nesciunt dolore nostrum tempore architecto. Dolor recusandae reprehenderit deserunt.
                    Cumque molestiae ipsam nobis vel? Officiis nemo repellat incidunt reprehenderit ut! Nisi quam impedit doloribus eos ab, voluptas mollitia vel praesentium, sunt provident distinctio totam? Ad suscipit soluta dicta! Ipsa.
                    Necessitatibus dolores consectetur perferendis quod corrupti explicabo tempore quisquam laborum sapiente ab earum neque, rem voluptatibus nihil optio iste accusamus voluptates reiciendis perspiciatis voluptate beatae aliquam deserunt nisi excepturi. Commodi.
                    Natus nihil illo hic omnis harum inventore rerum temporibus, quo quidem commodi ut consequatur eum optio esse repellendus laudantium itaque perspiciatis! Nesciunt repellat magnam error saepe corporis harum quidem vitae!
                    Sequi officia dicta non veritatis totam fugiat voluptates molestias eum nesciunt beatae, itaque aut velit est ullam consectetur nisi natus. Aspernatur sequi maxime et quisquam mollitia illum. A, dolores doloremque!
                </p>
            </div>

            {/* Available Books */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Available Books ({books.length})</p>
                <div className="btn-group">
                    <Link to="/books" className="btn btn-sm btn-outline-secondary">Browse</Link>
                    <Link to="/books/search" className="btn btn-sm btn-outline-secondary">Search</Link>
                </div>
            </div>

            {/* My Books */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">My Books ({issuedBooks.length})</p>
                <div className="btn-group">
                    <Link to="/my-books" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/my-books/history" className="btn btn-sm btn-outline-secondary">History</Link>
                </div>
            </div>

            {/* Reviews */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">My Reviews ({reviews.length})</p>
                <div className="btn-group">
                    <Link to="/my-reviews" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/reviews/add" className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            {/* Waitlist */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">My Waitlist</p>
                <div className="btn-group">
                    <Link to="/my-waitlist" className="btn btn-sm btn-outline-secondary">View</Link>
                </div>
            </div>

            {/* Profile */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">My Profile</p>
                <div className="btn-group">
                    <Link to="/profile" className="btn btn-sm btn-outline-secondary">View</Link>
                    <Link to="/profile/edit" className="btn btn-sm btn-outline-secondary">Edit</Link>
                </div>
            </div>

            {/* Notifications */}
            <div className="card shadow-sm inner-items">
                <p className="card-text">Notifications</p>
                <div className="btn-group">
                    <Link to="/notifications" className="btn btn-sm btn-outline-secondary">View</Link>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;