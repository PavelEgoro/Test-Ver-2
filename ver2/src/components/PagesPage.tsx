import React, { useState } from 'react';
import Table from './Table';
import { Column, Page} from '../Interfaces';
import EditModal from './EditModal';

const pageData: Page[] = [
  {
    "id": 23634610,
    "title": "aliquip sit proident veniam tempor",
    "active": false,
    "updatedAt": "1948-04-09T10:15:44.0Z",
    "publishedAt": "1956-09-25T20:13:19.0Z"
  },
  {
    "id": 67303872,
    "title": "dolor pariatur et ipsum fugiat",
    "active": false,
    "updatedAt": "2021-10-23T04:51:35.0Z",
    "publishedAt": "1987-02-20T02:45:15.0Z"
  },
  {
    "id": 49117143,
    "title": "amet ut cillum tempor",
    "active": false,
    "updatedAt": "2007-04-09T13:18:03.0Z",
    "publishedAt": "1955-07-01T17:29:49.0Z"
  },
  {
    "id": 57694553,
    "title": "sed sint quis",
    "active": false,
    "updatedAt": "1995-11-26T08:12:19.0Z",
    "publishedAt": "1955-01-16T01:02:51.0Z"
  },
  {
    "id": 52130295,
    "title": "consectetur officia ullamco",
    "active": false,
    "updatedAt": "1988-10-05T04:13:21.0Z",
    "publishedAt": "1982-03-19T19:19:49.0Z"
  },
  {
    "id": 87091875,
    "title": "occaecat et proident",
    "active": true,
    "updatedAt": "2000-05-25T16:49:30.0Z",
    "publishedAt": "2018-04-18T20:33:59.0Z"
  },
  {
    "id": 38008840,
    "title": "laboris",
    "active": true,
    "updatedAt": "1959-09-18T09:16:21.0Z",
    "publishedAt": "2001-07-12T09:30:50.0Z"
  },
  {
    "id": 62296414,
    "title": "esse minim laboris",
    "active": false,
    "updatedAt": "2021-09-09T22:06:01.0Z",
    "publishedAt": "1989-10-06T07:25:18.0Z"
  },
  {
    "id": 76976188,
    "title": "id cupidatat fugiat tempor",
    "active": false,
    "updatedAt": "1949-05-06T18:01:58.0Z",
    "publishedAt": "1991-09-01T02:29:58.0Z"
  },
  {
    "id": 22666349,
    "title": "minim est",
    "active": true,
    "updatedAt": "1985-04-15T01:04:37.0Z",
    "publishedAt": "1998-12-12T14:02:25.0Z"
  }
];

const PricePlansPage: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(pageData);
  const [filter, setFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const handleEditClick = (page: Page) => {
    setCurrentPage(page);
    setIsEditModalOpen(true);
  };

  const handleSave = (newTitle: string) => {
    if (currentPage) {
      const updatedPages = pages.map((page) =>
        page.id === currentPage.id ? { ...page, title: newTitle } : page
      );
      setPages(updatedPages);
      setIsEditModalOpen(false);
      setCurrentPage(null);
    }
  };
  
  const filteredData = pages.filter(page => {
    const matchesFilter = page.title.toLowerCase().includes(filter.toLowerCase());
    return matchesFilter && (activeFilter === 'all' || (activeFilter === 'active' && page.active) || (activeFilter === 'inactive' && !page.active));
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

  const columns: Column<Page>[] = [
    { key: 'title', title: 'Title' },
    { key: 'active', title: 'Active', render: (page) => (page.active ? 'Active' : 'Inactive') },
    { key: 'updatedAt', title: 'Updated At', render: (page) => formatDate(page.updatedAt)},
    { key: 'actions', title: 'Actions', render: (page) => <button className="modalButton" onClick={() => handleEditClick(page)}>Edit</button> },
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
      {isEditModalOpen && currentPage && (
        <EditModal
          initialName={currentPage.title}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
        )}
    </div>
  );
};

export default PricePlansPage;