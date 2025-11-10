import Profile from '../ProfileView/Profile';
import GmailLogo from './GmailLogo';
import './Header.scss';

const Header = ({ children }) => {
	return <div className="header">{children}</div>;
};
Header.HeaderLogo = GmailLogo;
Header.Profile = Profile;

export default Header;
