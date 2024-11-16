import { shape, string, number } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { TableRow, TableCell, Stack, Typography } from '@mui/material';
import { CountryFlag } from '@components/CountryFlag/CountryFlag.jsx';

export const RateTableItem = ({ rate }) => {
	const { isMediaSM } = useBreakpoints();

	return (
		<TableRow>
			<TableCell sx={{ padding: '4px 16px 8px', }}>
				<Stack alignItems="center" direction="row">
					<Stack alignItems="center" sx={{ mr: 2 }}>
						<CountryFlag countryCode={rate?.cc} />
						<Typography variant="tableCellBold">
							{rate?.cc}
						</Typography>
					</Stack>
					{!isMediaSM ? (
						<Typography variant="tableCell">
							{rate?.txt}
						</Typography>
					) : null}
				</Stack>
			</TableCell>
			<TableCell align="right">
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
		exchangedate: string,
		r030: number,
		rate: number,
		txt: string,
	}),
};
