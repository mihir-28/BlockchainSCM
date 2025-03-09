import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

import './index.css';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;