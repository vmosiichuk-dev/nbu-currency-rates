import { string, object, func, bool } from 'prop-types';
import { useBreakpoints } from '@hooks/useBreakpoints.jsx';

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
	 disableFuture = false,
}) => {
	const { isMediaMD } = useBreakpoints();

	const DatePickerComponent = isMediaMD
		? DesktopDatePicker
		: MobileDatePicker;

	const toolbarSlot = {
		toolbar: (props) => (
			<DatePickerToolbar {...props} toolbarFormat="dd, MMM D" />
		),
	};

	const localeText = {
		cancelButtonLabel: 'СКАСУВАТИ',
		okButtonLabel: 'ПІДТВЕРДИТИ',
		datePickerToolbarTitle: 'ОБЕРІТЬ ДАТУ',
	};

	const setDatePickerStyles = (theme) => ({
		'& .MuiInputBase-root': {
			width: '100%',
			height: '40px',
			cursor: 'pointer',
			backgroundColor: 'transparent',
		},
		'& .MuiInputBase-input': {
			cursor: 'pointer',
			padding: '4px 14px 0',
			color: theme.palette.black.main,
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.black.main,
		},
		'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.blue.main,
		},
	});

	return (
		<DatePickerComponent
			name={name}
			label="Пошук по даті"
			format="DD.MM.YYYY"
			localeText={localeText}
			value={value}
			onChange={onChange}
			disabled={disabled}
			disableFuture={disableFuture}
			slots={!isMediaMD ? toolbarSlot : null}
			sx={(theme) => setDatePickerStyles(theme)}
			{...(!isMediaMD ? { selectedSections: null } : {})}
		/>
	);
};

SearchDatePicker.propTypes = {
	name: string.isRequired,
	value: object.isRequired,
	onChange: func.isRequired,
	disabled: bool.isRequired,
	disableFuture: bool.isRequired,
};
