export const overrideInputStyles = (theme) => {
	const greenLight = theme.palette.custom.green.light;
	const blackMain = theme.palette.custom.black.main;
	const blackLight = theme.palette.custom.black[200];

	return {
		MuiFormControl: {
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
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
						color: blackMain,
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: blackLight,
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
				},
			},
		},
	};
};
