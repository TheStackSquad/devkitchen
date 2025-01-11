// src/reduxStore/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authReducer from '@/reduxStore/reducer/authReducer';
import vendorReducer from '@/reduxStore/reducer/vendorReducer';

// Create a custom storage for Next.js
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Initialize storage based on environment
const storage = typeof window !== 'undefined' 
  ? createWebStorage('local')
  : createNoopStorage();

// Persist configurations
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const vendorPersistConfig = {
  key: 'vendor',
  storage,
  whitelist: ['isAuthenticated', 'vendorData'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedVendorReducer = persistReducer(vendorPersistConfig, vendorReducer);

// Logger setup with better Next.js compatibility
const createMiddleware = () => {
  const middleware = [];
  
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: true,
      timestamp: true,
      colors: {
        title: () => '#139BFE',
        prevState: () => '#9E9E9E',
        action: () => '#149945',
        nextState: () => '#A47104',
        error: () => '#ff0005',
      },
    });
    middleware.push(logger);
  }
  
  return middleware;
};

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    vendor: persistedVendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(createMiddleware()),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);