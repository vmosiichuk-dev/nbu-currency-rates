import { shape, string, number, bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { usePalette } from '@hooks/usePalette.jsx';
import { useFlagQuery } from '@api/useFlagQuery.jsx';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';

import { TableRow, TableCell, TableContainer, Stack, Typography } from '@mui/material';
import { HigherLowerToggle } from "@UI/HigherLowerToggle/HigherLowerToggle.jsx";
import { FlagIcon } from '@UI/FlagIcon/FlagIcon.jsx';

export const RateTableItem = ({ rate, todayRate, rateDifference, hideExtraColumns = false }) => {
	const navigate = useNavigate();
	const { flag, flagPending } = useFlagQuery(rate?.cc);
	const { isMediaLG, isMediaSM } = useBreakpoints();
	const { black300, successMain, errorMain } = usePalette();

	console.log(rate?.notifyOnHigherRate
		? successMain
		: errorMain)

	const customRateDifference = rate?.rate - rate?.customRate;

	const showFullName = isMediaLG ||
		(!isMediaSM && hideExtraColumns) ||
		(!hideExtraColumns && !(todayRate || rate?.customRate));

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

	console.log('---', rate?.notifyOnHigherRate);

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
						<FlagIcon
							flagPending={flagPending}
							flag={flag}
							currencyCode={rate?.cc}
						/>
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
			{!hideExtraColumns && !isMediaSM && (todayRate || rate?.customRate) ? (
				<>
					<TableCell sx={{ minWidth: { lg: '117px' } }}>
						<Typography
							align="center"
							variant="tableCell"
							sx={{ color: black300 }}
						>
							{todayRate || rate?.rate}
						</Typography>
					</TableCell>
					<TableCell sx={{ minWidth: { lg: '117px' } }}>
						<Typography
							align="center"
							variant="tableCell"
							color={`${setColorBasedOnRateDifference(
									rateDifference || customRateDifference
							)}.main`}
						>
							{rate?.customRate ? (
								<HigherLowerToggle
									currencyCode={rate?.cc}
									notifyOnHigherRate={rate?.notifyOnHigherRate ?? true}
								/>
							) : formatDifference(rateDifference)}
						</Typography>
					</TableCell>
				</>
			) : null}
			<TableCell align="right" sx={{ minWidth: { lg: '117px' } }}>
				<Typography variant="tableCell">
					{rate?.customRate || rate?.rate}
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
	hideExtraColumns: bool,
};
