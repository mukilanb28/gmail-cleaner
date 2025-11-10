import './Table.scss';
import { useTable } from '../../context/TableContext';
import Checkbox from '../Checkbox/Checkbox';

const Table = ({ children }) => {
	const { isLoading, messages, onChangeCheckbox } = useTable();

	if (isLoading) {
		return <div>Loading.....</div>;
	}

	return (
		<div className="table">
			<table>
				<tr>
					<th>Sender address</th>
					<th>Grouped email count</th>
				</tr>
				<tbody>
					{messages.map((message, index) => (
						<tr key={index}>
							<td className="sender-cell">
								<Checkbox
									checked={message.checked}
									onChange={(state) => onChangeCheckbox(index, state)}
								/>
								<div>{message.sender}</div>
							</td>
							<td>{message.count}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
