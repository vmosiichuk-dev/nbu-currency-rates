import { node } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { Stack, Container } from '@mui/material';
import { Header } from '@components/Header/Header.jsx';

export const MainLayout = ({ children }) => {
	const { isMediaSM } = useBreakpoints();

	return (
		<Stack spacing={2} sx={{minHeight: '100dvh'}}>
			<Header/>
			<Container
				maxWidth="xl"
				sx={{px: isMediaSM ? '24px' : 'auto'}}
			>
				<Stack component="main" sx={{flex: 1}}>
					{children}
				</Stack>
			</Container>
		</Stack>
	);
};

MainLayout.propTypes = {
	children: node.isRequired,
};
