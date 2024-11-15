import { shape, string } from 'prop-types';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const HeaderLink = ({ link }) => (
	<Link
		component={RouterLink}
		to={link.href}
		key={link.href}
		sx={(theme) => ({
			cursor: 'pointer',
			textDecoration: 'none',
			color: theme.palette.green.dark,
		})}
	>
		<Typography variant="subtitle">
			{link.title}
		</Typography>
	</Link>
);

HeaderLink.propTypes = {
	link: shape({
		href: string.isRequired,
		title: string.isRequired,
	}),
};
