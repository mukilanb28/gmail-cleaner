// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getMyProfile, logout, login } from '../api/gmailApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	// Check if user is already logged in on app load
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { user } = await getMyProfile();
				setUser(user);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	// Login
	const login = () => {
		window.location.href = 'http://localhost:5000/api/auth/login';
	};

	const handleLogout = async () => {
		try {
			await logout();
			setUser(null);
			navigate('/');
		} catch (err) {
			console.error('Logout failed', err);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
