import { Routes, Route } from 'react-router-dom';

import "./App.css";
import Home from './pages/Home/Home';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
    </Routes>
  );
}

export default AppRouter;