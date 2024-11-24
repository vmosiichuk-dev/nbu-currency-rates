import { string, object, func, bool } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';
import { usePalette } from '@hooks/usePalette.jsx';

import {
	DesktopDatePicker,
	MobileDatePicker,
	DatePickerToolbar,
} from '@mui/x-date-pickers';

export const SearchDatePicker = ({
	 name,
	 value,
	 onChange,
	 disabled,
	 isInvalidDate = false,
	 disableFuture = false,
}) => {
	const { isMediaLG } = useBreakpoints();
	const { blackMain, black200, black100, greenLight } = usePalette();

	const DatePickerComponent = isMediaLG
		? DesktopDatePicker
		: MobileDatePicker;

	const localeText = {
		datePickerToolbarTitle: 'ОБЕРІТЬ ДАТУ',
	};

	const slots = {
		actionBar: () => null,
		toolbar: (props) => (
			<DatePickerToolbar {...props} toolbarFormat="dd, MMM D" />
		),
	};

	const datePickerStyles = {
		'& .MuiInputBase-root': {
			width: '100%',
			height: '40px',
			cursor: 'pointer',
			backgroundColor: 'transparent',
		},
		'& .MuiInputLabel-root': {
			color: blackMain,
			'&.Mui-focused': {
				color: blackMain,
			},
		},
		'& .MuiInputBase-input': {
			cursor: 'pointer',
			padding: '4px 14px 0',
			color: isInvalidDate ? black100: blackMain,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: black200,
			borderWidth: '1px',
		},
		'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: greenLight,
			borderWidth: '1px',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: greenLight,
			borderWidth: '1px',
		},
	};

	return (
		<DatePickerComponent
			closeOnSelect
			name={name}
			label="Пошук по даті"
			format="DD.MM.YYYY"
			localeText={localeText}
			value={value}
			onChange={onChange}
			disabled={disabled}
			disableFuture={disableFuture}
			slots={!isMediaLG ? slots : null}
			sx={datePickerStyles}
			{...(!isMediaLG ? { selectedSections: null } : {})}
		/>
	);
};

SearchDatePicker.propTypes = {
	name: string.isRequired,
	value: object.isRequired,
	onChange: func.isRequired,
	disabled: bool.isRequired,
	isInvalidDate: bool,
	disableFuture: bool,
};
