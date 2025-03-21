import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import CustomButton from '../../systemdesign/CustomeButton';

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
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      title: 'SUMMER DEAL',
      details: '50% Off on All Products',
      description: 'Don\'t miss out on our summer sale!',
      originalPrice: 'AED 100.00',
      offerPrice: 'AED 50.00',
    },
  ]);

  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(search.toLowerCase())
  );

  // Template for table image column
  const imageTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.title}
      className="w-20 h-12 object-contain mx-auto"
    />
  );

  // Template for table actions column
  const actionsTemplate = () => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text text-blue-500"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text text-red-500"
        onClick={() => setVisible(true)}
      />
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-700">Banner List</h5>
        <div className="flex items-center gap-3">
          <IconField iconPosition="right" className="border p-2 rounded">
            <InputIcon className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="focus:ring-0 focus:outline-none"
            />
          </IconField>
          <CustomButton
            title="Add New"
            icon="pi pi-plus"
            onClick={() => navigate('add')}
          />
        </div>
      </div>

      {/* Table Section (For larger screens) */}
      <div className="hidden lg:block overflow-x-auto border rounded-lg shadow-md">
        <DataTable
          value={filteredBanners}
          paginator
          rows={5}
          stripedRows
          className="w-full"
          scrollable
        >
          <Column
            field="image"
            header="Banner Image"
            body={imageTemplate}
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
          <Column
            field="title"
            header="Offer Title"
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
            className="font-semibold text-gray-700"
          />
          <Column
            field="details"
            header="Offer Details"
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
          <Column
            field="description"
            header="Offer Description"
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
          <Column
            field="originalPrice"
            header="Original Price"
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
          <Column
            field="offerPrice"
            header="Offer Price"
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
          <Column
            header="Options"
            body={actionsTemplate}
            headerClassName="bg-secondary text-white text-center"
            bodyClassName="text-center"
          />
        </DataTable>
      </div>

      {/* Card View Section (For mobile screens) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {filteredBanners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Card Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-48 object-contain"
            />

            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {banner.title}
              </h3>
              <p className="text-sm text-gray-500">{banner.details}</p>
              <p className="text-sm text-gray-500 mt-2">
                {banner.description}
              </p>

              {/* Prices */}
              <div className="flex justify-between mt-4">
                <div>
                  <span className="text-sm text-gray-500">Original:</span>
                  <span className="text-md font-semibold text-gray-700 ml-1">
                    {banner.originalPrice}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Offer:</span>
                  <span className="text-md font-semibold text-red-500 ml-1">
                    {banner.offerPrice}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-secondary "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-secondary"
                  onClick={() => setVisible(true)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        header="Confirmation"
        position="top"
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <p className="mb-10">Do you want to delete this banner?</p>
        <div className="flex justify-between">
          <CustomButton
            title="Yes"
            icon="pi pi-check"
            onClick={() => setVisible(false)}
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
