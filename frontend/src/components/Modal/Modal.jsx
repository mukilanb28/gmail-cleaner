import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ title, description, onOk, onCancel, showCancelBtn }) => {
	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal-container">
				<h2 className="modal-title">{title}</h2>
				<p className="modal-description">{description}</p>
				<div className="modal-actions">
					{showCancelBtn && (
						<button
							className="modal-btn cancel"
							onClick={onCancel}>
							Cancel
						</button>
					)}
					<button
						className="modal-btn ok"
						onClick={onOk}>
						OK
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
