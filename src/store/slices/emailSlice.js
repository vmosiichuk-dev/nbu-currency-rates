import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
	name: 'email',
	initialState: { email: null },
	reducers: {
		setEmail: (state, action) => {
			console.log({state, action})
			state.email = action.payload;
		},
		clearEmail: (state) => {
			state.email = null;
		},
	},
	selectors: {
		selectEmail: (state) => state.email,
	},
});

export const { selectEmail } = emailSlice.selectors;
export const { setEmail, clearEmail } = emailSlice.actions;
export const emailReducer = emailSlice.reducer;
