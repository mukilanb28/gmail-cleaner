import { FC, useState } from 'react';
import { FormControlLabel, Radio } from '@mui/material';
import './settings.scss';
import { config, saveConfigurations } from '../../service/DataService';

export const Settings: FC = () => {
	const [pageSize, setPageSize] = useState<number>(config.pageSize);
	const [groupBy, setGroupBy] = useState<number>(config.groupBy);

	const handleSave = () => {
		saveConfigurations({ groupBy, pageSize });
	};
	return (
		<div className="form-contents-wrapper">
			<div className="control-item">
				<label>Page Size</label>
				<div>
					<input
						type="number"
						value={pageSize}
						onChange={(e) =>
							setPageSize(
								e.target.value ? parseInt(e.target.value) : null
							)
						}
					/>
				</div>
			</div>
			<div className="control-item">
				<label>Group By</label>

				<div className="radio-grp">
					<FormControlLabel
						control={
							<Radio
								value={0}
								checked={groupBy === 0}
								onChange={() => setGroupBy(0)}
							/>
						}
						label={'Email Address'}></FormControlLabel>
					<FormControlLabel
						control={
							<Radio
								value={1}
								checked={groupBy === 1}
								onChange={() => setGroupBy(1)}
							/>
						}
						label={'Domain Address'}></FormControlLabel>
				</div>
			</div>
			<div className="footer">
				<button className="cancel">Cancel</button>
				<button
					className="save"
					onClick={() => handleSave()}>
					Save
				</button>
			</div>
		</div>
	);
};
