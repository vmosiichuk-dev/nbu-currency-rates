import { string } from 'prop-types';
import { useTheme, Typography, Skeleton } from '@mui/material';
import { useCountryFlagQuery } from '@hooks/useCountryFlagQuery.jsx';
import { ReactComponent as CountryFlagFallback } from '@assets/country-flag-fallback.svg';

export const CountryFlag = ({ countryCode }) => {
	const theme = useTheme();
	const { countryFlag, countryFlagPending } = useCountryFlagQuery(countryCode);

	return (
		<>
			{!countryFlagPending ? (
				<>
					{countryFlag ? (
						<Typography
							variant="body"
							sx={{
								fontSize: {
									xs: 36,
									md: 36,
								},
								height: '36px',
							}}>
							{countryFlag}
						</Typography>
					) : (
						<CountryFlagFallback
							style={{
								width: '36px',
								height: '26px',
								paddingBlock: '2px',
								borderRadius: '5px',
								marginBlock: '3px 5px',
								backgroundColor: theme.palette.black[200],
							}}
						/>
					)}
				</>
			) : (
				<Skeleton width="100%" height="36px" sx={{ borderRadius: '5px' }}/>
			)}
		</>
	);
};

CountryFlag.propTypes = {
	countryCode: string,
};
