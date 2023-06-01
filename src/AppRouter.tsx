import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import "./App.css";
import Home from './pages/Home/Home';
import { store, persistStore } from './store/Store';

function AppRouter() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<span className="loader"></span>} persistor={persistor}>
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default AppRouter;