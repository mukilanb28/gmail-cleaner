import ProfileIcon from './ProfileIcon';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import OutsideClickHandler from '../OutsidClickHandler';

export default () => {
	const { user, logout } = useAuth();
	const { isOpen, toggleProfile } = useProfile();

	const handleLogout = () => {
		logout();
	};
	if (!isOpen || !user) return;

	return (
		<OutsideClickHandler onOutsideClick={() => toggleProfile()}>
			<div className="profile-view-dropdown-menu">
				<div className="title">{user.email}</div>
				<div className="body">
					<ProfileIcon />
					<div>Hi, {user.name.split(' ')[0]}!</div>
				</div>
				<div className="footer">
					<button
						className="logout"
						onClick={() => handleLogout()}>
						<div>
							<span className="material-icons">logout</span>
							<span className="btn-name">Sign Out</span>
						</div>
					</button>
				</div>
			</div>
		</OutsideClickHandler>
	);
};
