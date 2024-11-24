import storage from 'redux-persist/lib/storage';
import customRatesReducer from '@store/customRatesSlice';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';

const persistConfig = { key: 'root', storage };

const rootReducer = combineReducers({
	customRates: customRatesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST],
			},
		}),
});

export const persistor = persistStore(store);
