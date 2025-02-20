import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AboutusListing() {
  const aboutUsData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'WHO WE ARE',
      subtitle: 'GET TO KNOW RENT RO',
    },
  ];

  const actionBodyTemplate = () => (
    <div className="flex gap-2">
      <button className="text-blue-500 hover:underline">✏️</button>
      <button className="text-red-500 hover:underline">🗑️</button>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">About Us List</h3>
        <div className="flex gap-2">
          <InputText placeholder="Search..." className="p-2 border rounded" />
          <Button label="+ Add New" className="p-button-success" />
        </div>
      </div>

      <DataTable value={aboutUsData} paginator rows={5} responsiveLayout="scroll">
        <Column
          field="image"
          header="About Us Image"
          body={(rowData) => <img src={rowData.image} alt="About Us" className="w-12 h-12" />}
        />
        <Column field="title" header="Title" className="font-semibold" />
        <Column field="subtitle" header="Subtitle" />
        <Column header="Option" body={actionBodyTemplate} />
      </DataTable>

      <div className="mt-4 text-sm text-gray-600">
        Showing 1 to 1 of 1 entry
      </div>

      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">«</button>
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">‹</button>
        <span className="px-4 py-2 text-sm text-gray-600">1</span>
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">›</button>
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">»</button>
      </div>
    </div>
  );
}
