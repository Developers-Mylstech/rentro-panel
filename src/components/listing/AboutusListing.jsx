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
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-700">About Us List</h5>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="border px-2 py-1 text-black"
          />
          <CustomButton
            title="Add New"
            icon="pi pi-plus"
            onClick={() => navigate("/about/add")}
          />
        </div>
      </div>

      {/* Table Section (For larger screens) */}
      <div className="hidden lg:block overflow-x-auto border rounded-lg shadow-md">
        <DataTable
          value={filteredData}
          paginator
          rows={10}
          stripedRows
          className="w-full overflow-auto"
          scrollable
        >
          <Column
            field="image"
            header="About Us Image"
            body={imageTemplate}
            headerClassName="bg-secondary text-white border-r"
          />
          <Column
            field="title"
            header="Title"
            headerClassName="bg-secondary text-white border-r"
            className="font-semibold text-gray-700"
          />
          <Column
            field="subtitle"
            header="Subtitle"
            headerClassName="bg-secondary text-white border-r"
            className="font-semibold text-gray-700"
          />
          <Column
            header="Options"
            body={actionTemplate}
            headerClassName="bg-secondary text-white"
          />
        </DataTable>
      </div>

      {/* Card View Section (For mobile screens) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Card Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>

              {/* Card Actions */}
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-blue-500"
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-red-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
