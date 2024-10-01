import { FC } from 'react';
import './menu.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Overview } from '../../assets/icons/overview.svg';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';

export const Menu: FC = () => {
	return (
		<div className="sidebar-menu-wrapper">
			<div className="menu-item">
				<Link to={'/overview'}>
					<div>
						<Overview />
						<div>Overview</div>
					</div>
				</Link>
			</div>
			<div className="menu-item">
				<Link to={'/settings'}>
					<div>
						<Settings />
						<div>Settings</div>
					</div>
				</Link>
			</div>
		</div>
	);
};
