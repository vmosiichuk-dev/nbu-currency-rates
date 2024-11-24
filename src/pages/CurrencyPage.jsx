import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { usePalette } from '@hooks/usePalette.jsx';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useDispatch, useSelector } from 'react-redux';

import { useCurrencyQuery } from "@api/queries/useCurrencyQuery.jsx";
import { useFlagQuery } from '@api/queries/useFlagQuery.jsx';
import { updateCustomRates } from '@store/customRatesSlice.js';

import { Form, Formik } from 'formik';
import { Stack, Skeleton, TextField, Button } from '@mui/material';
import { Flag } from '@components/Flag/Flag.jsx';
import { CurrencyData } from '@components/CurrencyData/CurrencyData.jsx';

export const CurrencyPage = () => {
	const dispatch = useDispatch();
	const { isMediaMD } = useBreakpoints();
	const { currencyCode } = useParams();

	const { currency, currencyPending } = useCurrencyQuery(currencyCode);
	const { currencySymbol, flagPending } = useFlagQuery(currencyCode);

	const customRates = useSelector((state) => state.customRates);
	const customRate = customRates?.[currencyCode]?.customRate;

	const handleSubmit = ({ rate }, { setSubmitting }) => {
		setSubmitting(true);

		const currencyData = { ...currency, customRate: rate };
		dispatch(updateCustomRates({ currencyCode, currencyData }));

		setSubmitting(false);
	};

	const validationSchema = Yup.object().shape({
		rate: Yup.number()
			.positive('Курс має бути більше 0')
			.required('Поле є обов\'язковим'),
	});

	const currencyDataArray = [
		{ title: 'Назва:', value: currency?.txt || '' },
		{ title: 'Код НБУ:', value: currency?.r030 || '' },
		{ title: 'Код валюти:', value: currencyCode || '' },
		currencySymbol
			? { title: 'Символ валюти:', value: currencySymbol }
			: null,
	];

	const {
		errorMain,
		greenLight,
		navyMain,
		navyLight,
		navyShadow,
		greenMain,
		black100,
	} = usePalette();

	return (
		<Stack
			spacing={4}
			padding={3}
			justifyContent="center"
			alignItems="center"
			sx={{
				height: '100dvh',
				mb: { xs: 20, lg: 10 },
				mx: 'auto',
			}}
		>
			{!flagPending ? (
				<Stack
					direction={isMediaMD ? 'column' : 'row'}
					spacing={isMediaMD ? 2 : 0}
					alignItems="center"
					sx={{ alignSelf: 'flex-start' }}
				>
					<Flag
						useBigFlag
						currencyCode={currencyCode}
					/>
					<Stack sx={{ ml: 2 }}>
						{currencyDataArray.map((data, i) => {
							if (data) return (
								<CurrencyData
									key={`currency-data-${i}`}
									title={data.title}
									value={data.value}
									isName={i === 0}
								/>
							)
						})}
					</Stack>
				</Stack>
			) : (
				<Skeleton />
			)}
			<Formik
				initialValues={{ rate: '' }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, errors, isSubmitting, isValid, setFieldValue }) => {
					const isDisabled = isSubmitting || values?.rate === '' || !isValid;
					return (
						<Form
							autoComplete="off"
							style={{
								display: 'flex',
								gap: '24px',
								width: '100%',
								flexDirection: isMediaMD ? 'column' : 'row',
							}}
						>
							<TextField
								name="rate"
								type="number"
								variant="outlined"
								placeholder="0.00"
								label={`
									${customRate ? 'Змінений' : 'Актуальний'}
									 курс: 
									 ${customRate || currency?.rate || ''}
								`}
								value={values?.rate}
								error={Boolean(errors?.rate)}
								helperText={errors?.rate}
								disabled={isSubmitting}
								onChange={(e) => setFieldValue('rate', e.target.value)}
								slotProps={{ inputLabel: { shrink: true } }}
								sx={{
									'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
										borderColor: errors?.rate ? errorMain : greenLight,
									},
									'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
										borderColor: errors?.rate ? errorMain : greenLight,
									},
								}}
							/>
							<Button
								type="submit"
								variant="contained"
								disabled={isDisabled}
								sx={{
									height: '40px',
									minWidth: isMediaMD ? '100px' : '160px',
									width: 'auto',
									letterSpacing: '1px',
									color: navyMain,
									backgroundColor: greenMain,
									border: `1px solid ${isDisabled ? black100 : navyLight}`,
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
								ЗМІНИТИ
							</Button>
						</Form>
					);
				}}
			</Formik>
		</Stack>
	);
};
