import { apiRC } from '@api/api.js';
import { useQuery } from '@tanstack/react-query';
import { createEndpointWithParam } from '@utils/createEndpointWithParam';
import { API_RC_GET_FLAG_URL, QUERY_CONFIG } from '@constants/api';
import {
    CURRENCY_TO_INDEX_FLAG_MAP,
    CURRENCY_TO_SKIP,
} from '@constants/currencies';

export const useFlagQuery = (currencyCode) => {
    const countryIndex = CURRENCY_TO_INDEX_FLAG_MAP[currencyCode] ?? 0;

    const endpoint = createEndpointWithParam(API_RC_GET_FLAG_URL, {
        currencyCode,
    });

    const queryFn = async () => {
        const response = await apiRC.get(endpoint);
        return response.data;
    };

    const { data, isPending } = useQuery({
        queryFn,
        queryKey: ['flag', currencyCode],
        enabled: !CURRENCY_TO_SKIP.includes(currencyCode),
        ...QUERY_CONFIG,
    });

    return {
        flag:
            currencyCode === 'EUR'
                ? 'https://flagcdn.com/w320/eu.png'
                : (data?.[countryIndex]?.flags?.png ?? null),
        flagPending: isPending && !CURRENCY_TO_SKIP.includes(currencyCode),
        currencySymbol:
            data?.[countryIndex]?.currencies?.[currencyCode]?.symbol ?? null,
    };
};
