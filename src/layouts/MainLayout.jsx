import { node } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { SidePanel } from '@components/SidePanel/SidePanel.jsx';
import { Box, Stack } from '@mui/material';

export const MainLayout = ({ children }) => {
	const { isMediaMD } = useBreakpoints();
	const columnA = `minmax(${isMediaMD ? 240 : 80}px, 350px)`;
	const columnB = 'minmax(720px, 1fr)';

	return (
		<Box
			spacing={2}
			sx={{
				display: 'grid',
				minHeight: '100dvh',
				gridTemplateColumns: { xs: 'auto', md: `${columnA} ${columnB}` },
				gridTemplateRows: { xs: 'auto', md: '80px 1fr' },
			}}
		>
			<SidePanel/>
			<Stack
				component="main"
				sx={{
					flex: 1,
					mt: 0,
					alignItems: 'flex-end',
					height: { xs: 'calc(100dvh - 80px)', md: '100dvh' },
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
