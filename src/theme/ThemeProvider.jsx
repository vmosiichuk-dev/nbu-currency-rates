import { node } from 'prop-types';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as Provider } from '@mui/material/styles';

const mainTheme = createTheme({
	...createTheme(),
	palette: {
		green: {
			main: '#1dc690',
			dark: '#158d63',
			light: '#6bc8a5',
		},
		blue: {
			main: '#278ab0',
			dark: '#1b607c',
			light: '#6bb8d4',
		},
		navy: {
			main: '#1c4670',
			dark: '#102c47',
			light: '#7e9fba',
		},
		black: {
			main: '#ffffff',
			200: '#eaeae0',
			100: '#f8f8f5',
		},
		white: {
			main: '#ffffff',
		},
		error: {
			main: '#ff004d',
		},
		success: {
			main: '#17c614',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			md: 768,
			lg: 1336,
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
					font-family: 'Inter';
					font-style: normal;
					font-display: swap;
					font-weight: 400;
					unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
				}
				html, body {
					font-family: 'Inter', system-ui, Helvetica, Arial, sans-serif;
				}
			`,
		},
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					documentTitle: 'h1',
					title: 'h2',
					subtitle: 'h3',
					body: 'p',
				},
			},
		},
	},
	typography: {
		...mainTheme.typography,
		fontFamily: 'Inter',
		button: {
			textTransform: 'none',
		},
		documentTitle: {
			fontWeight: 700,
			fontSize: 40,
			[mainTheme.breakpoints.up('lg')]: {
				fontSize: 80,
			},
		},
		title: {
			fontWeight: 600,
			fontSize: 20,
			[mainTheme.breakpoints.up('md')]: {
				fontSize: 24,
			},
			[mainTheme.breakpoints.up('lg')]: {
				fontSize: 32,
			},
		},
		subtitle: {
			fontWeight: 500,
			fontSize: 18,
			[mainTheme.breakpoints.up('md')]: {
				fontSize: 20,
			},
			[mainTheme.breakpoints.up('lg')]: {
				fontSize: 24,
			},
		},
		body: {
			fontWeight: 400,
			fontSize: 16,
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
