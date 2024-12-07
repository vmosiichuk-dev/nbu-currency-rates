import { object, bool } from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useRatesQuery } from '@api/useRatesQuery.jsx';
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

export const RateTable = ({ customRates, hideExtraColumns = false }) => {
	const tableContainerRef = useRef(null);
	const { isMediaLG, isMediaSM } = useBreakpoints();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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

	const handlePageChange = (_, newPage) => setPage(newPage);

	const customRatesArray = customRates && Object.values(customRates);
	const ratesToMap = customRatesArray || rates || [];

	// const rowsPerPage = isMediaLG ? 10 : 6;
	const ratesWithPagination = ratesToMap?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	const missingRowsCount = Math
		.max(0, rowsPerPage - (ratesWithPagination?.length || 0));

	const rowHeight = isMediaLG ? 66 : 64;
	const emptyHeight = rowHeight * missingRowsCount;

	console.log({ ratesWithPagination, missingRowsCount, emptyHeight });

	useEffect(() => {
		const adjustRowsPerPage = () => {
			if (!tableContainerRef.current) return;
			const containerHeight = tableContainerRef.current.clientHeight;

			const headerHeight = 64;
			const paginationHeight = 52;
			const reservedHeight = headerHeight + paginationHeight;

			const availableHeight = containerHeight - reservedHeight;
			const calculatedRows = Math.floor(availableHeight / rowHeight);

			console.log({availableHeight, rowHeight, calculatedRows})

			setRowsPerPage(Math.max(4, calculatedRows));
		};

		window.addEventListener('resize', adjustRowsPerPage);
		adjustRowsPerPage();

		return () => window.removeEventListener('resize', adjustRowsPerPage);
	}, [rowHeight]);

	return (
		<TableContainer
			ref={tableContainerRef}
			component={Stack}
			alignItems="center"
			sx={{
				height: '100%',
				overflowX: 'hidden',
				width: { xs: '100dvw', lg: '733px' },
				maxWidth: { xs: '100dvw', lg: '733px' },
				padding: { xs: '16px 24px', lg: '24px' },
			}}
		>
			<Table
				sx={{
					mt: ratesPending ? 0 : 'auto',
					maxWidth: { xs: '100dvw', lg: '733px' },
				}}
			>
				<TableHead sx={{ padding: '0 16px 12px' }}>
					<TableRow>
						<TableCell>
							<Typography variant="tableCellBold">
								Валюта
							</Typography>
						</TableCell>
						{(customRates || ratesDiffer) && !hideExtraColumns && !isMediaSM ? (
							<>
								<TableCell>
									<Typography align="center" variant="tableCellBold">
										Сьогодні
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align="center" variant="tableCellBold">
										{customRates ? 'Критерій' : 'Різниця'}
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
										hideExtraColumns={hideExtraColumns}
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
				<>
					{ratesToMap.length > rowsPerPage ? (
						<TablePagination
							component={Box}
							count={ratesToMap.length || 0}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[rowsPerPage]}
							page={page}
							onPageChange={handlePageChange}
							sx={{ mt: { xs: 3, lg: 'auto' } }}
						/>
					) : (
						<Box sx={{ height: '52px', mt: 'auto' }}/>
					)}
				</>
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

RateTable.propTypes = {
	customRates: object,
	hideExtraColumns: bool,
};
