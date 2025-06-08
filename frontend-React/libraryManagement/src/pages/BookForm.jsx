import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../services/api';

function BookForm() {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const isEditMode = Boolean(bookId);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        description: '',
        totalCopies: 1,
        availableCopies: 1,
        coverImage: '',
        pdfPath: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const fetchBook = async () => {
                try {
                    const book = await bookService.getBookById(bookId);
                    setFormData({
                        title: book.title,
                        author: book.author,
                        isbn: book.isbn,
                        description: book.description || '',
                        totalCopies: book.totalCopies,
                        availableCopies: book.availableCopies,
                        coverImage: book.coverImage || '',
                        pdfPath: book.pdfPath || ''
                    });
                } catch (err) {
                    setError('Failed to fetch book details');
                }
            };
            fetchBook();
        }
    }, [bookId, isEditMode]);

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
                await bookService.updateBook(bookId, formData);
            } else {
                await bookService.addBook(formData);
            }
            navigate('/books');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-form-container">
            <h2>{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="totalCopies">Total Copies</label>
                        <input
                            type="number"
                            id="totalCopies"
                            name="totalCopies"
                            value={formData.totalCopies}
                            onChange={handleChange}
                            className="form-control"
                            min="1"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input
                            type="number"
                            id="availableCopies"
                            name="availableCopies"
                            value={formData.availableCopies}
                            onChange={handleChange}
                            className="form-control"
                            min="0"
                            max={formData.totalCopies}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="coverImage">Cover Image URL</label>
                    <input
                        type="url"
                        id="coverImage"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pdfPath">PDF Path</label>
                    <input
                        type="text"
                        id="pdfPath"
                        name="pdfPath"
                        value={formData.pdfPath}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm; 