import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from 'react-router-dom';

export default function ServiceList() {
  const navigate = useNavigate();

  const [services] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      title: 'Domestic Water Filters',
      shortDescription:
        'Our Domestic Water Filters Ensure Clean, Clear, and Safe Water for Your Daily Needs.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      title: 'Commercial Water Filters',
      shortDescription:
        'Reliable Commercial Water Filters for Purity and Refreshment in Every Drop.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/80',
      title: 'Industrial Water Filters',
      shortDescription:
        'Unmatched Efficiency Ensures Pure and Clean Water for Industrial Use.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/80',
      title: 'RO Services',
      shortDescription:
        'Ensuring Optimal Performance and Purity. Trust us for Reliable Maintenance.',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/80',
      title: 'Water Coolers and Dispensers',
      shortDescription:
        'Stay refreshed with our Water Coolers and Dispensers, stylish and convenient.',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/80',
      title: 'Chillers and Tanks',
      shortDescription:
        'Experience optimal cooling with our Chillers and Tanks, efficient and reliable.',
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/80',
      title: 'Appliances',
      shortDescription:
        'High-quality appliances designed to enhance your daily life with efficiency.',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered List
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Delete
  const handleDelete = (id) => {
    console.log(`Deleted service with ID: ${id}`);
  };

  // Table Action Template
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-blue-500 focus:ring-0"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-sm text-red-500 focus:ring-0"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  // Image Template
  const imageTemplate = (rowData) => (
    <div className="flex justify-center dark:text-gray-100 dark:bg-gray-800">
      <img
        src={rowData.image}
        alt={rowData.title}
        className="w-16 h-16 object-contain rounded-md"
      />
    </div>
  );

  return (
    <div>
      {/* ✅ Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mx-4 md:mx-0">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-700 w-full md:w-auto dark:text-gray-100 ">
          Service List
        </h3>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center gap-3 w-full md:w-auto ">
          {/* Search Bar */}
         <div className="flex relative justify-between p-2   w-[70%] md:w-64 border rounded-md dark:text-gray-100 dark:bg-gray-800">
                     
                       <i className="pi pi-search  absolute top-3 right-2 text-gray-400 " />
                       <InputText
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Search..."
                         className=" w-full border-none outline-none dark:text-gray-100 dark:bg-gray-800"
                        
                       />
                
                   </div>

          {/* Add New Button */}
          <CustomButton
            title="Add"
            icon="pi pi-plus"
            onClick={() => navigate('/service/add')}
            className=" w-auto"
          />
        </div>
      </div>

      {/* ✅ Table View for Desktop */}
      <DataTable
        value={filteredServices}
        paginator
        rows={5}
        stripedRows
        className="hidden lg:block border border-gray-300 rounded-md"
        paginatorClassName='dark:text-gray-100 dark:bg-gray-800'
      >
        <Column
          field="image"
          header="Service Image"
          body={imageTemplate}
          headerClassName="bg-secondary border text-white text-center dark:text-gray-100 dark:bg-gray-800"
          bodyClassName="text-center dark:text-gray-100 dark:bg-gray-800"
        />
        <Column
          field="title"
          header="Service Title"
          headerClassName="bg-secondary border text-white text-center dark:text-gray-100 dark:bg-gray-800"
          bodyClassName="text-center font-semibold dark:text-gray-100 dark:bg-gray-800"
        />
        <Column
          field="shortDescription"
          header="Service Description"
          headerClassName="bg-secondary border text-white text-center dark:text-gray-100 dark:bg-gray-800"
          bodyClassName="text-center dark:text-gray-100 dark:bg-gray-800"
        />
        <Column
          header="Options"
          body={actionBodyTemplate}
          headerClassName="bg-secondary border text-white text-center dark:text-gray-100 dark:bg-gray-800"
          bodyClassName="text-center dark:text-gray-100 dark:bg-gray-800"
        />
      </DataTable>

      {/* ✅ Card View for Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden px-6 ">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border dark:text-gray-100 dark:bg-gray-800"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-32 object-cover dark:text-gray-100 dark:bg-gray-800"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 dark:bg-gray-800">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-100 dark:bg-gray-800">
                {service.shortDescription}
              </p>
              <div className="flex justify-center mt-4 gap-3 dark:text-gray-100 dark:bg-gray-800">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-green-300  "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-red-300 "
                  onClick={() => handleDelete(service.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
