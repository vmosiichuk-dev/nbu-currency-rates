import { ReactComponent as LinkHomeIcon } from '@assets/link-home.svg';
import { ReactComponent as LinkSearchIcon } from '@assets/link-search.svg';
import { ReactComponent as LinkCustomRatesIcon } from '@assets/link-custom-rates.svg';

export const HEADER_LINKS = {
	home: {
		title: 'Головна',
		href: '/',
		key: 'home',
		icon: LinkHomeIcon,
	},
	search: {
		title: 'Пошук',
		href: '/search',
		key: 'search',
		icon: LinkSearchIcon,
	},
	currency: {
		title: 'Змінені курси',
		href: '/custom-rates',
		key: 'custom-rates',
		icon: LinkCustomRatesIcon,
	},
};
