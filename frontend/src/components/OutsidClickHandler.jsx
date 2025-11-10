import React, { useEffect, useRef } from 'react';

const OutsideClickHandler = ({ onOutsideClick, children }) => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		// Function to handle clicks
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				onOutsideClick();
			}
		};

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on cleanup
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onOutsideClick]);

	return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;
