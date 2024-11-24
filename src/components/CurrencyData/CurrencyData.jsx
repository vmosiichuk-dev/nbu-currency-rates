import { string, number, bool, oneOfType } from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';

export const CurrencyData = ({ title, value, isName = false }) => {
	const { isMediaMD } = useBreakpoints();

	return (
		<Stack
			direction={isMediaMD && isName ? 'column' : 'row'}
			sx={{ mb: isMediaMD ? 2 : 0 }}
		>
			<Typography
				variant="subtitle"
				sx={{ mr: 1 }}
			>
				{title}
			</Typography>
			<Typography
				variant="subtitle"
				sx={{ fontWeight: 400 }}
			>
				{value}
			</Typography>
		</Stack>
	);
}

CurrencyData.propTypes = {
	title: string.isRequired,
	value: oneOfType([string, number]).isRequired,
	isName: bool,
};
