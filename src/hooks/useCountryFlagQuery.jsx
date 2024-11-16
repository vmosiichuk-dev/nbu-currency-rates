import { apiRC } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { createEndpointWithParam } from '@utils/createEndpointWithParam.js';
import { API_RC_GET_COUNTRY_FLAG_URL } from '@constants/api.js';
import { CURRENCY_TO_INDEX_FLAG_MAP, CURRENCY_TO_SKIP } from '@constants/flags.js';

export const useCountryFlagQuery = (currency) => {
	const countryIndex = CURRENCY_TO_INDEX_FLAG_MAP[currency] ?? 0;

	const endpoint = createEndpointWithParam(
		API_RC_GET_COUNTRY_FLAG_URL,
		{ currency }
	);

	const getCountryFlag = (currency) => {
		return apiRC.get(endpoint, { currency });
	};

	const queryFn = async (currency) => {
		const response = await getCountryFlag(currency);
		return response.data;
	};

	const { data, isPending } = useQuery({
		queryKey: ['country-flags', currency],
		queryFn: () => queryFn(currency),
		enabled: !CURRENCY_TO_SKIP.includes(currency),
		refetchOnMount: false,
	});

	return {
		countryFlag: data ? data[countryIndex].flag : null,
		countryFlagPending: isPending && !CURRENCY_TO_SKIP.includes(currency),
	};
};
