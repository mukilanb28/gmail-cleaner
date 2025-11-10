export default ({ icon, children, active = false, onClick }) => {
	return (
		<div
			className={`sidebar-item ${active ? 'active' : ''}`}
			onClick={onClick}>
			{icon && <span className="sidebar-icon">{icon}</span>}
			<span className="sidebar-label">{children}</span>
		</div>
	);
};
