import ReactDOM from 'react-dom/client';
import App from './App';
import dayjs from "dayjs";
import 'dayjs/locale/uk';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store/store';
import { ThemeProvider } from '@theme/ThemeProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter
		future={{
			v7_startTransition: true,
			v7_relativeSplatPath: true,
		}}
	>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<QueryClientProvider client={new QueryClient()}>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale={dayjs.locale('uk')}
						>
							<App />
						</LocalizationProvider>
					</QueryClientProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</BrowserRouter>
);
