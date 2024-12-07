import { node } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { SidePanel } from '@components/SidePanel/SidePanel.jsx';
import { Box, Stack } from '@mui/material';

export const MainLayout = ({ children }) => {
	const { isMediaLG } = useBreakpoints();
	const columnA = `minmax(${isMediaLG ? 225 : 80}px, 300px)`;
	const columnB = 'minmax(733px, 1fr)';

	return (
		<Box
			spacing={2}
			sx={{
				display: 'grid',
				minHeight: '100dvh',
				gridTemplateColumns: { xs: 'auto', lg: `${columnA} ${columnB}` },
				gridTemplateRows: { xs: 'auto', lg: '80px 1fr' },
			}}
		>
			<SidePanel/>
			<Stack
				component="main"
				sx={{
					flex: 1,
					mt: 0,
					alignItems: 'flex-end',
					height: { xs: 'calc(100dvh - 80px)', lg: '100dvh' },
				}}
			>
				{ children }
			</Stack>
		</Box>
	);
};

MainLayout.propTypes = {
	children: node.isRequired,
};
