import { useState } from 'react';
import { SidePanelLink } from './SidePanelLink.jsx'
import { Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { HEADER_LINKS } from '@constants/links.js';
import MenuIcon from '@mui/icons-material/Menu';

export const SidePanelMobileMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleOpenNavMenu = (e) => setAnchorEl(e.currentTarget);
	const handleCloseNavMenu = () => setAnchorEl(null);

	return (
		<Stack
			alignItems="flex-end"
			justifyContent="center"
			sx={{ maxWidth: '48px' }}
		>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
			>
				<MenuIcon />
			</IconButton>
			<Menu
				keepMounted
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleCloseNavMenu}
			>
				{Object.values(HEADER_LINKS).map((link) => (
					<MenuItem
						key={link.key}
						onClick={handleCloseNavMenu}
						sx={{ justifyContent: 'center' }}
					>
						<SidePanelLink link={link} variant="subtitle" />
					</MenuItem>
				))}
			</Menu>
		</Stack>
	);
};
