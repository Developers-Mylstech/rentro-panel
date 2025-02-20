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

export default function BannerList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const [banners] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/80', 
      title: 'RAMADAN OFFER',
      details: 'On Monthly Rent',
      description: 'Your Trusted Partner for Reliable Water Filters and Services.',
      originalPrice: 'AED 70.00',
      offerPrice: 'AED 50.00',
    },
  ]);

  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(search.toLowerCase())
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
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold">Banner List</h5>
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
        value={filteredBanners}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md bg"
      >
        <Column
          field="image"
          header="Banner Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="title"
          header="Offer Title"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
          className="font-semibold text-gray-700"
        />
        <Column
          field="details"
          header="Offer Details"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="description"
          header="Offer Description"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="originalPrice"
          header="Original Price"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="offerPrice"
          header="Offer Price"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary text-white text-center"
          bodyClassName="text-center"
        />
      </DataTable>

      <Dialog header="Confirmation" position='top' draggable={false} visible={visible} className='' onHide={() => { if (!visible) return; setVisible(false); }}>
        <p className="mb-10">
           Do you want to delete this banner?
        </p>
        <div className='flex justify-between'>
          <CustomButton title={'Yes'} icon={'pi pi-check'}/>
          <CustomButton title={'No'} icon={'pi pi-times'}/>
        </div>
      </Dialog>
    </div>
  );
}
