import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './messageTable.scss';
import {
	getMessages,
	getUpdatedEmailMetrics,
	config,
} from '../../service/DataService';
import { IEmailMetrics } from '../../service/interface';
import { TableHeader } from '../tableHeader/TableHeader';
import { styled } from '@mui/material/styles';
import { CircularProgressWithLabel } from '../loader/Loader';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'name', headerName: 'Name', width: 500 },
	{ field: 'count', headerName: 'Count', width: 130 },
];

const StyledGridOverlay = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	backgroundColor: 'rgba(18, 18, 18, 0.9)',
	...theme.applyStyles('light', {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	}),
}));

export const MessageTable: FC = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rows, setRows] = useState<IEmailMetrics[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [progress, setProgress] = useState<number>(0);

	const loadMetrics = () => {
		getMessages(pageNumber).then((res) => {
			setRows(getUpdatedEmailMetrics());
			setIsLoading(false);
		});
	};
	useEffect(() => {
		setIsLoading(true);
		const eventSource = new EventSource(
			'http://localhost:3001/api/readMessages'
		);
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.percentage) {
				setProgress(data.percentage);
				if (data.percentage >= 100) {
					console.log(`Closed...`);
					eventSource.close();
					loadMetrics();
				}
			}
		};
	}, []);

	const getHeaderOptions = () => {
		return [
			{ label: 'All', count: rows.length },
			{ label: 'Selected', count: selectedItems.length },
			{ label: 'Unselected', count: rows.length - selectedItems.length },
		];
	};

	const paginationModel = { page: 0, pageSize: config.pageSize };

	const onClickRow = (rowData: IEmailMetrics) => {
		if (selectedItems.includes(rowData.name)) {
			const index = selectedItems.indexOf(rowData.name);
			setSelectedItems([
				...selectedItems.slice(0, index),
				...selectedItems.slice(index + 1),
			]);
		} else {
			const temp = [...selectedItems];
			temp.push(rowData.name);
			setSelectedItems(temp);
		}
	};
	const deleteSelectedEmails = () => {};
	const getRowsData = () => {
		if (selectedTab === 1) {
			return rows.filter((x) => selectedItems.includes(x.name));
		} else if (selectedTab === 2) {
			return rows.filter((x) => !selectedItems.includes(x.name));
		}
		return rows;
	};
	return (
		<div className="message-container">
			<div>{progress}</div>
			<div>
				<TableHeader
					options={getHeaderOptions()}
					selectedIndex={selectedTab}
					onClick={(index) => setSelectedTab(index)}
					deleteSelectedEmails={deleteSelectedEmails}
				/>
				<Paper sx={{ height: 750, width: '80%' }}>
					<DataGrid
						loading={isLoading}
						rows={getRowsData()}
						columns={columns}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[10]}
						checkboxSelection
						sx={{ border: 0 }}
						onCellClick={(props) => onClickRow(props.row)}
						slots={{
							loadingOverlay: () => {
								return (
									<StyledGridOverlay>
										<CircularProgressWithLabel value={progress} />
										<Box sx={{ mt: 2 }}>Loading rows…</Box>
									</StyledGridOverlay>
								);
							},
						}}
					/>
				</Paper>
			</div>
		</div>
	);
};
