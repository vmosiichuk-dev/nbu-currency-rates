import { usePalette } from '@hooks/usePalette.jsx';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { SidePanelLink } from './SidePanelLink.jsx';
import { SidePanelMobileMenu } from './SidePanelMobileMenu.jsx';
import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import { HEADER_LINKS } from '@constants/links.js';

export const SidePanel = () => {
	const { displayDate } = useDateSearchParams();
	const { isMediaSM, isMediaLG } = useBreakpoints();
	const { navyMain, navyLight, greenMain } = usePalette();

	return (
		<AppBar
			position="static"
			sx={{
				height: { xs: 'auto', lg: '100dvh' },
				color: navyMain,
				backgroundColor: greenMain,
				border: `1px solid ${navyLight}`,
				boxShadow: '0px 0px 12px 0px rgba(31, 5, 188, 0.1)',
			}}
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
						flexDirection: { xs: 'row', lg: 'column' },
					}}
				>
					{!isMediaSM ? (
						<Stack
							direction={isMediaLG ? 'column' : 'row'}
							alignItems="center"
							sx={{
								flexGrow: 1,
								mt: { lg: 3 },
								mb: { lg: 9 },
							}}
						>
							<Typography variant="documentTitle">
								{`Курси НБУ`}
							</Typography>
							<Typography
								align="center"
								variant="title"
								sx={{ ml: { xs: '16px', lg: 0 } }}
							>
								{displayDate}
							</Typography>
						</Stack>
					) : null}
					{isMediaLG ? (
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
