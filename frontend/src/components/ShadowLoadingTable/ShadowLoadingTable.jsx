import './ShadowLoadingTable.scss';

export default function ShadowLoadingTable({ rows = 10, columns = 3 }) {
	const headerCells = Array.from(
		{ length: columns },
		(_, i) => `Column ${i + 1}`
	);
	const rowIndexes = Array.from({ length: rows }, (_, i) => i);

	return (
		<div
			className="shadow-table-wrapper"
			aria-busy="true"
			aria-live="polite">
			<table
				className="shadow-table"
				role="table">
				<thead>
					<tr>
						{headerCells.map((h, i) => (
							<th
								key={i}
								scope="col">
								<div
									className="skeleton skeleton-heading"
									aria-hidden="true"
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rowIndexes.map((r) => (
						<tr key={r}>
							{Array.from({ length: columns }, (_, c) => (
								<td key={c}>
									<div
										className="skeleton"
										aria-hidden="true"
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="sr-only">Loading table data...</div>
		</div>
	);
}
