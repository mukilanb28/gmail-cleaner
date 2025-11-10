import './Profile.scss';
import ProfileIcon from './ProfileIcon';
import ProfileView from './ProfileView';
import { ProfileProvider } from '../../context/ProfileContext';

const Profile = ({ children }) => {
	return (
		<ProfileProvider>
			<div className="profile-view">{children}</div>
		</ProfileProvider>
	);
};
Profile.ProfileIcon = ProfileIcon;
Profile.ProfileView = ProfileView;

export default Profile;
