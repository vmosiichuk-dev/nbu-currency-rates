import { shape, string, number } from 'prop-types';
import { usePalette } from '@hooks/usePalette.jsx';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { TableRow, TableCell, TableContainer, Stack, Typography } from '@mui/material';
import { Flag } from '@components/Flag/Flag.jsx';
import { useNavigate } from 'react-router-dom';

export const RateTableItem = ({ rate, todayRate, rateDifference, isSearch }) => {
	const navigate = useNavigate();
	const { black300 } = usePalette();
	const { isMediaLG, isMediaSM } = useBreakpoints();

	const showFullName = isMediaLG || !isSearch || (isSearch && !todayRate);

	const setColorBasedOnRateDifference = (rateDifference) => {
		let color = 'black';
		if (rateDifference > 0) color = 'success';
		if (rateDifference < 0) color = 'error';
		return color;
	};

	const formatDifference = (diff) => {
		if (diff === 0) return '–';

		if (diff > 100 || diff < -100) {
			return diff.toFixed(0);
		} else {
			return diff.toPrecision(3);
		}
	};

	return (
		<TableRow
			onClick={() => navigate(`/currency/${rate.cc}`)}
			sx={{
				textDecoration: 'none',
				color: 'inherit',
				cursor: 'pointer',
				'&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.03)' },
			}}
		>
			<TableCell sx={{
				minWidth: { xs: showFullName ? '262px' : '70px', lg: '382px' },
				padding: '4px 0 4px 16px',
			}}>
				<TableContainer
					component={Stack}
					alignItems="center"
					direction="row"
				>
					<TableContainer
						component={Stack}
						alignItems="center"
						justifyContent="center"
						sx={{ mr: 2, width: 'auto', overflowY: 'hidden' }}
					>
						<Flag currencyCode={rate?.cc} />
						<Typography variant="tableCellBold">
							{rate?.cc}
						</Typography>
					</TableContainer>
					{showFullName ? (
						<Typography variant="tableCell">
							{rate?.txt}
						</Typography>
					) : null}
				</TableContainer>
			</TableCell>
			{isSearch && todayRate && !isMediaSM ? (
				<>
					<TableCell sx={{ minWidth: { lg: '117px' } }}>
						<Typography
							align="center"
							variant="tableCell"
							sx={{ color: black300 }}
						>
							{todayRate}
						</Typography>
					</TableCell>
					<TableCell sx={{ minWidth: { lg: '117px' } }}>
						<Typography
							align="center"
							variant="tableCell"
							color={`${setColorBasedOnRateDifference(rateDifference)}.main`}
						>
							{formatDifference(rateDifference)}
						</Typography>
					</TableCell>
				</>
			) : null}
			<TableCell align="right" sx={{ minWidth: { lg: '117px' } }}>
				<Typography variant="tableCell">
					{rate?.rate}
				</Typography>
			</TableCell>
		</TableRow>
	);
};

RateTableItem.propTypes = {
	rate: shape({
		cc: string,
		txt: string,
		rate: number,
	}),
	todayRate: number,
	rateDifference: number,
};
