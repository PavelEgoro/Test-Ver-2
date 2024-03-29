import React, { useState } from 'react';
import Table from './Table';
import { Column, PricePlan } from '../Interfaces';
import EditModal from './EditModal';

const pricePlansData: PricePlan[] = [
    {
        "id": 13334466,
        "description": "aute fugiat commodo id",
        "active": false,
        "createdAt": "1949-06-21T14:03:32.0Z",
        "removedAt": "1960-09-22T13:43:32.0Z"
      },
      {
        "id": 38738895,
        "description": "esse dolore cillum anim",
        "active": false,
        "createdAt": "2014-09-09T02:06:07.0Z",
        "removedAt": "2006-06-14T18:43:22.0Z"
      },
      {
        "id": 69423742,
        "description": "ullamco quis aliquip laborum",
        "active": false,
        "createdAt": "1982-10-18T01:51:07.0Z",
        "removedAt": "1978-03-15T11:19:21.0Z"
      },
      {
        "id": 78413703,
        "description": "nulla elit anim mollit occaecat",
        "active": false,
        "createdAt": "1959-07-30T18:57:54.0Z",
        "removedAt": "1980-01-31T01:46:32.0Z"
      },
      {
        "id": 51092826,
        "description": "pariatur elit voluptate",
        "active": false,
        "createdAt": "1976-09-08T02:38:21.0Z",
        "removedAt": "1995-06-28T23:17:24.0Z"
      },
      {
        "id": 92933022,
        "description": "ad cillum proident",
        "active": true,
        "createdAt": "1975-02-06T15:44:29.0Z",
        "removedAt": "1970-05-24T23:08:27.0Z"
      },
      {
        "id": 54507439,
        "description": "nisi eiusmod",
        "active": true,
        "createdAt": "1960-07-01T06:17:05.0Z",
        "removedAt": "1993-01-08T23:40:57.0Z"
      },
      {
        "id": 39230580,
        "description": "do in elit sit dolor",
        "active": true,
        "createdAt": "1984-10-02T14:32:01.0Z",
        "removedAt": "1985-09-30T09:48:12.0Z"
      },
      {
        "id": 99000859,
        "description": "reprehenderit exercitation Duis non",
        "active": false,
        "createdAt": "1977-07-05T09:58:14.0Z",
        "removedAt": "1991-07-12T09:30:12.0Z"
      },
      {
        "id": 74826040,
        "description": "dolor ullamco fugiat incididunt in",
        "active": false,
        "createdAt": "2004-12-10T22:13:28.0Z",
        "removedAt": "2021-09-09T11:21:13.0Z"
      }
];

const PricePlansPage: React.FC = () => {
  const [price, setPrice] = useState<PricePlan[]>(pricePlansData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<PricePlan | null>(null);
  const [filter, setFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleEditClick = (price: PricePlan) => {
    setCurrentPrice(price);
    setIsEditModalOpen(true);
  };

  const handleSave = (newDescription: string) => {
    if (currentPrice) {
      const updatedPrices = price.map((price) =>
        price.id === currentPrice.id ? { ...price, description: newDescription } : price
      );
      setPrice(updatedPrices); 
      setIsEditModalOpen(false);
      setCurrentPrice(null); 
    }
  };

  const filteredData = price.filter(price =>{
    const matchesFilter = price.description.toLowerCase().includes(filter.toLowerCase())
    return matchesFilter && (activeFilter === 'all' || (activeFilter === 'active' && price.active) || (activeFilter === 'inactive' && !price.active));
  });

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  }

  const columns: Column<PricePlan>[] = [
    { key: 'description', title: 'Name' },
    { key: 'active', title: 'Active', render: (price) => (price.active ? 'Active' : 'Inactive') },
    { key: 'createdAt', title: 'Created', render: (page) => formatDate(page.createdAt) },
    {key: 'actions',title: 'Actions',render: (price) => <button onClick={() => handleEditClick(price)}>Edit</button>,
    },
  ];

  return (
    <div>
      <input
        className="searchInput"
        type="text"
        placeholder="Поиск..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
       <select className="filterSelect" onChange={(e) => setActiveFilter(e.target.value as 'all' | 'active' | 'inactive')} value={activeFilter}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <Table data={filteredData} columns={columns} />
      {isEditModalOpen && currentPrice && (
        <EditModal
          initialName={currentPrice.description}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PricePlansPage;