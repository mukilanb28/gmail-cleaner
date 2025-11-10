import { useState } from 'react';
import './Toolbar.scss';
import { deleteMessages } from '../../api/gmailApi';
import Checkbox from '../Checkbox/Checkbox';
import { useTable } from '../../context/TableContext';

const Toolbar = ({ selectedSenders, onDeleteSuccess }) => {
	const [isChecked, setIsChecked] = useState(false);
	const { onChangeAll, onClickRefresh, selectedCount } = useTable();

	const handleDelete = async () => {
		if (selectedSenders.length === 0)
			return alert('Select at least one sender!');
		const result = await deleteMessages(token, selectedSenders);
		if (result) {
			alert('Deleted successfully!');
			onDeleteSuccess(selectedSenders);
		}
	};
	const handleSelectApp = (state) => {
		setIsChecked(state);
		onChangeAll(state);
	};

	return (
		<div className="toolbar">
			<div className="tlbr-icon">
				<Checkbox
					checked={isChecked}
					onChange={handleSelectApp}
					className="icon-wrapper"
				/>
			</div>

			{selectedCount > 0 ? (
				<div
					onClick={handleDelete}
					className="tlbr-icon">
					<div className="icon-wrapper">
						<span className="material-icons">delete</span>
					</div>
				</div>
			) : (
				<div
					className="tlbr-icon"
					onClick={() => onClickRefresh()}>
					<div className="icon-wrapper">
						<span className="material-icons">refresh</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Toolbar;
