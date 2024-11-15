import { useMediaQuery } from '@mui/material';

export const useBreakpoints = () => {
	const isMediaSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	const isMediaMD = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const isMediaLG = useMediaQuery((theme) => theme.breakpoints.up('lg'));

	return { isMediaSM, isMediaMD, isMediaLG };
};
