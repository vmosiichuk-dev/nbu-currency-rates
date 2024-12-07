import dayjs from 'dayjs';
import { apiNBU } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { API_NBU_GET_CURRENCY_URL, QUERY_CONFIG } from '@constants/api.js';

export const useCurrencyQuery = (currencyCode) => {
	const date = dayjs().format('YYYYMMDD');

	const endpoint = API_NBU_GET_CURRENCY_URL
		.replace('{currencyCode}', currencyCode)
		.replace('{date}', date);

	const queryFn = async () => {
		const response = await apiNBU.get(endpoint);
		return response.data[0];
	};

	const queryKey = ['currency', currencyCode, date];

	const { data, isPending } = useQuery({
		queryKey,
		queryFn,
		enabled: !!currencyCode,
		...QUERY_CONFIG,
	});

	return {
		currency: data ?? null,
		currencyPending: isPending,
	};
};
