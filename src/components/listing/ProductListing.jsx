import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../systemdesign/CustomeButton';

export default function ProductListing({ products, handleEdit, handleDelete }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.name} className="w-20 h-20 object-cover" />
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded text-blue-600 dark:text-blue-400" onClick={() => handleEdit(rowData.sku)} />
      <Button icon="pi pi-trash" className="p-button-rounded text-red-600 dark:text-red-400" onClick={() => handleDelete(rowData.sku)} />
    </div>
  );

  return (
    <div className=" dark:text-white p-6 rounded-lg ">
      <div className="flex justify-between mb-4">
        <div className="flex items-center w-full justify-between">
          <h2 className="heading dark:text-white">Products List</h2>
          <div className='flex gap-3'>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search....'
              className="border px-2 py-1 text-black dark:text-white dark:bg-gray-800 dark:border-gray-600"
            />
            <CustomButton title="Add" onClick={() => navigate('/products/add')} icon={'pi pi-plus'} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md dark:border-gray-700">
        <DataTable
          value={filteredProducts}
          paginator
          stripedRows
          rows={10}
          className="w-full overflow-auto"
          scrollable={true}
        >
          <Column field="image" header="Product Image" body={imageBodyTemplate} headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="sku" header="SKU" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="name" header="Product Name" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="category" header="Main Category" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="quantity" header="Quantity" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="monthlyPrice" header="Monthly Price" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column field="yearlyPrice" header="Yearly Price" headerClassName="bg-gray-100 text-black border-r dark:bg-gray-800 dark:text-white"></Column>
          <Column header="Options" body={actionBodyTemplate} headerClassName="bg-gray-100 text-black dark:bg-gray-800 dark:text-white"></Column>
        </DataTable>
      </div>
    </div>
  );
}
