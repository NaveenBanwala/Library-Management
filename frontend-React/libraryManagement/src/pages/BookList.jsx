import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center text-danger mt-5">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Available Books</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {books.map((book) => (
                    <div key={book.bookId} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                <p className="card-text">
                                    <small className="text-muted">ISBN: {book.isbn}</small>
                                </p>
                                <p className="card-text">
                                    Available Copies: {book.availableCopies} / {book.totalCopies}
                                </p>
                                <Link to={`/books/${book.bookId}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList; 