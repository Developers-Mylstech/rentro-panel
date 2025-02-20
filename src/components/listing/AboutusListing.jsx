import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from "react-router-dom";

export default function AboutusListing() {
  const [search, setSearch] = useState('');
    const [entries, setEntries] = useState(10);

    const navigate = useNavigate();
    
      const handleNavigate = () => {
          navigate('/about/add');
      };

  const aboutUsData = [
    {
      image: 'http://panelro.xpertspot.com/assets/images/product/1.png',
      title: 'WHO WE ARE',
      subtitle: 'GET TO KNOW RENT RO',
    }
  ];

  // Filtering the data based on search input
  const filteredData = aboutUsData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Image Template
  const imageTemplate = (rowData) => (
    <img 
      src={rowData.image} 
      alt={rowData.title} 
      className="w-20 h-20 object-cover"
    />
  );

  // Option Template for Edit and Delete buttons
  const optionTemplate = () => (
    <div className="flex justify-start gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info text-blue-600" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger text-red-600" />
    </div>
  );

  return (
    <div className="p-4">
      <div className='flex justify-between items-center my-4'>
      <h2 className="heading">About Us List</h2>
      <CustomButton  title="+ Add New" onClick={handleNavigate} />
      </div>

      <div className=' p-10 border'>
      <div className="flex justify-between mb-4">
      <div className="flex items-center gap-2 ">
            <span>Entries per page:</span>
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="border p-1 text-black ">
                <option className='hover:bg-secondary' value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Search:</span>
          <InputText 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className='border px-2 py-1 text-black'
          />
        </div>
        
      </div>

      <DataTable value={filteredData} paginator  rows={10} responsiveLayout="scroll">
        <Column 
          field="image" 
          header="About Us Image" 
          headerClassName="bg-secondary  text-primary "
          body={imageTemplate}
        />
        <Column 
          field="title" 
          header="Title" 
          headerClassName="bg-secondary  text-primary "
        />
        <Column 
          field="subtitle" 
          header="Subtitle" 
          headerClassName="bg-secondary text-primary "
        />
        <Column 
          header="Option" 
          body={optionTemplate} 
          headerClassName="bg-secondary  text-primary "
        />
      </DataTable>
      </div>
    </div>
  );
}
