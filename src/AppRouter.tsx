import { Routes, Route } from 'react-router-dom';

import "./App.css";
import Home from './pages/Home';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
    </Routes>
  );
}

export default AppRouter;