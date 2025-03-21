import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from 'react-router-dom';

export default function SaleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sales] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      title: 'Special Sale Offer',
      subtitle: 'Limited Time Discount',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      title: 'Holiday Sale',
      subtitle: '50% off on all items',
    },
  ]);

  // Filter Sales List
  const filteredSales = sales.filter((sale) =>
    sale.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDelete = (id) => {
    console.log(`Sale with ID ${id} deleted`);
  };

  // Action Template for Table View
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

  // Sale Image Template for Table View
  const imageTemplate = (rowData) => (
    <div className="flex justify-center">
      <img
        src={rowData.image}
        alt="Sale"
        className="w-16 h-16 object-contain rounded-md"
      />
    </div>
  );

  return (
    <div>
      {/* ✅ Responsive Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-700 w-full md:w-auto">
          Sale List
        </h3>

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="flex relative justify-between p-2  w-full md:w-64 border rounded-md">
            
              <i className="pi pi-search  absolute top-3 right-2 text-gray-400 " />
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="p-inputtext-sm w-full border-none outline-none"
              />
       
          </div>

          {/* Add New Button */}
          <CustomButton
            title="Add New"
            icon="pi pi-plus"
            onClick={() => navigate('/sale/add')}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      {/* ✅ Table View */}
      <DataTable
        value={filteredSales}
        paginator
        rows={5}
        stripedRows
        className="hidden lg:block border border-gray-300 rounded-md"
      >
        <Column
          field="image"
          header="Sale Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="title"
          header="Title"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center font-semibold"
        />
        <Column
          field="subtitle"
          header="Subtitle"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          header="Option"
          body={actionBodyTemplate}
          headerClassName="bg-secondary text-white text-center"
          bodyClassName="text-center"
        />
      </DataTable>

      {/* ✅ Card View (For Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden px-6">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={sale.image}
              alt={sale.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {sale.title}
              </h3>
              <p className="text-sm text-gray-500">{sale.subtitle}</p>
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-secondary "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-secondary"
                  onClick={() => handleDelete(sale.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
