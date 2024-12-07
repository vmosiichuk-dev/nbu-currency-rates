import { Stack } from '@mui/material';
import { RateTable } from '@components/RateTable/RateTable.jsx'

export const HomePage = () => (
	<>
		<Stack
			alignItems="flex-end"
			direction="row"
			sx={{ height: '100%', m: '0 auto', pt: '40px' }}
		>
			<RateTable hideExtraColumns/>
		</Stack>
	</>
);
