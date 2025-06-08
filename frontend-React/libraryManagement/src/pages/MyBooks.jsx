import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookIssueService } from '../services/api';

function MyBooks() {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const data = await bookIssueService.getUserActiveIssues();
                setIssuedBooks(data);
            } catch (err) {
                setError('Failed to fetch issued books');
            } finally {
                setLoading(false);
            }
        };

        fetchIssuedBooks();
    }, []);

    const handleReturnBook = async (bookId) => {
        try {
            await bookIssueService.returnBook(bookId);
            // Remove the returned book from the list
            setIssuedBooks(prev => prev.filter(issue => issue.book.bookId !== bookId));
        } catch (err) {
            setError('Failed to return book');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="my-books-container">
            <h2>My Books</h2>
            {issuedBooks.length === 0 ? (
                <p>You haven't issued any books yet.</p>
            ) : (
                <div className="issued-books-list">
                    {issuedBooks.map(issue => (
                        <div key={issue.issueId} className="issued-book-card">
                            <div className="book-cover">
                                {issue.book.coverImage ? (
                                    <img src={issue.book.coverImage} alt={issue.book.title} />
                                ) : (
                                    <div className="no-cover">No Cover</div>
                                )}
                            </div>
                            <div className="book-info">
                                <h3>{issue.book.title}</h3>
                                <p className="author">by {issue.book.author}</p>
                                <div className="issue-details">
                                    <p>
                                        <strong>Issued on:</strong>{' '}
                                        {new Date(issue.issueDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Due date:</strong>{' '}
                                        {new Date(issue.dueDate).toLocaleDateString()}
                                    </p>
                                    {issue.returnDate && (
                                        <p>
                                            <strong>Returned on:</strong>{' '}
                                            {new Date(issue.returnDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <div className="book-actions">
                                    <Link
                                        to={`/books/${issue.book.bookId}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        View Details
                                    </Link>
                                    {!issue.returnDate && (
                                        <button
                                            onClick={() => handleReturnBook(issue.book.bookId)}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Return Book
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBooks; 