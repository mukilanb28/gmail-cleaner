import './Table.scss';
import { useTable } from '../../context/TableContext';
import Checkbox from '../Checkbox/Checkbox';
import ShadowLoadingTable from '../ShadowLoadingTable/ShadowLoadingTable';

const Table = () => {
	const { isLoading, messages, onChangeCheckbox, percentage, isDeleting } =
		useTable();

	return (
		<>
			{(isLoading || isDeleting) && (
				<div className="loader-wrapper">
					<div className="spinner">
						<span class="loader"></span>
						{isLoading && (
							<>
								<span>Loading messages...</span>
								<span>{Math.floor(percentage)}%</span>
							</>
						)}
					</div>
				</div>
			)}
			<div className={`table ${isLoading ? 'loading' : ''}`}>
				{messages.length === 0 ? (
					<div className="shadow-loader">
						<ShadowLoadingTable />
					</div>
				) : (
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
											onChange={(state) =>
												onChangeCheckbox(index, state)
											}
										/>
										<div>{message.sender}</div>
									</td>
									<td>{message.count}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default Table;
