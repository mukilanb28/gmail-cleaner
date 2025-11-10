import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ checked, onChange, className }) => {
	return (
		<label className={`checkbox-container ${className}`}>
			<input
				type="checkbox"
				className="checkbox"
				onChange={() => {
					onChange(!checked);
				}}
			/>
			<span className="mock-checkbox">
				{checked && <span className="material-icons">check</span>}
			</span>
		</label>
	);
};

export default Checkbox;
