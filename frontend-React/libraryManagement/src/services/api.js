import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Services
export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                username: response.data.username,
                role: response.data.role
            }));
        }
        return response.data;
    },

    register: async (username, email, password) => {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Book Services
export const bookService = {
    getAllBooks: async () => {
        const response = await api.get('/books');
        return response.data;
    },

    getBookById: async (id) => {
        const response = await api.get(`/books/${id}`);
        return response.data;
    },

    addBook: async (bookData) => {
        const response = await api.post('/books', bookData);
        return response.data;
    },

    updateBook: async (id, bookData) => {
        const response = await api.put(`/books/${id}`, bookData);
        return response.data;
    },

    deleteBook: async (id) => {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    }
};

// Book Issue Services
export const bookIssueService = {
    issueBook: async (bookId) => {
        const response = await api.post('/book-issues', { bookId });
        return response.data;
    },

    returnBook: async (issueId) => {
        const response = await api.put(`/book-issues/${issueId}/return`);
        return response.data;
    },

    getIssuedBooks: async () => {
        const response = await api.get('/book-issues');
        return response.data;
    },

    getActiveIssues: async () => {
        const response = await api.get('/book-issues/active');
        return response.data;
    }
};

// Review Services
export const reviewService = {
    addReview: async (bookId, rating, comment) => {
        const response = await api.post('/reviews', { bookId, rating, comment });
        return response.data;
    },

    getBookReviews: async (bookId) => {
        const response = await api.get(`/reviews/book/${bookId}`);
        return response.data;
    }
};

// Waitlist Services
export const waitlistService = {
    addToWaitlist: async (bookId) => {
        const response = await api.post('/waitlist', { bookId });
        return response.data;
    },

    getWaitlist: async () => {
        const response = await api.get('/waitlist');
        return response.data;
    },

    removeFromWaitlist: async (bookId) => {
        const response = await api.delete(`/waitlist/${bookId}`);
        return response.data;
    }
}; 