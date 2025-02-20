import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function ProductListing({ products, handleEdit, handleDelete }) {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

 
  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.name} className="w-20 h-20 object-cover" />
  );


  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded text-blue-600" onClick={() => handleEdit(rowData.sku)} />
      <Button icon="pi pi-trash" className="p-button-rounded text-red-600" onClick={() => handleDelete(rowData.sku)} />
    </div>
  );

  return (
    <div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <span>Entries per page:</span>
          <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="border p-1 text-black">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Search:</span>
          <InputText value={search} onChange={(e) => setSearch(e.target.value)} className="border px-2 py-1 text-black" />
        </div>
      </div>

      {/* Scrollable Table Wrapper */}
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <DataTable 
          value={filteredProducts} 
          paginator 
          rows={entries} 
          className="w-full overflow-auto"
          scrollable={true}
        >
          <Column field="image" header="Product Image" body={imageBodyTemplate} headerClassName="bg-secondary text-white"></Column>
          <Column field="sku" header="SKU" headerClassName="bg-secondary text-white"></Column>
          <Column field="name" header="Product Name" headerClassName="bg-secondary text-white"></Column>
          <Column field="category" header="Main Category" headerClassName="bg-secondary text-white"></Column>
          <Column field="quantity" header="Quantity" headerClassName="bg-secondary text-white"></Column>
          <Column field="monthlyPrice" header="Monthly Price" headerClassName="bg-secondary text-white"></Column>
          <Column field="yearlyPrice" header="Yearly Price" headerClassName="bg-secondary text-white"></Column>
          <Column header="Options" body={actionBodyTemplate} headerClassName="bg-secondary text-white"></Column>
        </DataTable>
      </div>
    </div>
  );
}
