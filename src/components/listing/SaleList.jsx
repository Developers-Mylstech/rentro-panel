import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from 'react-router-dom';

export default function SaleList() {
  const navigate =useNavigate()
  const sales = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'Special Sale Offer',
      subtitle: 'Limited Time Discount',
    },
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'Special Sale Offer',
      subtitle: 'Limited Time Discount',
    },
  ];

  const actionBodyTemplate = () => (
    <div className="flex gap-2">
      <button className="text-blue-500">✏️</button>
      <button className="text-red-500">🗑️</button>
    </div>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Sale List</h3>
        <div className="flex gap-2">
          <InputText placeholder="Search..." className="p-2 border rounded" />
          <CustomButton title={'Add New'} icon={'pi pi-plus'} onClick={()=>navigate('/sale/add')} />
        </div>
      </div>

      <DataTable value={sales} stripedRows paginator rows={5} responsiveLayout="scroll">
        <Column field="image" header="Sale Image" body={(rowData) => <img src={rowData.image} alt="Sale" className="w-12 h-12" />} />
        <Column field="title" header="Title" className="font-semibold" />
        <Column field="subtitle" header="Subtitle" />
        <Column header="Option" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
