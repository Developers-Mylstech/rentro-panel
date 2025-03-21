import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";
import { useNavigate } from "react-router-dom";

export default function CategoryList({ categories }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const filteredCategories = categories.filter((category) =>
    category.mainCategory.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDelete = () => {
    setVisible(false);
    console.log("Category deleted");
  };

  // Table Image Template
  const imageTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.mainCategory}
      className="w-20 h-12 object-contain flex justify-center"
    />
  );

  // Table Actions Template
  const actionsTemplate = () => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
      <Button
        icon="pi pi-trash"
        onClick={() => setVisible(true)}
        className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-700">Category List</h5>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <IconField iconPosition="right" className="border p-2 rounded">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent"
            />
          </IconField>
          <CustomButton
            title={"Add category"}
            icon={"pi pi-plus"}
            onClick={() => navigate("/categories/add")}
          />
        </div>
      </div>

      {/* Table Section */}
      <DataTable
        value={filteredCategories}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md mb-8 hidden lg:block"
      >
        <Column
          field="image"
          header="Category Image"
          body={imageTemplate}
          headerClassName="bg-secondary border-r text-white"
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
          headerClassName="bg-secondary text-white"
        />
      </DataTable>

      {/* Card View Section */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.mainCategory}
              className="w-full h-48 "
            />

            {/* Category Details */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {category.mainCategory}
              </h3>
              <p className="text-sm text-gray-500">{category.subCategory}</p>

              {/* Buttons */}
              <div className="flex  justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-secondary"
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
        <p className="mb-10">Do you want to delete this category?</p>
        <div className="flex justify-between">
          <CustomButton
            title={"Yes"}
            icon={"pi pi-check"}
            onClick={handleDelete}
          />
          <CustomButton
            title={"No"}
            icon={"pi pi-times"}
            onClick={() => setVisible(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}
