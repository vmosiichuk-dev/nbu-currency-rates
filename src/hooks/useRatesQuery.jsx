import { apiNBU } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { API_NBU_GET_RATES_URL } from '@constants/api.js';
import { createEndpointWithParam } from '@utils/createEndpointWithParam.js';

export const useRatesQuery = (date) => {
	const endpoint = createEndpointWithParam(
		API_NBU_GET_RATES_URL,
		{ date }
	);

	const getRates = (date) => {
		return apiNBU.get(endpoint, { date });
	};

	const queryFn = async (date) => {
		const response = await getRates(date);
		return response.data;
	};

	const { data, isPending, refetch } = useQuery({
		queryKey: ['rates', date],
		queryFn: () => queryFn(date),
		refetchOnMount: false,
	});

	return {
		rates: data ?? null,
		ratesPending: isPending,
		refetchRates: refetch,
	};
};
