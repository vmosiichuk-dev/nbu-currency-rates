import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { SearchDatePicker } from '@components/SearchDatePicker/SearchDatePicker.jsx';
import { useDateSearchParams } from '@hooks/useDateSearchParams.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RateTable } from '@components/RateTable/RateTable.jsx'

export const SearchPage = () => {
	const { date, ratesPending, updateDate } = useDateSearchParams();

	return (
		<>
			<Stack
				alignItems="flex-end"
				sx={{
					height: '100%',
					m: '0 auto',
				}}
			>
				<Formik
					initialValues={{ date }}
					validationSchema={
						Yup.object().shape({
							date: Yup.date().nullable(),
						})
					}
					onSubmit={(values, actions) => {
						console.log(values, actions);
					}}
				>
					{(formikProps) => (
						<Form style={{ width: '100%' }}>
							<Stack
								direction="row"
								spacing={{ xs: 2, md: 3 }}
								alignItems={{ md: 'center' }}
								justifyContent="center"
								sx={{
									mt: { xs: 3, md: 5 },
									mb: { xs: 0, md: 3 },
									px: 3,
									height: '40px',
								}}
							>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale={'uk'}
								>
									<Stack
										spacing={{ xs: 2, md: 3 }}
										direction={{ md: 'row' }}
									>
										<SearchDatePicker
											disableFuture
											name="date"
											value={dayjs(date)}
											disabled={formikProps.isSubmitting || ratesPending}
											onChange={(date) => {
												formikProps.setFieldValue(name, date);
												updateDate(date);
											}}
										/>
									</Stack>
								</LocalizationProvider>
							</Stack>
						</Form>
					)}
				</Formik>

				<RateTable />
			</Stack>
		</>
	);
};
