import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService, bookIssueService, reviewService } from '../services/api';

function BookDetails() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isIssued, setIsIssued] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const [bookData, reviewsData] = await Promise.all([
                    bookService.getBookById(bookId),
                    reviewService.getBookReviews(bookId)
                ]);
                setBook(bookData);
                setReviews(reviewsData);

                // Check if book is issued to current user
                const userIssues = await bookIssueService.getUserActiveIssues();
                setIsIssued(userIssues.some(issue => issue.book.bookId === parseInt(bookId)));
            } catch (err) {
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleIssueBook = async () => {
        try {
            await bookIssueService.issueBook(bookId);
            setIsIssued(true);
            // Refresh book details to update available copies
            const updatedBook = await bookService.getBookById(bookId);
            setBook(updatedBook);
        } catch (err) {
            setError('Failed to issue book');
        }
    };

    const handleReturnBook = async () => {
        try {
            await bookIssueService.returnBook(bookId);
            setIsIssued(false);
            // Refresh book details to update available copies
            const updatedBook = await bookService.getBookById(bookId);
            setBook(updatedBook);
        } catch (err) {
            setError('Failed to return book');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!book) return <div>Book not found</div>;

    return (
        <div className="book-details-container">
            <div className="book-header">
                <div className="book-cover">
                    {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} />
                    ) : (
                        <div className="no-cover">No Cover</div>
                    )}
                </div>
                <div className="book-info">
                    <h1>{book.title}</h1>
                    <p className="author">by {book.author}</p>
                    <p className="isbn">ISBN: {book.isbn}</p>
                    <p className="copies">
                        Available: {book.availableCopies} / {book.totalCopies}
                    </p>
                    <div className="book-actions">
                        {isIssued ? (
                            <button
                                onClick={handleReturnBook}
                                className="btn btn-warning"
                            >
                                Return Book
                            </button>
                        ) : (
                            <button
                                onClick={handleIssueBook}
                                className="btn btn-primary"
                                disabled={book.availableCopies === 0}
                            >
                                {book.availableCopies === 0 ? 'Not Available' : 'Issue Book'}
                            </button>
                        )}
                        {book.pdfPath && (
                            <a
                                href={book.pdfPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-info"
                            >
                                View PDF
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="book-description">
                <h2>Description</h2>
                <p>{book.description || 'No description available.'}</p>
            </div>

            <div className="book-reviews">
                <h2>Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <div className="reviews-list">
                        {reviews.map(review => (
                            <div key={review.reviewId} className="review-card">
                                <div className="review-header">
                                    <span className="reviewer">{review.user.username}</span>
                                    <span className="rating">★ {review.rating}/5</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <span className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => navigate(`/books/${bookId}/review`)}
                    className="btn btn-primary"
                >
                    Write a Review
                </button>
            </div>
        </div>
    );
}

export default BookDetails; 