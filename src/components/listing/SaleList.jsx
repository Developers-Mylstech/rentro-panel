import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function SaleList() {
  const sales = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'Special Sale Offer',
      subtitle: 'Limited Time Discount',
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
        <h3 className="text-2xl font-bold">Sale List</h3>
        <div className="flex gap-2">
          <InputText placeholder="Search..." className="p-2 border rounded" />
          <Button label="+ Add New" className="p-button-success" />
        </div>
      </div>

      <DataTable value={sales} paginator rows={5} responsiveLayout="scroll">
        <Column field="image" header="Sale Image" body={(rowData) => <img src={rowData.image} alt="Sale" className="w-12 h-12" />} />
        <Column field="title" header="Title" className="font-semibold" />
        <Column field="subtitle" header="Subtitle" />
        <Column header="Option" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
