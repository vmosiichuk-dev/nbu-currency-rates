import { oneOf, string } from 'prop-types';
import { Stack, Box, Typography } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

export const RateListStatus = ({ type, textFirstLine, textSecondLine }) => (
	<Stack
		spacing={3}
		alignItems="center"
		sx={{
			mt: 'auto',
			height: '85%',
			width: { xs: '100dvw', md: '733px' },
			minWidth: { xs: '100dvw', md: '733px' },
			padding: { xs: '16px 24px', md: '24px' },
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
	</Stack>
);

RateListStatus.propTypes = {
	type: oneOf(['error']).isRequired,
	textFirstLine: string.isRequired,
	textSecondLine: string,
};
