import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useRatesQuery } from '@hooks/useRatesQuery';
import { useSearchParams } from 'react-router-dom';

export const useDateSearchParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchDate = searchParams.get('date');
	const dayjsDate = searchDate ? dayjs(searchDate) : dayjs();

	const apiDate = dayjsDate.format('YYYYMMDD');
	const displayDate = dayjsDate.format('DD.MM.YYYY');

	const { rates, ratesPending, refetchRates } = useRatesQuery(apiDate);

	useEffect(() => {
		if (searchDate) refetchRates();
	}, [searchDate, refetchRates]);

	const updateDate = (newDate) => {
		const formattedNewDate = dayjs(newDate).format('YYYYMMDD');
		if (formattedNewDate !== apiDate) {
			setSearchParams((prevParams) => {
				const updatedParams = new URLSearchParams(prevParams);
				updatedParams.set('date', formattedNewDate);
				return updatedParams;
			});
		}
	};

	return {
		date: dayjsDate,
		displayDate,
		apiDate,
		rates,
		ratesPending,
		updateDate,
	};
};
