import React, { createContext, useContext, useState, useCallback } from 'react';
import Modal from '../components/Modal/Modal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [modal, setModal] = useState(null);

	const showModal = useCallback(({ title, description, onOk, onCancel }) => {
		return new Promise((resolve) => {
			setModal({
				title,
				description,
				onOk: () => {
					onOk?.();
					setModal(null);
					resolve(true);
				},
				onCancel: () => {
					onCancel?.();
					setModal(null);
					resolve(false);
				},
				showCancelBtn: onCancel || false,
			});
		});
	}, []);
	const hideModal = () => {
		setModal(null);
	};

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{modal && <Modal {...modal} />}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
