import { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    address: '',
    userType: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleOnRegisterSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
    }

    // Submit the form (replace this with API call)
    console.log('User Registration Data:', formData);
};

return (

    <div >
    <form onSubmit={handleOnRegisterSubmit} className="register-container">
        <h2><span>Welcome to </span> Registeration Page</h2>
        <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        />

        <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        />

        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        />

        <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        />

        <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        />

        <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        />

        <select
        name="userType"
        value={formData.userType}
        onChange={handleChange}
        >
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>

        </select>
        <button type="submit" className="button-style">Register</button>
    </form>
    </div>
);
}

export default Register;

