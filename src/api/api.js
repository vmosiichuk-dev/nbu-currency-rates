import axios from 'axios';
import { API_NBU_BASE_URL, API_RC_BASE_URL } from '@constants/api.js';

export const apiNBU = axios.create({
	baseURL: API_NBU_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const apiRC = axios.create({
	baseURL: API_RC_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});
