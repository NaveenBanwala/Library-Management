import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Profile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.getCurrentUser();
                setFormData(prev => ({
                    ...prev,
                    username: user.username,
                    email: user.email
                }));
            } catch (err) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

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
        setSuccess('');

        try {
            if (isEditing) {
                // Update profile
                if (formData.newPassword) {
                    if (formData.newPassword !== formData.confirmPassword) {
                        throw new Error('New passwords do not match');
                    }
                    await authService.updateProfile({
                        username: formData.username,
                        email: formData.email,
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword
                    });
                } else {
                    await authService.updateProfile({
                        username: formData.username,
                        email: formData.email
                    });
                }
                setSuccess('Profile updated successfully');
                setIsEditing(false);
            } else {
                setIsEditing(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (err) {
            setError('Failed to logout');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!isEditing}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!isEditing}
                        required
                    />
                </div>

                {isEditing && (
                    <>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </>
                )}

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-danger"
                    >
                        Logout
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setError('');
                                setSuccess('');
                            }}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Profile; 