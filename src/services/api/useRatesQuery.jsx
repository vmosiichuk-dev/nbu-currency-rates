import { apiNBU } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { createEndpointWithParam } from '@utils/createEndpointWithParam';
import { API_NBU_GET_RATES_URL, QUERY_CONFIG } from '@constants/api';
import { TOP_CURRENCIES } from '@constants/currencies';

export const useRatesQuery = (date) => {
	const endpoint = createEndpointWithParam(
		API_NBU_GET_RATES_URL,
		{ date }
	);

	const queryFn = async () => {
		const response = await apiNBU.get(endpoint);
		return response.data;
	};

	const { data, isPending } = useQuery({
		queryKey: ['rates', date],
		queryFn,
		enabled: !!date,
		...QUERY_CONFIG,
	});

	const topRates = data ?
		TOP_CURRENCIES.map(code => data.find(item => item.cc === code))
		: null;

	return {
		rates: data ?? null,
		ratesPending: isPending,
		topRates,
	};
};
