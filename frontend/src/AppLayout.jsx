import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './AppLayout.scss'; // optional styling
import Note from './components/Note/Note';

const AppLayout = () => {
	return (
		<div className="dashboard-page">
			<div className="left-pane">
				<Sidebar>
					<Sidebar.Header>
						<span className="material-icons">menu</span>
					</Sidebar.Header>
				</Sidebar>
			</div>
			<div className="right-pane">
				<Header>
					<Header.HeaderLogo />
					<Header.Profile>
						<Header.Profile.ProfileIcon />
						<Header.Profile.ProfileView />
					</Header.Profile>
				</Header>
				<Note />
				<Outlet />
			</div>
		</div>
	);
};

export default AppLayout;
