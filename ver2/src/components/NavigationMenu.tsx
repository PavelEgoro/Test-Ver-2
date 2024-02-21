import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

const NavigationMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <button onClick={() => setShowMenu(!showMenu)} className="filterButton">Filter</button>
      {showMenu && (
        <div className="dropdownMenu">
          <ul>
            <li><Link to="/products">Product Page</Link></li>
            <li><Link to="/price-plans">Price Plan Page</Link></li>
            <li><Link to="/pages">Pages Page</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
