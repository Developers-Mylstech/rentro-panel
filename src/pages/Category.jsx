import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import CustomButton from '../systemdesign/CustomeButton';
import { Dialog } from 'primereact/dialog';

export default function Category() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const [categories] = useState([
    { id: 1, mainCategory: 'Water Tanker', subCategory: 'Sweet Water/Salt Water/Sewage', image: 'https://via.placeholder.com/80' },
    { id: 2, mainCategory: 'Accessories', subCategory: 'Accessories', image: 'https://via.placeholder.com/80' },
    { id: 3, mainCategory: 'Appliances', subCategory: 'Appliances', image: 'https://via.placeholder.com/80' },
    { id: 4, mainCategory: 'Chillers', subCategory: 'Chillers', image: 'https://via.placeholder.com/80' },
    { id: 5, mainCategory: 'Dispenser', subCategory: 'Dispenser', image: 'https://via.placeholder.com/80' },
    { id: 6, mainCategory: 'Water Cooler', subCategory: 'Cooler', image: 'https://via.placeholder.com/80' },
    { id: 7, mainCategory: 'Industrial', subCategory: 'Filter', image: 'https://via.placeholder.com/80' },
  ]);

  const filteredCategories = categories.filter((category) =>
    category.mainCategory.toLowerCase().includes(search.toLowerCase())
  );

  const imageTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.mainCategory} className="w-20 h-12 object-contain flex justify-center" />
  );

  const actionsTemplate = () => (
    <div className="flex gap-2 ">
      <Button icon="pi pi-pencil" className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent" />
      <Button icon="pi pi-trash" onClick={() => setVisible(true)} className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent" />
    </div>
  );

  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold">Category List</h5>
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
          <CustomButton title="Add Category" icon="pi pi-plus" onClick={() => navigate('add')} />
        </div>
      </div>

      <DataTable
        value={filteredCategories}
        paginator
        rows={10}
        stripedRows
        className="border border-gray-300 rounded-md bg"
      >
        <Column
          field="image"
          header="Category Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white "
        />
        <Column
          field="mainCategory"
          header="Main Category"
          headerClassName="bg-secondary border-r text-white text-center"
          className="font-semibold text-gray-700"
        />
        <Column
          field="subCategory"
          header="Subcategory"
          headerClassName="bg-secondary border-r text-white text-center"
          className="font-semibold text-gray-700"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary text-white "
        />
      </DataTable>

      <Dialog header="Confirmation" position='top' draggable={false} visible={visible} className='' onHide={() => { if (!visible) return; setVisible(false); }}>
        <p className="mb-10">
           Do you want to delete this field?
        </p>
        <div className='flex justify-between'>
          <CustomButton title={'Yes'} icon={'pi pi-check'}/>
          <CustomButton title={'No'} icon={'pi pi-times'}/>
        </div>
      </Dialog>
    </div>
  );
}
