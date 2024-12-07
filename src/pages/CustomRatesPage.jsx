import { useEffect } from 'react';
import { usePalette } from "@hooks/usePalette.jsx";
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { sendCurrencyNotificationEmail } from '@email/emailService.js';
import { setEmail } from '@slices/emailSlice.js';

import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { Button, Stack, TextField } from '@mui/material';
import { RateTable } from '@components/RateTable/RateTable.jsx';

export const CustomRatesPage = () => {
	const dispatch = useDispatch();
	const { isMediaSM, isMediaLG } = useBreakpoints();

	const { email } = useSelector((state) => state.email);
	const customRates = useSelector((state) => state.customRates);
console.log(email)
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Неправильний формат e-mail')
			.required('Поле є обов\'язковим'),
	});

	useEffect(() => {
		console.log(email)
		if (customRates && email) {
			Object.values(customRates).forEach(currency => {
				console.log(currency)
				console.log(currency.rate, currency.customRate)
				const higherRate = currency.notifyOnHigherRate
					? currency.rate
					: currency.customRate;
				const lowerRate = currency.notifyOnHigherRate
					? currency.customRate
					: currency.rate;

				if (higherRate >= lowerRate) {
					console.log('true:', { currency, higherRate, lowerRate });
					// sendCurrencyNotificationEmail(currency, email);
				} else {
					console.log('false:', { currency, higherRate, lowerRate });
				}
			})
		}
	}, [customRates, email]);

	const {
		greenMain,
		greenLight,
		greenDark,
		navyMain,
		navyShadow,
		errorMain,
		black100,
	} = usePalette();

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		console.log({values})
		// setSubmitting(true);
		console.log({ valuesEmail: values.email});
		dispatch(setEmail(values.email));
		resetForm();
		setSubmitting(false);
	};

	return (
		<>
			<Stack
				alignItems={`flex-${isMediaSM ? 'start' : 'end'}`}
				sx={{ m: '0 auto', height: '100%' }}
			>
				<Formik
					initialValues={{ email: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ values, errors, isSubmitting, setFieldValue, setFieldError }) => {
						const isDisabled = isSubmitting || values?.email === '';
						console.log({email});
						return (
							<Form
								autoComplete="off"
								style={{ width: '100%' }}
							>
								<Stack
									alignItems="center"
									sx={{
										px: 3,
										height: isMediaLG ? '40px' : 'auto',
										width: '100%',
										margin: isMediaLG ? '32px auto -32px' : '24px auto 0',
										maxWidth: isMediaLG ? 'auto' : '360px',
									}}
								>
									<Stack
										spacing={{ xs: 1, lg: 3 }}
										direction={isMediaLG ? 'row' : 'column'}
										sx={{ minWidth: isMediaLG ? '550px' : '100%' }}
									>
										<TextField
											name="email"
											type="email"
											label="E-mail"
											placeholder="example@domain.com"
											variant="outlined"
											value={values.email}
											error={Boolean(errors?.email)}
											helperText={errors?.email || 'Дізнайтесь, коли курс досягне встановленого значення'}
											disabled={isSubmitting}
											slotProps={{ inputLabel: { shrink: true } }}
											onBlur={() => setFieldError('email', '')}
											onChange={(e) => {
												console.log(e.target.value)
												setFieldValue('email', e.target.value)
											}}
											sx={{
												'& .MuiFormHelperText-root': {
													display: !isMediaSM ? 'block' : 'none',
													fontSize: !isMediaLG ? '10px' : '12px',
												},
												'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
													borderColor: errors?.email ? errorMain : greenLight,
												},
												'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
													borderColor: errors?.email ? errorMain : greenLight,
												},
											}}
										/>
										<Button
											type="submit"
											variant="contained"
											disabled={isDisabled}
											sx={{
												height: '40px',
												minWidth: !isMediaLG ? 'auto' : '160px',
												width: 'auto',
												letterSpacing: '1px',
												color: navyMain,
												backgroundColor: greenMain,
												border: `1px solid ${isDisabled ? black100 : greenDark}`,
												boxShadow: `
													0px 3px 1px -2px ${navyShadow}, 
													0px 2px 2px 0px ${navyShadow},
													0px 1px 5px 0px ${navyShadow}	
												`,
												'&:hover': {
													boxShadow: `
														0px 2px 4px -1px ${navyShadow}, 
														0px 4px 5px 0px ${navyShadow},
														0px 1px 10px 0px ${navyShadow}	
													`,
												},
											}}
										>
											ПІДПИСАТИСЬ
										</Button>
									</Stack>
								</Stack>
							</Form>
						)
					}}
				</Formik>
				<RateTable customRates={customRates} />
			</Stack>
		</>
	);
};
