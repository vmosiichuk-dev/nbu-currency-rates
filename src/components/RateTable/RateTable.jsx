import { useState } from 'react';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { RateTableItem } from './RateTableItem.jsx';

import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	Box,
	Stack,
	Skeleton,
	Typography,
} from '@mui/material';

export const RateTable = () => {
	const rowsPerPage = 10;
	const [page, setPage] = useState(0);
	const { rates, ratesPending } = useDateSearchParams();

	const handlePageChange = (_, newPage) => setPage(newPage);
	const ratesWithPagination = rates?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<TableContainer
			component={Stack}
			alignItems="center"
			sx={{
				mt: 'auto',
				height: '100%',
				width: { xs: '100dvw', md: '720px' },
				minWidth: { xs: '100dvw', md: '720px' },
				padding: { xs: '16px 24px', md: '24px' },
			}}
		>
			<Table sx={{ mt: 'auto' }}>
				<TableHead sx={{ padding: '0 16px 12px' }}>
					<TableRow>
						<TableCell>
							<Typography variant="tableCellBold">
								Валюта
							</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography variant="tableCellBold">
								Курс
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				{!ratesPending ? (
					<TableBody>
						{ratesWithPagination.map((rate) => (
							<RateTableItem key={rate?.cc} rate={rate} />
						))}
					</TableBody>
				) : (
					<Skeleton
						component="div"
						width="177%"
						height="calc(99px + 64px)"
						sx={{ borderRadius: '8px' }}
					/>
				)}
			</Table>
			{!ratesPending && (
				<TablePagination
					component={Box}
					count={rates?.length}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[rowsPerPage]}
					page={page}
					onPageChange={handlePageChange}
					sx={{ mt: 'auto' }}
				/>
			)}
		</TableContainer>
	);
};
