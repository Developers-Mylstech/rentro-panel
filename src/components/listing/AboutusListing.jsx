import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../systemdesign/CustomeButton";

export default function AboutUsListing() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const aboutUsData = [
    {
      id: 1,
      image: "http://panelro.xpertspot.com/assets/images/product/1.png",
      title: "WHO WE ARE",
      subtitle: "GET TO KNOW RENT RO",
    },
    {
      id: 2,
      image: "http://panelro.xpertspot.com/assets/images/product/2.png",
      title: "OUR VISION",
      subtitle: "TO BE THE LEADING RENTAL PLATFORM",
    },
  ];

  // Filter data based on search
  const filteredData = aboutUsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Table Image Template
  const imageTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.title}
      className="w-20 h-20 object-cover"
    />
  );

  // Table Actions Template
  const actionTemplate = () => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text text-blue-500"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text text-red-500"
      />
    </div>
  );

  return (
    <div className="dark-bg-gray-900 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Title */}
        <h5 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          About Us List
        </h5>

        {/* Search & Add Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="border px-3 py-2 text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-md focus:ring focus:ring-primary w-[70%]"
          />

          {/* Add New Button */}
          <CustomButton
            title="Add"
            icon="pi pi-plus"
            onClick={() => navigate("/about/add")}
            className="bg-green-300  text-white px-4 py-2 rounded-md transition-all duration-300 shadow-md"
          />
        </div>
      </div>


      <div className="hidden lg:block overflow-x-auto border rounded-lg shadow-md dark:border-gray-700">
        <DataTable
          value={filteredData}
          paginator
          rows={10}
          paginatorClassName="dark:bg-gray-800"
          stripedRows
          scrollable
          className="w-full overflow-auto bg-white dark:bg-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
        >
          <Column
            field="image"
            header="About Us Image"
            body={imageTemplate}
            headerClassName="bg-secondary dark:bg-gray-800 text-white border-r border-gray-300 dark:border-gray-700 text-center"
            bodyClassName="bg-gray-100 dark:bg-gray-800 border dark:text-gray-400 border-gray-300 dark:border-gray-700 text-center"
          />
          <Column
            field="title"
            header="Title"
            headerClassName="bg-secondary dark:bg-gray-800 text-white border-r border-gray-300 dark:border-gray-700 text-center"
            bodyClassName="bg-gray-100 dark:bg-gray-800 border dark:text-gray-400 border-gray-300 dark:border-gray-700 text-center font-semibold"
          />
          <Column
            field="subtitle"
            header="Subtitle"
            headerClassName="bg-secondary dark:bg-gray-800 text-white border-r border-gray-300 dark:border-gray-700 text-center"
            bodyClassName="bg-gray-100 dark:bg-gray-800 border dark:text-gray-400 border-gray-300 dark:border-gray-700 text-center font-semibold"
          />
          <Column
            header="Options"
            body={actionTemplate}
            headerClassName="bg-secondary dark:bg-gray-800 text-white border-gray-300 dark:border-gray-700 text-center"
            bodyClassName="bg-gray-100 dark:bg-gray-800 border dark:text-gray-400 border-gray-300 dark:border-gray-700 text-center"
          />
        </DataTable>
      </div>


      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            {/* Card Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>

              {/* Card Actions */}
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-green-300 "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-red-400 "
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
