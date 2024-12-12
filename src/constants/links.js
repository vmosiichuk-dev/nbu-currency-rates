import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const HEADER_LINKS = {
    home: {
        label: 'Головна',
        to: '/',
        key: 'home',
        icon: SpaceDashboardIcon,
    },
    search: {
        label: 'Пошук',
        to: '/search',
        key: 'search',
        icon: QueryStatsIcon,
    },
    currency: {
        label: 'Змінені курси',
        to: '/custom-rates',
        key: 'custom-rates',
        icon: CurrencyExchangeIcon,
    },
};
