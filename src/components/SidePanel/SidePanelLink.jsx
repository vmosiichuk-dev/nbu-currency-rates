import { shape, string } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { usePalette } from '@hooks/usePalette.jsx';

export const SidePanelLink = ({ link }) => {
	const LinkIcon = link.icon;
	const { isMediaLG } = useBreakpoints()
	const { navyMain } = usePalette();

	const location = useLocation();
	const isActive = location.pathname === link.href;

	return (
		<Link
			component={RouterLink}
			to={link.href}
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: { xs: 'center', lg: 'flex-start' },
				cursor: 'pointer',
				textDecoration: 'none',
				transition: 'opacity 0.2s ease-in-out',
				opacity: isActive ? 1 : 0.3,
				color: navyMain,
				'&:hover': {
					opacity: 1,
				},
			}}
		>
			<LinkIcon
				alt="logo"
				style={{
					width: isMediaLG ? '100px' : '65px',
					height: 'auto',
				}}
			/>
			<Typography
				align="center"
				variant="menuTitle"
				color="inherit"
				sx={{ maxWidth: '180px' }}
			>
				{link.title}
			</Typography>
		</Link>
	);
};

SidePanelLink.propTypes = {
	link: shape({
		href: string.isRequired,
		title: string.isRequired,
	}),
};
