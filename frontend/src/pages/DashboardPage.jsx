import { useEffect } from 'react';
import { fetchMessages } from '../api/gmailApi';
import { useAuth } from '../context/AuthContext';
import './Page.scss';
import Toolbar from '../components/Toolbar/Toolbar';
import Table from '../components/Table/Table';
import { TableProvider } from '../context/TableContext';
import Notification from '../components/Notification/Notification';

const DashboardPage = () => {
	const { token } = useAuth();

	useEffect(() => {
		if (!token) return;
		(async () => {
			const messages = await fetchMessages(token);
			setData(messages);
		})();
	}, [token]);

	return (
		<div className="main-content-section">
			<TableProvider>
				<Notification />
				<Toolbar />
				<Table />
			</TableProvider>
		</div>
	);
};

export default DashboardPage;
