import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { AppBar, Container, Stack, Toolbar } from '@mui/material';
import { HeaderLogo } from './HeaderLogo.jsx';
import { HeaderLink } from './HeaderLink.jsx';
import { HeaderMobileMenu } from './HeaderMobileMenu.jsx';
import { HEADER_LINKS } from '@constants/links.js';

export const Header = () => {
	const { isMediaSM, isMediaMD } = useBreakpoints();

	return (
		<AppBar
			position="static"
			sx={(theme) => ({
				color: theme.palette.green.dark,
				backgroundColor: theme.palette.white.main,
				boxShadow: '0px 0px 12px 0px rgba(31, 5, 188, 0.1)',
			})}
		>
			<Container
				maxWidth="xl"
				sx={{ px: isMediaSM ? '24px' : 'auto' }}
			>
				<Toolbar disableGutters sx={{ minHeight: { xs: '80px' } }}>
					<HeaderLogo />
					{isMediaMD ? (
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="flex-end"
							spacing={2.5}
							sx={{ flexGrow: 1, mr: 2.5 }}
						>
							{Object.values(HEADER_LINKS).map((link) => (
								<HeaderLink
									key={link.href}
									link={link}
								/>
							))}
						</Stack>
					) : (
						<HeaderMobileMenu />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
