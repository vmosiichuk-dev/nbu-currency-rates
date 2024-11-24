import { apiNBU } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { createEndpointWithParam } from '@utils/createEndpointWithParam.js';
import { API_NBU_GET_RATES_URL, QUERY_CONFIG } from '@constants/api.js';

export const useRatesQuery = (date) => {
	const endpoint = createEndpointWithParam(
		API_NBU_GET_RATES_URL,
		{ date }
	);

	const queryFn = async () => {
		const response = await apiNBU.get(endpoint);
		return response.data;
	};

	const queryKey = ['rates', date];

	const { data, isPending } = useQuery({
		queryKey,
		queryFn,
		enabled: !!date,
		...QUERY_CONFIG,
	});

	return {
		rates: data ?? null,
		ratesPending: isPending,
	};
};
