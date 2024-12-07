import dayjs from 'dayjs';
import { useRatesQuery } from '@api/useRatesQuery.jsx';
import { useSearchParams } from 'react-router-dom';
import { isValidApiDate } from '@utils/isValidApiDate.js';

export const useDateSearchParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchDate = searchParams.get('date');
	const isInvalidDate = searchDate && !isValidApiDate(searchDate);

	const dayjsDate = searchDate ? dayjs(searchDate) : dayjs();
	const displayDate = dayjsDate.format('DD.MM.YYYY');
	const apiDate = dayjsDate.format('YYYYMMDD');
	const todayDate = dayjs().format('YYYYMMDD');

	const { rates, ratesPending } = useRatesQuery(apiDate);
	const ratesDiffer = rates && rates?.[0]?.exchangedate !== dayjs().format('DD.MM.YYYY');

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
		ratesDiffer,
		todayDate,
		isInvalidDate,
	};
};
