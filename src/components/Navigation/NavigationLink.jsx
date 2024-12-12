import { shape, string } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { Link, Box, Stack, Typography } from '@mui/material';
import { RouterLink } from '@UI/RouterLink/RouterLink';

export const NavigationLink = ({ linkData }) => {
	const { isMediaLG } = useBreakpoints();
	const location = useLocation();
	const isActive = location.pathname === linkData.to;

	return (
		<Link
			component={RouterLink}
			to={linkData.to}
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: { xs: 'center', md: 'flex-start' },
				position: 'relative',
				cursor: 'pointer',
				textDecoration: 'none',
				width: 40,
				height: 40,
				'&:hover': {
					'& .navigation-icon': {
						color: 'custom.black.main',
						backgroundColor: 'custom.new.lime',
					},
					'& .navigation-label': {
						opacity: 1,
						transform: 'translateX(0)',
					},
				},
			}}
		>
			<Box
				component={linkData.icon}
				width="100%"
				height="auto"
				className="navigation-icon"
				sx={{
					padding: '8px',
					borderRadius: '9999px',
					color: isActive ? 'custom.black.main' : 'custom.new.brightSemiTransparent',
					backgroundColor: isActive ? 'custom.new.lime' : 'transparent',
				}}
			/>
			{isMediaLG && (
				<Stack
					className="navigation-label"
					justifyContent="center"
					sx={{
						position: 'absolute',
						zIndex: -1,
						height: 40,
						top: 0,
						left: '1px',
						borderRadius: '9999px',
						whiteSpace: 'nowrap',
						paddingInline: '60px 20px',
						backgroundColor: 'custom.new.lime',
						opacity: 0,
						transform: 'translateX(-120%)',
					}}
				>
					<Typography
						align="center"
						variant="subtitle"
						color="custom.black.main"
					>
						{linkData.label}
					</Typography>
				</Stack>
			)}
		</Link>
	);
};

NavigationLink.propTypes = {
	linkDate: shape({
		to: string.isRequired,
		label: string.isRequired,
	}),
};
