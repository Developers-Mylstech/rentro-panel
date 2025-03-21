import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import CustomButton from '../../systemdesign/CustomeButton';
import { Dialog } from 'primereact/dialog';

export default function RentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  // Sample Data
  const [rentals] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      title: 'Flexible Rental Solutions',
      subtitle: 'GET TO KNOW PRODUCTS',
    },
  ]);

  // Filtered Rentals
  const filteredRentals = rentals.filter((rental) =>
    rental.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDelete = () => {
    console.log(`Rental with ID ${selectedRental?.id} deleted`);
    setVisible(false);
  };

  // Image Template
  const imageTemplate = (rowData) => (
    <div className="flex justify-center">
      <img
        src={rowData.image}
        alt={rowData.title}
        className="w-20 h-12 object-contain rounded-md"
      />
    </div>
  );

  // Actions Template
  const actionsTemplate = (rowData) => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
      <Button
        icon="pi pi-trash"
        onClick={() => {
          setSelectedRental(rowData);
          setVisible(true);
        }}
        className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
    </div>
  );

  return (
    <div>
      {/* ✅ Responsive Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Heading */}
        <h5 className="text-xl font-semibold text-gray-700 w-full md:w-auto">
          Rental Details List
        </h5>

        {/* Search and Button Container */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <IconField
            iconPosition="right"
            className="border rounded flex w-full md:w-64"
          >
            <InputIcon className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none flex-1"
            />
          </IconField>

          {/* Add New Button */}
          <CustomButton
            title="Add New"
            icon="pi pi-plus"
            onClick={() => navigate('add')}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      {/* ✅ Table Section */}
      <DataTable
        value={filteredRentals}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md mb-8 hidden lg:block"
      >
        <Column
          field="image"
          header="Rental Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center"
        />
        <Column
          field="title"
          header="Title"
          headerClassName="bg-secondary border-r text-white text-center"
          bodyClassName="text-center font-semibold"
        />
        <Column
          field="subtitle"
          header="Subtitle"
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

      {/* ✅ Card View Section */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {filteredRentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={rental.image}
              alt={rental.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {rental.title}
              </h3>
              <p className="text-sm text-gray-500">{rental.subtitle}</p>
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-secondary "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-secondary "
                  onClick={() => {
                    setSelectedRental(rental);
                    setVisible(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        header="Confirmation"
        position="top"
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <p className="mb-10">
          Do you want to delete this rental with ID{" "}
          <strong>{selectedRental?.id}</strong>?
        </p>
        <div className="flex justify-between">
          <CustomButton
            title="Yes"
            icon="pi pi-check"
            onClick={handleDelete}
          />
          <CustomButton
            title="No"
            icon="pi pi-times"
            onClick={() => setVisible(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}
