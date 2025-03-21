import React, { useState } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";
import { useNavigate } from "react-router-dom";

export default function BrandListing({ brands }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setVisible(false);
    // Add delete logic here
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-0">Brand List</h1>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <IconField iconPosition="right" className="w-full sm:w-60 border p-2 rounded">
            <InputIcon className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none w-full"
            />
          </IconField>

          <CustomButton
            title="Add Brand"
            icon="pi pi-plus"
            onClick={() => navigate("/brands/add")}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Table View (Visible on Screens >= 768px) */}
      <div className="hidden md:block">
        <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="p-2 border-r">Brand Image</th>
              <th className="p-2 border-r">Brand Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand) => (
              <tr key={brand.id} className="border-b">
                <td className="p-2 text-center">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-20 h-12 object-contain mx-auto"
                  />
                </td>
                <td className="p-2 text-center font-semibold">{brand.name}</td>
                <td className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-text text-blue-500 hover:text-blue-700"
                    />
                    <Button
                      icon="pi pi-trash"
                      onClick={() => setVisible(true)}
                      className="p-button-text text-red-500 hover:text-red-700"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Visible on Screens < 768px) */}
      <div className="block md:hidden px-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="border border-gray-300 rounded-md shadow-sm p-3 mb-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-20 h-12 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-text text-blue-500 hover:text-blue-700"
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => setVisible(true)}
                    className="p-button-text text-red-500 hover:text-red-700"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        header="Confirmation"
        position="top"
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
        className="max-w-md"
      >
        <p className="mb-6 text-center text-gray-700">
          Do you want to delete this field?
        </p>
        <div className="flex justify-between">
          <CustomButton title="Yes" icon="pi pi-check" onClick={handleDelete} />
          <CustomButton title="No" icon="pi pi-times" onClick={() => setVisible(false)} />
        </div>
      </Dialog>
    </div>
  );
}
