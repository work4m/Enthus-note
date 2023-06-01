import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './Reducer';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer instead of rootReducer
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export { store, persistStore };

export type RootState = ReturnType<typeof store.getState>
