import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";

export default function RequestQuotationListing({ quotations }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  // Filter quotations based on search
  const filteredQuotations = quotations.filter((q) =>
    q.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDelete = () => {
    console.log(`Deleted quotation ID: ${selectedQuotation?.id}`);
    setVisible(false);
  };

  // Image template
  const imageTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.name}
      className="w-10 h-10 rounded-full object-cover mx-auto"
    />
  );

  // Actions template
  const actionsTemplate = (rowData) => (
    <div className="flex justify-center">
      <Button
        icon="pi pi-trash"
        className="p-button-text text-red-500"
        onClick={() => {
          setSelectedQuotation(rowData);
          setVisible(true);
        }}
      />
    </div>
  );

  return (
    <div>
      {/* Desktop Table */}
      <h1>
        
      </h1>
      <DataTable
        value={filteredQuotations}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md mb-8 hidden lg:block dark:bg-gray-800 dark:text-gray-100"
      >
        <Column
          header="Image"
          body={imageTemplate}
          headerClassName="bg-secondary border text-white"
          bodyClassName="text-center"
        />
        <Column
          field="name"
          header="Name"
          headerClassName="bg-secondary border text-white "
        />
        <Column
          field="email"
          header="Email"
          headerClassName="bg-secondary border text-white"
        />
        <Column
          field="location"
          header="Location"
          headerClassName="bg-secondary border text-white text-center"
        />
        <Column
          field="companyName"
          header="Company Name"
          headerClassName="bg-secondary border text-white text-center"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary border text-white text-center"
        />
      </DataTable>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {filteredQuotations.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-4 dark:bg-gray-800 dark:text-gray-100">
              <div className="flex justify-center mb-4">
                <img
                  src={q.image}
                  alt={q.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center">{q.name}</h3>
              <p className="text-sm text-center text-gray-500">
                <strong>Email:</strong> {q.email}
              </p>
              <p className="text-sm text-center text-gray-500">
                <strong>Location:</strong> {q.location}
              </p>
              <p className="text-sm text-center text-gray-500">
                <strong>Company:</strong> {q.companyName}
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white bg-red-400"
                  onClick={() => {
                    setSelectedQuotation(q);
                    setVisible(true);
                  }}
                />
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
      >
        <p className="mb-10">
          Do you want to delete this quotation with ID{" "}
          <strong>{selectedQuotation?.id}</strong>?
        </p>
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
