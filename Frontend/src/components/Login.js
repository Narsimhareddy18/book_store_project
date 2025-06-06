import React, { useState } from 'react';
import './Login.css'; 
import API from '../authentication/Auth';
import { saveToken } from '../authentication/API';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', password: '', role: 'user' });

    const toggleForm = () => {
        setForm({ username: '', password: '', role: 'user' });
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await API.post('/token/', { username: form.username, password: form.password });
                saveToken(res.data.access); // ✅ Must be "access"
                window.location.href = '/books/';
            } else {
                await API.post('/auth/register', form);
                alert('Registered! You can now login.');
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Authentication error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="login-avatar">👤</div>
                    <h2>{isLogin ? 'Login Account' : 'Create Account'}</h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    {!isLogin && (
                        <select name="role" value={form.role} onChange={handleChange} required>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </select>
                    )}
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>

                <div className="login-footer">
                    <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
                    <button onClick={toggleForm} className="toggle-btn">
                        {isLogin ? 'Register here' : 'Login here'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
