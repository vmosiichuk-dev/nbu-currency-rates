import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { SidePanelLink } from './SidePanelLink.jsx';
import { SidePanelMobileMenu } from './SidePanelMobileMenu.jsx';
import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import { HEADER_LINKS } from '@constants/links.js';

export const SidePanel = () => {
	const { isMediaSM, isMediaMD } = useBreakpoints();
	const { displayDate } = useDateSearchParams();

	return (
		<AppBar
			position="static"
			sx={(theme) => ({
				height: { xs: 'auto', md: '100dvh' },
				color: theme.palette.navy.dark,
				backgroundColor: theme.palette.green.main,
				boxShadow: '0px 0px 12px 0px rgba(31, 5, 188, 0.1)',
			})}
		>
			<Container
				maxWidth="xl"
				sx={{ px: isMediaSM ? '24px' : 'auto', height: '100%' }}
			>
				<Toolbar
					disableGutters
					sx={{
						alignItems: 'center',
						minHeight: { xs: '80px' },
						flexDirection: { xs: 'row', md: 'column' },
					}}
				>
					{!isMediaSM ? (
						<Stack
							direction={isMediaMD ? 'column' : 'row'}
							alignItems="center"
							sx={{
								flexGrow: 1,
								mt: { md: 3 },
								mb: { md: 9 },
							}}
						>
							<Typography variant="documentTitle">
								{`Курси НБУ`}
							</Typography>
							<Typography
								align="center"
								variant="title"
								sx={{ ml: { xs: '16px', md: 0 } }}
							>
								{displayDate}
							</Typography>
						</Stack>
					) : null}
					{isMediaMD ? (
						<Stack
							justifyContent="flex-end"
							spacing={2.5}
							sx={{ flexGrow: 1 }}
						>
							{Object.values(HEADER_LINKS).map((link) => (
								<SidePanelLink
									key={link.key}
									link={link}							/>
							))}
						</Stack>
					) : (
						<SidePanelMobileMenu />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
