import { useTable } from '../../context/TableContext';
import './Notification.scss';

const Notification = () => {
	const { selectedCount } = useTable();

	if (selectedCount === 0) return '';
	return (
		<div className={`header-notification`}>
			<span>{selectedCount} items selected</span>
		</div>
	);
};

export default Notification;
