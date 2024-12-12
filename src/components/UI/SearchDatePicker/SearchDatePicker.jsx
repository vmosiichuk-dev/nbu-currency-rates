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
	 inputStyles,
	 disableFuture = false,
}) => {
	const { isMediaLG } = useBreakpoints();

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
			sx={inputStyles}
			{...(!isMediaLG ? { selectedSections: null } : {})}
		/>
	);
};

SearchDatePicker.propTypes = {
	name: string.isRequired,
	value: object.isRequired,
	onChange: func.isRequired,
	disabled: bool.isRequired,
	inputStyles: object.isRequired,
	disableFuture: bool,
};
