import { useState } from 'react';
import './Toolbar.scss';
import { deleteMessages } from '../../api/gmailApi';
import Checkbox from '../Checkbox/Checkbox';
import { useTable } from '../../context/TableContext';
import { useModal } from '../../context/ModalContext';

const Toolbar = () => {
	const [isChecked, setIsChecked] = useState(false);
	const {
		onChangeAll,
		onClickRefresh,
		selectedCount,
		messages,
		isLoading,
		toggleDeleting,
	} = useTable();
	const { showModal, hideModal } = useModal();

	const handleDelete = async () => {
		if (selectedCount === 0) return alert('Select at least one sender!');

		showModal({
			title: 'Delete Confirmation',
			description: 'Are you sure you want to delete this item?',
			onOk: async () => {
				const selectedSenders = messages
					.filter((msg) => msg.checked)
					.reduce((acc, msg) => {
						acc[msg.sender] = msg.count;
						return acc;
					}, {});
				toggleDeleting(true);
				const result = await deleteMessages(selectedSenders);
				toggleDeleting(false);
				if (result) {
					showModal({
						title: 'Action successful',
						description: `All ${result.movedCount} messages have been moved to Trash successfully.`,
						onOk: () => {
							onClickRefresh();
						},
					});
				}
			},
			onCancel: () => {
				hideModal();
			},
		});
		return;
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
