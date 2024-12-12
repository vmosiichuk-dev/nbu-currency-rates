import { useBreakpoints } from '@hooks/useBreakpoints';
import { Stack } from '@mui/material';
import { RateListControls } from '@components/RateList/RateListControls';
import { RatesWidget } from '@components/RatesWidget/RatesWidget';

export const SearchPage = () => {
	const { isMediaSM } = useBreakpoints();

	return (
		/*<Stack
			alignItems={`flex-${isMediaSM ? 'start' : 'end'}`}
			sx={{ m: '0 auto', height: '100%' }}
		>*/
			<RatesWidget RateListControls={RateListControls} />
		/*</Stack>*/
	);
};
