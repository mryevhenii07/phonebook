import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contactsSlice';
import { customMiddlewareLogger } from './middlewear/logger';

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const store = configureStore({
  reducer: {
 
    contacts: persistReducer(persistCitiesConfig, contactsReducer),
 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(customMiddlewareLogger), 
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };