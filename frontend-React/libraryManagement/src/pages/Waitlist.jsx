import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { waitlistService, bookService } from '../services/api';

function Waitlist() {
    const [waitlist, setWaitlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWaitlist = async () => {
            try {
                const data = await waitlistService.getWaitlist();
                setWaitlist(data);
            } catch (err) {
                setError('Failed to fetch waitlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWaitlist();
    }, []);

    const handleRemoveFromWaitlist = async (bookId) => {
        try {
            await waitlistService.removeFromWaitlist(bookId);
            // Remove the book from the waitlist
            setWaitlist(prev => prev.filter(item => item.book.bookId !== bookId));
        } catch (err) {
            setError('Failed to remove from waitlist');
        }
    };

    const handleAddToWaitlist = async (bookId) => {
        try {
            await waitlistService.addToWaitlist(bookId);
            // Refresh the waitlist
            const updatedWaitlist = await waitlistService.getWaitlist();
            setWaitlist(updatedWaitlist);
        } catch (err) {
            setError('Failed to add to waitlist');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="waitlist-container">
            <h2>Book Waitlist</h2>
            {waitlist.length === 0 ? (
                <p>Your waitlist is empty.</p>
            ) : (
                <div className="waitlist-items">
                    {waitlist.map(item => (
                        <div key={item.waitlistId} className="waitlist-item">
                            <div className="book-cover">
                                {item.book.coverImage ? (
                                    <img src={item.book.coverImage} alt={item.book.title} />
                                ) : (
                                    <div className="no-cover">No Cover</div>
                                )}
                            </div>
                            <div className="book-info">
                                <h3>{item.book.title}</h3>
                                <p className="author">by {item.book.author}</p>
                                <p className="request-date">
                                    Requested on: {new Date(item.requestDate).toLocaleDateString()}
                                </p>
                                <div className="book-actions">
                                    <Link
                                        to={`/books/${item.book.bookId}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveFromWaitlist(item.book.bookId)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Remove from Waitlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="available-books">
                <h3>Available Books</h3>
                <div className="books-grid">
                    {waitlist.map(item => (
                        <div key={item.book.bookId} className="book-card">
                            <div className="book-cover">
                                {item.book.coverImage ? (
                                    <img src={item.book.coverImage} alt={item.book.title} />
                                ) : (
                                    <div className="no-cover">No Cover</div>
                                )}
                            </div>
                            <div className="book-info">
                                <h4>{item.book.title}</h4>
                                <p className="author">by {item.book.author}</p>
                                <p className="copies">
                                    Available: {item.book.availableCopies} / {item.book.totalCopies}
                                </p>
                                <button
                                    onClick={() => handleAddToWaitlist(item.book.bookId)}
                                    className="btn btn-sm btn-primary"
                                    disabled={item.book.availableCopies === 0}
                                >
                                    {item.book.availableCopies === 0
                                        ? 'Not Available'
                                        : 'Add to Waitlist'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Waitlist; 