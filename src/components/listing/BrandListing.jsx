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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-0 dark:text-gray-200 text-black">Brand List</h1>
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
          <IconField iconPosition="right" className="w-full sm:w-60 border border-gray-600 bg-gray-800 p-2 rounded">
            <InputIcon className="pi pi-search text-gray-400" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none w-full bg-gray-800 text-white placeholder-gray-400"
            />
          </IconField>

          <CustomButton
            title="Add"
            icon="pi pi-plus"
            onClick={() => navigate("/brands/add")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
      </div>

      <div className="hidden md:block">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <tr>
              <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Image</th>
              <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand) => (
              <tr
                key={brand.id}
                className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
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
                      className="p-button-text text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                    />
                    <Button
                      icon="pi pi-trash"
                      onClick={() => setVisible(true)}
                      className="p-button-text text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



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
