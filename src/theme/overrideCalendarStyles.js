export const overrideCalendarStyles = (theme) => {
    // –– Colors
    const greenMain = theme.palette.custom.green.main;
    const whiteMain = theme.palette.custom.white.main;
    const blackLight = theme.palette.custom.black[200];

    // –– Selectors
    const buttonSelectors = [
        '.MuiButton-root',
        '.MuiIconButton-root',
        '.MuiPickersYear-yearButton',
        '.MuiPickersDay-root',
    ];

    const hoverButtonSelectors = buttonSelectors.map(
        (selector) => `${selector}:hover`,
    );

    const selectedButtonSelectors = [
        '.MuiPickersDay-root.Mui-selected',
        '.MuiPickersYear-yearButton.Mui-selected',
    ];

    const activeButtonSelectors = [
        ...hoverButtonSelectors,
        ...selectedButtonSelectors,
    ];

    const greenMainBackgroundSelectors = [
        '.MuiDatePickerToolbar-root',
        '.MuiPickersDay-root.Mui-selected',
        '.MuiPickersYear-yearButton.Mui-selected',
    ];

    const blackLightColorSelectors = [
        '.MuiPickersYear-yearButton.Mui-disabled',
        '.MuiDayCalendar-header .MuiTypography-root',
    ];

    // –– Styles
    const mainStyles = {
        [`& ${activeButtonSelectors.join(', & ')}`]: {
            backgroundColor: greenMain,
            color: whiteMain,
            fontWeight: 500,
        },
        [`& ${blackLightColorSelectors.join(', & ')}`]: {
            color: blackLight,
        },
        '& .MuiPickersDay-today:not(.Mui-selected)': {
            border: `1px solid ${greenMain}`,
        },
        '& .MuiPickersYear-yearButton': {
            fontSize: 20,
            fontWeight: 500,
        },
    };

    const dialogStyles = {
        [`& ${greenMainBackgroundSelectors.join(', & ')}`]: {
            backgroundColor: greenMain,
        },
        '& .MuiPickersToolbar-root .MuiTypography-root': {
            color: whiteMain,
        },
        '& .MuiPickersToolbar-root .MuiTypography-overline': {
            fontWeight: 600,
        },
    };

    return {
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiPickersLayout-root': {
                        ...mainStyles,
                        ...dialogStyles,
                    },
                },
            },
        },
        MuiPickersPopper: {
            styleOverrides: {
                root: {
                    '& .MuiPickersLayout-root': {
                        ...mainStyles,
                    },
                },
            },
        },
    };
};
