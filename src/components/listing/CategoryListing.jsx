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

export default function CategoryList({ categoryList, removeCategory }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Called after confirmation
  const handleDelete = () => {
    if (categoryToDelete) {
      removeCategory(categoryToDelete);

    

      setVisible(false);
      setCategoryToDelete(null);
    }
  };

  // ✅ Just opens the confirmation dialog
  const showDeleteDialog = (id) => {
    setCategoryToDelete(id);
    setVisible(true);
  };

  const editCategory = (category) => {
    navigate("/categories/add", { state: { category } });
  };

  const imageTemplate = (rowData) => {
    const imageUrl = rowData.images?.[0] || "https://via.placeholder.com/150";
    return (
      <img
        src={imageUrl}
        alt={rowData.name}
        className="w-16 h-16 rounded-lg object-contain flex justify-center"
      />
    );
  };

  const subCategoryTemplate = (rowData) => {
    return rowData.subCategories.length > 0
      ? rowData.subCategories.map((sub) => sub.name || sub).join(", ")
      : "No Subcategories";
  };

  const actionsTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        onClick={() => editCategory(rowData)}
        className="rounded-lg text-white bg-blue-500 p-2"
      />
      <Button
        icon="pi pi-trash"
        onClick={() => showDeleteDialog(rowData.categoryId)}
        className="rounded-lg text-white bg-red-500 p-2"
      />
    </div>
  );

  return (
    <div className="dark:text-gray-200 p-6 w-full h-full">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6 w-full">
        <h5 className="text-2xl mb-4 font-semibold text-gray-700 dark:text-gray-300">
          Category List
        </h5>
        <div className="flex items-center md:flex-row gap-3">
          <IconField iconPosition="right" className="border p-2 rounded bg-white dark:bg-gray-800">
            <InputIcon className="pi pi-search text-gray-500 dark:text-gray-400" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent bg-transparent dark:text-white w-[60%]"
            />
          </IconField>
          <CustomButton
            title={"Category"}
            icon={"pi pi-plus"}
            onClick={() => navigate("/categories/add")}
          />
        </div>
      </div>

      <DataTable
        value={filteredCategories}
        paginator
        rows={5}
        stripedRows
        paginatorClassName="dark:bg-gray-800 dark:text-gray-100"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-md mb-8 hidden lg:block"
      >
        <Column
          field="images"
          header="Category Image"
          body={imageTemplate}
          headerClassName="bg-gray-100 text-gray-500 font-light text-sm border dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="dark:bg-gray-800 dark:text-gray-100 border"
        />
        <Column
          field="name"
          header="Main Category"
          headerClassName="bg-gray-100 text-gray-500 font-light text-sm text-center dark:bg-gray-800 dark:text-gray-100"
          className="font-semibold text-gray-700 dark:bg-gray-800 border-b dark:text-gray-100"
        />
        <Column
          header="Subcategory"
          body={subCategoryTemplate}
          headerClassName="bg-gray-100 text-gray-500 font-light text-sm text-center dark:bg-gray-800 dark:text-gray-100"
          className="font-semibold text-gray-700 dark:bg-gray-800 border-b dark:text-gray-100"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-gray-100 text-gray-500 font-light text-sm border dark:bg-gray-800 dark:text-gray-100"
          className="dark:bg-gray-800 border-b dark:text-gray-100"
        />
      </DataTable>

      {/* Mobile Version */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {filteredCategories.map((category) => (
          <div
            key={category.categoryId}
            className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-full"
          >
            <img
              src={category.images?.[0] || "https://via.placeholder.com/150"}
              alt={category.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.subCategories.length > 0
                  ? category.subCategories.map((sub) => sub.name || sub).join(", ")
                  : "No Subcategories"}
              </p>
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-green-300"
                  onClick={() => editCategory(category)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-red-400"
                  onClick={() => showDeleteDialog(category.categoryId)}
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
        onHide={() => {
          setVisible(false);
          setCategoryToDelete(null);
        }}
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
            onClick={() => {
              setVisible(false);
              setCategoryToDelete(null);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}
