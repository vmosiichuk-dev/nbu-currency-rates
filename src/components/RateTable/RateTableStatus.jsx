import { oneOf, string } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { TableContainer, Stack, Box, Typography } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

export const RateTableStatus = ({ type, textFirstLine, textSecondLine }) => {
	const { isMediaLG } = useBreakpoints();

	return (
		<TableContainer
			component={Stack}
			spacing={3}
			alignItems="center"
			sx={{
				mt: 'auto',
				height: '85%',
				width: { xs: '100dvw', lg: '733px' },
				minWidth: { xs: '100dvw', lg: '733px' },
				padding: { xs: '16px 24px', lg: '24px' },
			}}
		>
			<Box
				component={HistoryToggleOffIcon}
				width={40}
				height={40}
				color={`${type}.light`}
			/>
			<Typography
				align="center"
				variant="tableCellBold"
			>
				{textFirstLine}
				<br/>
				{textSecondLine}
			</Typography>
		</TableContainer>
	);
};

RateTableStatus.propTypes = {
	type: oneOf(['error']).isRequired,
	textFirstLine: string.isRequired,
	textSecondLine: string,
};
