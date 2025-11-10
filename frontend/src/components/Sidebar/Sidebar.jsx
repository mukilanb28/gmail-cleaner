import './Sidebar.scss';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import { SidebarProvider } from '../../context/SidebarContext';

const Sidebar = ({ children }) => {
	return (
		<div className="sidebar">
			<SidebarProvider>{children}</SidebarProvider>
		</div>
	);
};

Sidebar.Header = SidebarHeader;
Sidebar.Item = SidebarItem;

export default Sidebar;
