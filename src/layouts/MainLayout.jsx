import { node } from 'prop-types';
import { Stack } from '@mui/material';
import { Header } from '@components/Header/Header.jsx';
import { Footer } from '@components/Footer/Footer.jsx';

export const MainLayout = ({ children }) => (
	<Stack spacing={2} sx={{ minHeight: '100dvh' }}>
		<Header />
		<Stack component="main" sx={{ flex: 1 }}>
			{children}
		</Stack>
		<Footer />
	</Stack>
);

MainLayout.propTypes = {
	children: node.isRequired,
};
