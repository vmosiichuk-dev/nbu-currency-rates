import { useState } from 'react';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { RateTableItem } from './RateTableItem.jsx';
import { useLocation } from 'react-router-dom';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useRatesQuery } from '@api/queries/useRatesQuery.jsx';

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
	const { isMediaLG, isMediaSM } = useBreakpoints();
	const location = useLocation();
	const isSearch = location.pathname === '/search';

	const {
		rates,
		ratesPending,
		ratesDiffer,
		todayDate,
	} = useDateSearchParams();

	const todayRatesQuery = useRatesQuery(todayDate);
	const todayRates = todayRatesQuery?.rates;
	const todayRatesByCC = todayRates?.reduce((acc, rate) => {
		acc[rate.cc] = rate;
		return acc;
	}, {});

	const [page, setPage] = useState(0);
	const handlePageChange = (_, newPage) => setPage(newPage);

	const rowsPerPage = 10;
	const ratesWithPagination = rates?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	const missingRowsCount = Math.max(
		0,
		rowsPerPage - (ratesWithPagination?.length || 0)
	);
	const rowHeight = isMediaLG ? 66 : 64;
	const emptyHeight = rowHeight * missingRowsCount;

	return (
		<TableContainer
			component={Stack}
			alignItems="center"
			sx={{
				height: '100%',
				overflowX: 'hidden',
				width: { xs: '100dvw', lg: '732px' },
				minWidth: { xs: '100dvw', lg: '732px' },
				padding: { xs: '16px 24px', lg: '24px' },
			}}
		>
			<Table sx={{ mt: ratesPending ? 0 : 'auto' }}>
				<TableHead sx={{ padding: '0 16px 12px' }}>
					<TableRow>
						<TableCell>
							<Typography variant="tableCellBold">
								Валюта
							</Typography>
						</TableCell>
						{ratesDiffer && isSearch && !isMediaSM ? (
							<>
								<TableCell>
									<Typography align="center" variant="tableCellBold">
										Сьогодні
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align="center" variant="tableCellBold">
										Різниця
									</Typography>
								</TableCell>
							</>
						) : null}
						<TableCell align="right">
							<Typography variant="tableCellBold">
								Курс
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody height="100%">
					{!ratesPending && (
						<>
							{ratesWithPagination?.map((rate) => {
								const todayRate = todayRatesByCC ? todayRatesByCC[rate.cc]?.rate : null;
								const rateDifference = rate.rate - todayRate;
								return (
									<RateTableItem
										key={rate?.cc}
										rate={rate}
										todayRate={ratesDiffer ? todayRate : null}
										rateDifference={rateDifference}
										isSearch={isSearch}
									/>
								)
							})}
							{missingRowsCount > 0 && (
								<TableRow sx={{ height: emptyHeight }} />
							)}
						</>
					)}
				</TableBody>
			</Table>
			{!ratesPending ? (
				<TablePagination
					component={Box}
					count={rates?.length || 0}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[rowsPerPage]}
					page={page}
					onPageChange={handlePageChange}
					sx={{ mt: { xs: 3, lg: 'auto' } }}
				/>
			) : (
				<Skeleton
					width="100%"
					height="66px"
					sx={{
						transform: 'none',
						borderRadius: '8px', mb: 'auto',
					}}
				/>
			)}
		</TableContainer>
	);
};
