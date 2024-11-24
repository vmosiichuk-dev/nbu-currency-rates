import { Outlet } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout.jsx';
import { HomePage } from '@pages/HomePage.jsx';
import { SearchPage } from '@pages/SearchPage.jsx';
import { CustomRatesPage } from '@pages/CustomRatesPage.jsx';
import { CurrencyEditPage } from '@pages/CurrencyEditPage.jsx';
import { CurrencyPage } from '@pages/CurrencyPage.jsx';

export const routes = [
	{
		path: '/',
		element: (
			<MainLayout>
				<Outlet />
			</MainLayout>
		),
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: 'search',
				element: <SearchPage />,
			},
			{
				path: 'custom-rates',
				element: <CustomRatesPage />,
			},
			{
				path: 'currency-edit',
				element: <CurrencyEditPage />,
			},
			{
				path: 'currency/:currencyCode',
				element: <CurrencyPage />,
			},
		],
	},
];
