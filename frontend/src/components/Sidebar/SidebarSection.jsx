export default ({ title, children }) => {
	return (
		<div className="sidebar-section">
			{title && <div className="sidebar-section-title">{title}</div>}
			<div className="sidebar-section-items">{children}</div>
		</div>
	);
};
