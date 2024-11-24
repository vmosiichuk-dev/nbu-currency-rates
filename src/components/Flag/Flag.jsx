import { string, bool } from 'prop-types';
import { Box, Stack, Skeleton } from '@mui/material';
import { usePalette } from '@hooks/usePalette.jsx';
import { useFlagQuery } from '@api/queries/useFlagQuery.jsx';
import { ReactComponent as FlagFallback } from '@assets/country-flag-fallback.svg';

export const Flag = ({ currencyCode, useBigFlag = false }) => {
	const { black50, whiteMain, navyMain } = usePalette();
	const { flag, flagPending } = useFlagQuery(currencyCode);
	const flagBackgroundColor = !flag ? navyMain : black50;

	return (
		<>
			{!flagPending ? (
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{
						height: useBigFlag ? '140px' : '40px',
						width: useBigFlag ? '200px' : '40px',
						borderRadius: useBigFlag ? '6px' : '100%',
						overflow: 'hidden',
						border: `1px solid ${black50}`,
					}}
				>
						<Box
							component={!flag ? FlagFallback : 'img'}
							sx={{
								height: '100%',
								width: '100%',
								padding:
									!flag
										? useBigFlag
											? '26px'
											: '6px'
										: 0,
								objectFit: 'cover',
								backgroundColor: flagBackgroundColor,
								fill: whiteMain,
								color: whiteMain,
							}}
							alt=""
							src={flag ?? ''}
						/>
				</Stack>
			) : (
				<Skeleton
					width={40}
					height={40}
					sx={{ borderRadius: '100%', transform: 'none' }}
				/>
			)}
		</>
	);
};

Flag.propTypes = {
	currencyCode: string,
	useBigFlag: bool,
};
