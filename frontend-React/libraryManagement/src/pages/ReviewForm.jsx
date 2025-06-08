import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewService, bookService } from '../services/api';

function ReviewForm() {
    const navigate = useNavigate();
    const { bookId, reviewId } = useParams();
    const isEditMode = Boolean(reviewId);

    const [formData, setFormData] = useState({
        rating: 5,
        comment: ''
    });
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await bookService.getBookById(bookId);
                setBook(bookData);

                if (isEditMode) {
                    const reviewData = await reviewService.getReviewById(reviewId);
                    setFormData({
                        rating: reviewData.rating,
                        comment: reviewData.comment
                    });
                }
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, [bookId, reviewId, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await reviewService.updateReview(reviewId, formData);
            } else {
                await reviewService.addReview(bookId, formData);
            }
            navigate(`/books/${bookId}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save review');
        } finally {
            setLoading(false);
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="review-form-container">
            <h2>
                {isEditMode ? 'Edit Review' : 'Write a Review'} for {book.title}
            </h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Review</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="form-control"
                        rows="6"
                        placeholder="Share your thoughts about this book..."
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate(`/books/${bookId}`)}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditMode ? 'Update Review' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewForm; 