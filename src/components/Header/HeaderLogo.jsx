import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { Stack, Box, Typography } from '@mui/material';
import Logo from '@assets/logo.png';

export const HeaderLogo = () => {
	const { isMediaSM } = useBreakpoints();

	return (
		<Stack
			alignItems="center"
			direction="row"
			sx={{ flexGrow: 1, mr: 2 }}
		>
			<Box
				component="img"
				alt="NBU logo"
				src={Logo}
				width="auto"
				height={36}
				sx={{ mr: 1 }}
			/>
			{!isMediaSM ? (
				<Typography
					noWrap
					variant="documentTitle"
					sx={{
						mr: 2,
						flexGrow: 1,
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Курси валют НБУ
				</Typography>
			) : null}
		</Stack>
	);
};
