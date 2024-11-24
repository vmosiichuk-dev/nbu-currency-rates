export const QUERY_CONFIG = {
	refetchOnMount: false,
	refetchOnWindowFocus: false,
	staleTime: 10 * 60 * 1000,
};

// –– NBU endpoints
export const API_NBU_BASE_URL =
	'https://bank.gov.ua/NBUStatService/v1/statdirectory/';

export const API_NBU_GET_RATES_URL =
	API_NBU_BASE_URL + 'exchange?date={date}&json';

export const API_NBU_GET_CURRENCY_URL =
	API_NBU_BASE_URL + 'exchange?valcode={currencyCode}&date={date}&json';

// –– Rest countries endpoints
export const API_RC_BASE_URL =
	'https://restcountries.com/v3.1/';

export const API_RC_GET_FLAG_URL =
	API_RC_BASE_URL + 'currency/{currencyCode}';
