import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from '../src/components/ProductsPage';
import PricePlansPage from './components/PricePlansPage';
import PagesPage from './components/PagesPage';
import NavigationMenu from './components/NavigationMenu';

const App: React.FC = () => {
  return (
    <Router>
     <NavigationMenu />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/price-plans" element={<PricePlansPage />} />
        <Route path="/pages" element={<PagesPage />} />
      </Routes>
    </Router>
  );
};

export default App;



