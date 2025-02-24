import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from 'react-router-dom';

export default function ServiceList() {
    const navigate= useNavigate()
    
  const [services, setServices] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'Domestic Water Filters',
      shortDescription: 'Our Domestic Water Filters Ensure Clean, Clear, and Safe Water for Your Daily Needs. Experience the Purity Within Every Drop.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50',
      title: 'Commercial Water Filters',
      shortDescription: 'Reliable Commercial Water Filters for Purity and Refreshment in Every Drop. Optimize Your Workplace Hydration with Confidence.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50',
      title: 'Industrial Water Filters',
      shortDescription: 'Unmatched Efficiency Ensures Pure and Clean Water. Elevate Your Industrial Hydration Standards for Uninterrupted Quality and Reliability.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/50',
      title: 'RO Services',
      shortDescription: 'Ensuring Optimal Performance and Purity. Trust us for Reliable Maintenance, Extending the Lifespan of Your RO System.',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/50',
      title: 'Water Coolers and Dispensers',
      shortDescription: 'Stay refreshed effortlessly with our Water Coolers and Dispensers stylish, convenient, and always ready to provide instant, crisp hydration.',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/50',
      title: 'Chillers and Tanks',
      shortDescription: 'Experience optimal cooling with our Chillers and Tanks efficient, reliable, and tailored to ensure your beverages stay refreshingly cool every time.',
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/50',
      title: 'Appliances',
      shortDescription: 'Elevate your home with our high quality appliances innovative, reliable, and designed to enhance your daily life with efficiency and style.',
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <button className="text-blue-500 hover:underline">✏️</button>
      <button className="text-red-500 hover:underline">🗑️</button>
    </div>
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter services based on search query
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Service List</h3>
        <div className="flex gap-2">
          <InputText 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="Search..." 
            className="p-2 border rounded" 
          />
          <CustomButton title={'Add New '} icon={'pi pi-plus'} onClick={()=>navigate('/service/add')}/>
        </div>
      </div>

      <DataTable 
        value={filteredServices} 
        stripedRows
        paginator 
        rows={5} 
        responsiveLayout="scroll" 
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column 
          field="image" 
          header="Service Image" 
          body={(rowData) => <img src={rowData.image} alt="Service" className="w-12 h-12" />} 
        />
        <Column field="title" header="Service Title" className="font-semibold" />
        <Column field="shortDescription" header="Service Short Description" className='w-1/2'/>
        <Column header="Option" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
