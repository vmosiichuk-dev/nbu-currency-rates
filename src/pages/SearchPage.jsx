import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { capitalize } from '@utils/capitalize.js';

import { Form, Formik } from 'formik';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { SearchDatePicker } from '@components/SearchDatePicker/SearchDatePicker.jsx';
import { TablePlaceholder } from '@components/TablePlaceholder/TablePlaceholder.jsx';
import { RateTable } from '@components/RateTable/RateTable.jsx';

export const SearchPage = () => {
	const { isMediaSM } = useBreakpoints();
	const { date, ratesPending, updateDate, isInvalidDate } = useDateSearchParams();

	const validationSchema = Yup.object().shape({
		date: Yup.date().nullable(),
	});

	const modifyUaDayjsLocale = () => {
		const modifiedLocale = dayjs.Ls['uk'];
		const initialLocaleMonths = modifiedLocale.months;

		modifiedLocale.months = (i) => capitalize(initialLocaleMonths(i));
		modifiedLocale.monthsShort = modifiedLocale.monthsShort.map(capitalize);
		modifiedLocale.weekdaysMin = modifiedLocale.weekdaysMin.map(capitalize);

		dayjs.Ls['uk'] = modifiedLocale;
	};

	useEffect(() => {
		modifyUaDayjsLocale();
	}, []);

	return (
		<>
			<Stack
				alignItems={`flex-${isMediaSM ? 'start' : 'end'}`}
				sx={{ m: '0 auto', height: '100%' }}
			>
				<Formik
					initialValues={{ date }}
					validationSchema={validationSchema}
					onSubmit={(_, { setSubmitting }) => setSubmitting(true)}
				>
					{({ isSubmitting }) => (
						<Form style={{ width: '100%' }}>
							<Stack
								sx={{
									px: 3,
									height: '40px',
									width: isMediaSM ? '100%' : '340px',
									margin: '32px auto -32px',
								}}
							>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale={dayjs.locale('uk')}
								>
									<Stack
										spacing={{ xs: 2, lg: 3 }}
										direction={{ lg: 'row' }}
									>
										<SearchDatePicker
											disableFuture
											name="date"
											value={dayjs(date)}
											isInvalidDate={isInvalidDate}
											disabled={isSubmitting || ratesPending}
											onChange={(date) => updateDate(date)}
										/>
									</Stack>
								</LocalizationProvider>
							</Stack>
						</Form>
					)}
				</Formik>
				{isInvalidDate ? (
					<TablePlaceholder
						type="error"
						textFirstLine="Неправильний формат дати"
						textSecondLine="Оберіть дату ще раз"
					/>
				) : (
					<RateTable />
				)}
			</Stack>
		</>
	);
};
