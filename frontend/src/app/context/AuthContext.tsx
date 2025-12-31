// context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, useTransition } from 'react';
import { getMyProfile, logout as apiLogout } from '../api/gmailApi';
import type { IAuthContext, IAuthProviderProps } from './interface';
import type { IUser } from '../models';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

	// Check if user is already logged in on app load
	useEffect(() => {
		const fetchUser = async () => {
			try {
				setIsUserLoading(true);
				const response = await getMyProfile();
				if (response && response.user) {
					setUser(response.user);
				} else {
					throw new Error('User not found');
				}
			} catch (err) {
				console.error('Auth check failed', err);
				setUser(null);
			} finally {
				setIsUserLoading(false);
			}
		}
		fetchUser();
	}, []);

	// Login
	const login = () => {
		window.location.href = `${API_BASE_URL}/auth/login`;
	};

	const handleLogout = async () => {
		try {
			await apiLogout();
			setUser(null);
		} catch (err) {
			console.error('Logout failed', err);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isUserLoading, login, logout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
