import * as Yup from 'yup';
import { usePalette } from '@hooks/usePalette.jsx';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { useParams /*, useNavigate */ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useCurrencyQuery } from '@api/useCurrencyQuery.jsx';
import { useFlagQuery } from '@api/useFlagQuery.jsx';
import { updateCustomRates, deleteCustomRate } from '@slices/customRatesSlice.js';

import { Form, Formik } from 'formik';
import { Stack, Skeleton, TextField, Button, Box } from '@mui/material';
import { FlagIcon } from '@UI/FlagIcon/FlagIcon.jsx';
import { CurrencyData } from '@UI/CurrencyData/CurrencyData.jsx';
import ClearIcon from '@mui/icons-material/Clear';

export const CurrencyPage = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const { isMediaMD } = useBreakpoints();
	const { currencyCode } = useParams();

	const { currency, currencyPending } = useCurrencyQuery(currencyCode);
	const { flag, currencySymbol, flagPending } = useFlagQuery(currencyCode);

	const customRates = useSelector((state) => state.customRates);
	const customRate = customRates?.[currencyCode]?.customRate;

	const handleSubmit = ({ rate }, { setSubmitting }) => {
		setSubmitting(true);

		const currencyData = {
			...currency,
			symbol: currencySymbol,
			customRate: rate,
			notifyOnHigherRate: currency.notifyOnHigherRate ?? true,
			flag,
		};

		console.log({currencyData})

		dispatch(updateCustomRates({ currencyCode, currencyData }));

		setSubmitting(false);
		// navigate('/custom-rates');
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
		redMain,
		greenLight,
		navyMain,
		greenDark,
		navyShadow,
		greenMain,
		whiteMain,
		black100,
		blackDisabled,
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
					<FlagIcon
						flagPending={flagPending}
						flag={flag}
						currencyCode={currencyCode}
						useBigFlag
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
								gap: '16px',
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
							<Stack
								direction="row"
								spacing={2}
							>
								<Button
									type="submit"
									variant="contained"
									disabled={isDisabled}
									sx={{
										height: '40px',
										minWidth: isMediaMD ? '100px' : '160px',
										width: isMediaMD ? '100%' : 'auto',
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
									ЗМІНИТИ
								</Button>
								<Button
									type="button"
									variant="contained"
									disabled={!customRates?.[currencyCode]}
									onClick={() => dispatch(
										deleteCustomRate({ currencyCode })
									)}
									sx={{
										height: '40px',
										minWidth: 'auto',
										width: 'auto',
										padding: 0,
										letterSpacing: '1px',
										color: navyMain,
										backgroundColor: redMain,
										borderRadius: '4px',
										border: `1px solid ${
											!customRates?.[currencyCode] ? black100 : greenDark
										}`,
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

									<Box
										component={ClearIcon}
										alt=""
										sx={{
											height: '40px',
											width: '40px',
											padding: '6px',
											objectFit: 'cover',
											fill: !customRates?.[currencyCode] ? blackDisabled : whiteMain,
										}}
									/>
								</Button>
							</Stack>
						</Form>
					);
				}}
			</Formik>
		</Stack>
	);
};
