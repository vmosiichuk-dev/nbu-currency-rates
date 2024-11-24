import { createSlice } from '@reduxjs/toolkit';

const customRatesSlice = createSlice({
	name: 'customRates',
	initialState: {},
	reducers: {
		updateCustomRates(state, action) {
			const { currencyCode, currencyData } = action.payload;
			
			if (state[currencyCode]) {
				state[currencyCode].customRate = currencyData?.customRate;
			} else {
				state[currencyCode] = currencyData;
			}
		},
		deleteCustomRate(state, action) {
			const { currencyCode } = action.payload;
			delete state[currencyCode];
		},
	},
});

export const {
	updateCustomRates,
	deleteCustomRate,
} = customRatesSlice.actions;

export default customRatesSlice.reducer;
