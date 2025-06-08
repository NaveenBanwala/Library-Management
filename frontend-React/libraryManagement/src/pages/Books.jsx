import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/api';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, available, unavailable

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await bookService.getAllBooks();
                setBooks(data);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.isbn.includes(searchTerm);
        
        const matchesFilter = filter === 'all' ? true :
                            filter === 'available' ? book.availableCopies > 0 :
                            book.availableCopies === 0;

        return matchesSearch && matchesFilter;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="books-container">
            <div className="books-header">
                <h2>Books</h2>
                <div className="books-controls">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">All Books</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                    <Link to="/books/add" className="btn btn-primary">Add Book</Link>
                </div>
            </div>

            <div className="books-grid">
                {filteredBooks.map(book => (
                    <div key={book.bookId} className="book-card">
                        <div className="book-cover">
                            {book.coverImage ? (
                                <img src={book.coverImage} alt={book.title} />
                            ) : (
                                <div className="no-cover">No Cover</div>
                            )}
                        </div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p className="author">by {book.author}</p>
                            <p className="isbn">ISBN: {book.isbn}</p>
                            <p className="copies">
                                Available: {book.availableCopies} / {book.totalCopies}
                            </p>
                            <div className="book-actions">
                                <Link to={`/books/${book.bookId}`} className="btn btn-sm btn-info">
                                    Details
                                </Link>
                                <Link to={`/books/${book.bookId}/edit`} className="btn btn-sm btn-warning">
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(book.bookId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books; 