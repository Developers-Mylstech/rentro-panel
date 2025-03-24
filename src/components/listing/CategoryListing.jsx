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
    <div className=" dark:text-gray-200 p-6 w-full ">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col justify-between items-center mb-6 w-full">
        <h5 className="text-2xl mb-4 font-semibold text-gray-700 dark:text-gray-300">
          Category List
        </h5>
        <div className="flex items-center md:flex-row  gap-3">
          {/* Search Bar */}
          <IconField iconPosition="right" className="border p-2 rounded bg-white dark:bg-gray-800">
            <InputIcon className="pi pi-search text-gray-500 dark:text-gray-400"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent bg-transparent dark:text-white w-[60%] "
            />
          </IconField>
          <CustomButton
            title={"Category"}
           
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
        paginatorClassName="dark:bg-gray-800 dark:text-gray-100"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-md mb-8 hidden lg:block"
      >
        <Column
          field="image"
          header="Category Image"
          body={imageTemplate}
          headerClassName="bg-secondary border text-white dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="dark:bg-gray-800 dark:text-gray-100 "
        />
        <Column
          field="mainCategory"
          header="Main Category"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          className="font-semibold text-gray-700  dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="subCategory"
          header="Subcategory"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          className="font-semibold text-gray-700  dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary text-white dark:bg-gray-800 dark:text-gray-100 border"
          className="dark:bg-gray-800 dark:text-gray-100"
        />
      </DataTable>
  
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
  {filteredCategories.map((category) => (
    <div
      key={category.id}
      className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-full"
    >
      <img
        src={category.image}
        alt={category.mainCategory}
        className="w-full h-36 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {category.mainCategory}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {category.subCategory}
        </p>

        <div className="flex justify-center mt-4 gap-3">
          <Button
            icon="pi pi-pencil"
            className="p-button-sm text-white p-2 w-full bg-secondary "
          />
          <Button
            icon="pi pi-trash"
            className="p-button-sm text-white p-2 w-full bg-secondary "
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
    </div>
  ))}
</div>

  
      <Dialog
        header="Confirmation"
        position="top"
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <p className="mb-10 text-gray-700 dark:text-gray-300">
          Do you want to delete this category?
        </p>
        <div className="flex justify-center gap-4">
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
