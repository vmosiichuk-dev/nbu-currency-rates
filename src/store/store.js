import storage from 'redux-persist/lib/storage';
import { emailReducer } from '@slices/emailSlice.js';
import { customRatesReducer } from '@slices/customRatesSlice.js';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: import.meta.env.VITE_REDUX_ENCRYPTION_KEY,
            onError: (error) => console.error('Encryption error:', error),
        }),
    ],
};

const rootReducer = combineReducers({
    email: emailReducer,
    customRates: customRatesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);
