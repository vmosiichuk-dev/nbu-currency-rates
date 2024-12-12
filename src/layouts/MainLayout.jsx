import { node } from 'prop-types';
import { Box, Stack } from '@mui/material';
import { Navigation } from '@components/Navigation/Navigation';

export const MainLayout = ({ children }) => (
	<Box
		spacing={2}
		sx={{
			display: 'grid',
			minHeight: '100dvh',
			gridTemplateColumns: { xs: 'auto', md: '96px 1fr' },
		}}
	>
		<Navigation />
		<Stack
			component="main"
			sx={{
				mt: 0,
				py: 3,
				px: { md: 3 },
				gridColumn: 2,
				height: '100dvh',
			}}
		>
			{ children }
		</Stack>
	</Box>
);

MainLayout.propTypes = {
	children: node.isRequired,
};
