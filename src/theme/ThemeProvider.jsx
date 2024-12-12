import { node } from 'prop-types';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as Provider } from '@mui/material/styles';

import { overrideCalendarStyles } from '@theme/overrideCalendarStyles.js';
import { overrideInputStyles } from '@theme/overrideInputStyles.js';

const mainTheme = createTheme({
    ...createTheme(),
    palette: {
        custom: {
            green: {
                main: '#1dc690',
                dark: '#228b22',
                light: '#0ea295',
            },
            navy: {
                main: '#102c47',
                light: '#5f9ea0',
                shadow: 'rgba(31, 5, 188, 0.1)',
            },
            black: {
                main: '#010113ff',
                300: '#757572',
                200: '#a4a49d',
                100: '#d9d4d4',
                50: '#eaeae0',
                disabled: 'rgba(0, 0, 0, 0.26)',
            },
            red: {
                main: '#b22222db',
            },
            white: {
                main: '#efefef',
            },
            error: {
                main: '#ff004d',
                light: 'rgba(246,37,37,0.81)',
            },
            success: {
                main: '#17c614',
            },
            new: {
                main: '#ececf5',
                300: '#74757b',
                bgLight: '#1e2226',
                bg: '#171c21',
                lime: '#cdfb7c',
                violet: '#aa7cfb',
                semiTransparent: 'rgba(255, 255, 255, 0.03)',
                brightSemiTransparent: 'rgba(255, 255, 255, 0.3)',
                nonTransparentBg: 'rgb(45, 45, 55)',
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 430,
            md: 1279,
            lg: 1920,
        },
    },
});

const theme = createTheme({
    ...mainTheme,
    components: {
        ...mainTheme.components,
        MuiCssBaseline: {
            styleOverrides: `
				@font-face {
					font-family: 'Inter', sans-serif;
					font-style: normal;
					font-display: swap;
					font-weight: 400;
					unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
				}
				html, body {
					font-family: 'Inter', system-ui, Helvetica, Arial, sans-serif;
					background-color: ${mainTheme.palette.custom.new.bg};
					color: ${mainTheme.palette.custom.white.main};
				}
				@view-transition {
					navigation: none;
				}
			`,
        },
        MuiTypography: {
            root: {
                fontFamily: `'Inter', system-ui, Helvetica, Arial, sans-serif`,
            },
            defaultProps: {
                variantMapping: {
                    documentTitle: 'h1',
                    title: 'h2',
                    subtitle: 'h3',
                    tableCell: 'p',
                    tableCellBold: 'p',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 0px 12px 0px rgba(31, 5, 188, 0.1)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px 4px',
                    fontFamily: '"Inter", sans-serif',
                    lineHeight: 1,
                    '&.MuiTableCell-alignRight': {
                        padding: '16px 16px 16px 0',
                    },
                },
            },
        },
        ...overrideCalendarStyles(mainTheme),
        ...overrideInputStyles(mainTheme),
    },
    typography: {
        ...mainTheme.typography,
        fontSize: 14,
        documentTitle: {
            fontWeight: 700,
            fontSize: 22,
            [mainTheme.breakpoints.up('lg')]: {
                fontSize: 30,
            },
        },
        title: {
            fontWeight: 600,
            fontSize: 18,
            [mainTheme.breakpoints.up('lg')]: {
                fontSize: 22,
            },
        },
        subtitle: {
            fontWeight: 600,
            fontSize: 16,
            [mainTheme.breakpoints.up('lg')]: {
                fontSize: 20,
            },
        },
        tableCell: {
            fontWeight: 400,
            fontSize: 13,
            [mainTheme.breakpoints.up('lg')]: {
                fontSize: 15,
            },
        },
        tableCellBold: {
            fontWeight: 600,
            fontSize: 13,
            [mainTheme.breakpoints.up('lg')]: {
                fontSize: 15,
            },
        },
    },
});

export const ThemeProvider = ({ children }) => {
    return (
        <Provider theme={theme}>
            <CssBaseline />
            {children}
        </Provider>
    );
};

ThemeProvider.propTypes = {
    children: node.isRequired,
};
