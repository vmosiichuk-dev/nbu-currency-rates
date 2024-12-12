import { createSlice } from '@reduxjs/toolkit';

const customRatesSlice = createSlice({
    name: 'customRates',
    initialState: {},
    reducers: {
        updateCustomRates(state, action) {
            const { currencyCode, currencyData } = action.payload;
            state[currencyCode] = {
                ...state[currencyCode],
                ...currencyData,
            };
        },
        toggleNotifyOnHigherRate(state, action) {
            const { currencyCode } = action.payload;
            const currentValue =
                state[currencyCode].notifyOnHigherRate || false;
            state[currencyCode].notifyOnHigherRate = !currentValue;
        },
        deleteCustomRate(state, action) {
            const { currencyCode } = action.payload;
            delete state[currencyCode];
        },
    },
});

export const { updateCustomRates, toggleNotifyOnHigherRate, deleteCustomRate } =
    customRatesSlice.actions;

export const customRatesReducer = customRatesSlice.reducer;
