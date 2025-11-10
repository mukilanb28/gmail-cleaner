import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './AppLayout';

export const AppRouter = () => {
	const { user, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	return (
		<Routes>
			<Route
				path="/"
				element={<AppLayout />}>
				<Route
					path="login"
					element={!user ? <Login /> : <Navigate to="/" />}
				/>

				<Route
					index
					path="/"
					element={user ? <DashboardPage /> : <Navigate to="/login" />}
				/>

				{/* <Route path="profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} /> */}

				<Route
					path="*"
					element={<Navigate to={user ? '/' : '/login'} />}
				/>
			</Route>
		</Routes>
	);
};
