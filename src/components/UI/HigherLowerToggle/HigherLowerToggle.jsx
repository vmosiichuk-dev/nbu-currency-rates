import { string, bool } from 'prop-types';
import { useDispatch } from 'react-redux';
import { usePalette } from '@hooks/usePalette.jsx';
import { toggleNotifyOnHigherRate } from '@slices/customRatesSlice.js';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const HigherLowerToggle = ({ currencyCode, notifyOnHigherRate }) => {
	const dispatch = useDispatch();
	const { successMain, errorMain } = usePalette();

	const handleToggle = (e) => {
		e.stopPropagation();
		dispatch(toggleNotifyOnHigherRate({ currencyCode }));
	};

	return (
		<IconButton
			onClick={handleToggle}
			sx={(theme) => ({
				width: '32px',
				height: '32px',
				position: 'relative',
				zIndex: theme.zIndex.fab,
			})}
		>
			<Box
				sx={{
					width: '24px',
					height: '24px',
					display: 'inline-block',
					transform: notifyOnHigherRate ? 'rotate(-90deg)' : 'rotate(90deg)',
					transition: 'transform 0.35s ease-in-out',
				}}
			>
				<PlayArrowIcon
					sx={{
						fill: notifyOnHigherRate
							? successMain
							: errorMain
					}}
				/>
			</Box>
		</IconButton>
	);
};

HigherLowerToggle.propTypes = {
	currencyCode: string,
	notifyOnHigherRate: bool,
};
