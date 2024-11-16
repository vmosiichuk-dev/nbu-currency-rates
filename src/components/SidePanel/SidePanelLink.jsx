import { shape, string } from 'prop-types';
import { useRef } from 'react';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useTheme, Link, Stack, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export const SidePanelLink = ({ link }) => {
	const theme = useTheme();
	const location = useLocation();
	const { isMediaMD } = useBreakpoints()

	const LinkIcon = link.icon;
	const isActive = location.pathname === link.href;

	const logoRef = useRef(null);
	const textRef = useRef(null);

	const handleMouseEnter = () => {
		if (isActive) return;
		const color = isMediaMD ? 'navy' : 'green';
		logoRef.current.style.opacity = 1;
		textRef.current.style.color = theme.palette[color].dark;
	};

	const handleMouseLeave = () => {
		if (isActive) return;
		const colorVariant = isMediaMD ? 'dark' : 'light';
		logoRef.current.style.opacity = 0.3;
		textRef.current.style.color = theme.palette.green[colorVariant];
	};

	return (
		<Link
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			component={RouterLink}
			to={link.href}
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: { xs: 'center', md: 'flex-start' },
				cursor: 'pointer',
				textDecoration: 'none',
				color: theme.palette.green.dark,
			})}
		>
			<Stack
				ref={logoRef}
				sx={{
					opacity: isActive ? 1 : 0.3,
					transition: 'opacity 0.2s ease-in-out',
				}}
			>
				<LinkIcon
					alt="logo"
					style={{
						width: isMediaMD ? '100px' : '65px',
						height: 'auto',
					}}
				/>
			</Stack>
			<Typography
				ref={textRef}
				align="center"
				variant="menuTitle"
				sx={(theme) => ({
					color: isActive
						? theme.palette[isMediaMD ? 'navy' : 'green'].dark
						: theme.palette.green[isMediaMD ? 'dark' : 'light'],
					transition: 'color 0.2s ease-in-out',
				})}
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
