import React, { useState } from 'react';
import Table from './Table';
import { Product, Column } from '../Interfaces';
import EditModal from './EditModal';

const productsData: Product[] = [
  {
    "id": 14381328,
    "name": "id quis voluptate nostrud",
    "options": {
     "size": "XL",
     "amount": 100
    },
    "active": true,
    "createdAt": "1985-08-09T02:10:18.0Z"
   },
  
   {
    "id": 26785188,
    "name": "esse elit",
    "options": {
     "size": "S",
     "amount": 10
    },
    "active": true,
    "createdAt": "1956-03-20T08:59:40.0Z"
   },
  
   {
    "id": 63878634,
    "name": "enim", 
    "options": {
     "size": "L",
     "amount": 20
    },
    "active": false,
    "createdAt": "2016-07-27T16:05:57.0Z"
   },
  
   {
    "id": 79901249,
    "name": "eu ad",
    "options": {
     "size": "XXL",
     "amount": 1000
    },
    "active": true,
    "createdAt": "1988-08-20T03:53:24.0Z"
   },
  
   {
    "id": 53113051,
    "name": "proident ipsum",
    "options": {
     "size": "XL",
     "amount": 4
    },
    "active": true,
    "createdAt": "2003-01-19T20:09:29.0Z"
   },
  
   {
    "id": 49132779,
    "name": "aliqua adipisicing",
    "options": {
     "size": "S",
     "amount": 22
    },
    "active": false,
    "createdAt": "2003-06-14T02:44:44.0Z"
   },
  
   {
    "id": 12135250,
    "name": "dolor non in sunt",
    "options": {
     "size": "M",
     "amount": 11
    },
    "active": true,
    "createdAt": "2000-08-04T19:49:04.0Z"
   },
  
   {
    "id": 47196404,
    "name": "dolor culpa in cupidatat",
    "options": {
     "size": "S",
     "amount": 1
    },
    "active": false,
    "createdAt": "2003-11-15T23:56:45.0Z"
   },
  
   {
    "id": 5112903,
    "name": "sunt amet do eu ipsum",
    "options": {
     "size": "L",
     "amount": 10
    },
    "active": false,
    "createdAt": "1968-09-24T22:07:21.0Z"
   },
  
   {
    "id": 32497729,
    "name": "eiusmod",
    "options": {
     "size": "XXL",
     "amount": 0
    },
    "active": true,
    "createdAt": "2012-09-24T01:42:32.0Z"
   }
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [filter, setFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSave = (newName: string) => {
    if (currentProduct) {
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? { ...product, name: newName } : product
      );
      setProducts(updatedProducts); 
      setIsEditModalOpen(false);
      setCurrentProduct(null); 
    }
  };
  


  const filteredData = products.filter(product => {
    const matchesFilter = product.name.toLowerCase().includes(filter.toLowerCase());
    return matchesFilter && (activeFilter === 'all' || (activeFilter === 'active' && product.active) || (activeFilter === 'inactive' && !product.active));
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
  
  

  const columns: Column<Product>[] = [
    { key: 'name', title: 'Name' },
    { key: 'options', title: 'Options', render: (product) => `${product.options.size} / ${product.options.amount}` },
    { key: 'active', title: 'Active', render: (product) => (product.active ? 'Active' : 'Inactive') },
    { key: 'createdAt', title: 'Created', render: (page) => formatDate(page.createdAt) },
    {key: 'actions',title: 'Actions',render: (product) => <button onClick={() => handleEditClick(product)}>Edit</button>,
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
      {isEditModalOpen && currentProduct && (
        <EditModal
          initialName={currentProduct.name}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;

