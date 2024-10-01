import { FC, useState } from 'react';
import './tableHeader.scss';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { Box, Modal, Typography } from '@mui/material';

interface ITableHeader {
	options: { label: string; count: number }[];
	selectedIndex: number;
	onClick: (index: number) => void;
	deleteSelectedEmails: () => void;
}
export const TableHeader: FC<ITableHeader> = ({
	selectedIndex,
	options,
	onClick,
	deleteSelectedEmails,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleClose = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="table-form-headers">
			<div>
				{options.map(({ label, count }, index) => (
					<div
						key={index}
						onClick={() => onClick(index)}
						className={`item ${
							selectedIndex === index ? 'selected' : ''
						}`}>
						<span>{label}</span>
						<span className="count">{count}</span>
					</div>
				))}
			</div>
			<div>
				{options[1].count > 0 && (
					<>
						<button
							className="delete-btn"
							onClick={() => setIsModalOpen(true)}>
							<span className="text">Delete all selected</span>
							<Delete />
						</button>
						<Modal
							open={isModalOpen}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Box className="delete-modal">
								<div className="container">
									<h1>Delete Emails</h1>
									<p>
										Are you sure you want to delete all the selected
										emails?
									</p>

									<div className="clearfix">
										<button
											className="cancelbtn"
											onClick={() => setIsModalOpen(false)}>
											Cancel
										</button>
										<button
											className="deletebtn"
											onClick={() => deleteSelectedEmails()}>
											Delete
										</button>
									</div>
								</div>
							</Box>
						</Modal>
					</>
				)}
			</div>
		</div>
	);
};
