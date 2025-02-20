import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import CustomButton from '../../systemdesign/CustomeButton';
import { Dialog } from 'primereact/dialog';

export default function RentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const [rentals] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/80', 
      title: 'Flexible Rental Solutions',
      subtitle: 'GET TO KNOW PRODUCTS',
    },
  ]);

  const filteredRentals = rentals.filter((rental) =>
    rental.title.toLowerCase().includes(search.toLowerCase())
  );

  const imageTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.title} className="w-20 h-12 object-contain flex justify-center" />
  );

  const actionsTemplate = () => (
    <div className="flex gap-2 ">
      <Button icon="pi pi-pencil" className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent" />
      <Button icon="pi pi-trash" onClick={() => setVisible(true)} className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent" />
    </div>
  );

  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <h5 className="text-xl font-bold">Rental Details List</h5>
        <div className="flex items-center gap-3">
          <IconField iconPosition="right" className='border p-2 rounded'>
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent"
            />
          </IconField>
          <CustomButton title="Add New" icon="pi pi-plus" onClick={() => navigate('add')} />
        </div>
      </div>

      <DataTable
        value={filteredRentals}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md bg"
      >
        <Column
          field="image"
          header="Rental Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white "
        //   bodyClassName="text-center"
        />
        <Column
          field="title"
          header="Title"
          headerClassName="bg-secondary border-r text-white"
        //   bodyClassName="text-center"
          className="font-semibold text-gray-700"
        />
        <Column
          field="subtitle"
          header="Subtitle"
          headerClassName="bg-secondary border-r text-white "
        //   bodyClassName="text-center"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary text-white "
        //   bodyClassName="text-center"
        />
      </DataTable>

      <Dialog header="Confirmation" position='top' draggable={false} visible={visible} className='' onHide={() => { if (!visible) return; setVisible(false); }}>
        <p className="mb-10">
           Do you want to delete this rental?
        </p>
        <div className='flex justify-between'>
          <CustomButton title={'Yes'} icon={'pi pi-check'}/>
          <CustomButton title={'No'} icon={'pi pi-times'}/>
        </div>
      </Dialog>
    </div>
  );
}
