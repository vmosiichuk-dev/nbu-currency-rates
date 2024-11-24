import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '@store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
						<App />
					</QueryClientProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</BrowserRouter>
);
