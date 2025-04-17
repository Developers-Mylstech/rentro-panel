import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";

import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

export default function RequestQuotationListing() {
  const quotations = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      mobile: '12345678',
      companyName: "TechCorp",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: '12345678',
      location: "California",
      companyName: "InnovateX",
    },
  ];
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const filteredQuotations = quotations.filter((q) =>
    q.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    console.log(`Deleted quotation ID: ${selectedQuotation?.id}`);
    setVisible(false);
  };

  const imageTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.name}
      className="w-10 h-10 rounded-full object-cover mx-auto"
    />
  );

  const actionsTemplate = (rowData) => (
    <div className="flex justify-center">
     <StatusSplitButton/>
    </div>
  );

  return (
    <div>
      <h5 className="heading w-full dark:text-gray-100  mb-3">Request Quotation List</h5>

      <DataTable
        value={filteredQuotations}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md mb-8  dark:bg-gray-800 dark:text-gray-100"
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
          field="mobile"
          header="mobile"
          headerClassName="bg-secondary border text-white"
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
          header="Status"
          body={actionsTemplate}
          headerClassName="bg-secondary border text-white text-center"
        />
      </DataTable>

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


const StatusSplitButton = () => {
  const toast = useRef(null);

  const handleStatusChange = (status) => {
    toast.current.show({
      severity: 'info',
      summary: 'Status Updated',
      detail: `Changed to: ${status}`,
      life: 3000,
    });
  };

  const items = [
    {
      label: 'Sent Quotation',
      icon: 'pi pi-send text-sm', // Smaller icon
      command: () => handleStatusChange('Sent Quotation'),
      className: 'text-sm', // Smaller text
    },
    {
      label: 'Negotiation',
      icon: 'pi pi-comments text-sm',
      command: () => handleStatusChange('Negotiation'),
      className: 'text-sm',
    },
    {
      label: 'Waiting for Approval',
      icon: 'pi pi-clock text-sm',
      command: () => handleStatusChange('Waiting for Approval'),
      className: 'text-sm',
    },
    {
      label: 'Close Won',
      icon: 'pi pi-check-circle text-sm',
      command: () => handleStatusChange('Close Won'),
      className: 'text-sm text-green-500',
    },
    {
      label: 'Close Lost',
      icon: 'pi pi-times-circle text-sm',
      command: () => handleStatusChange('Close Lost'),
      className: 'text-sm text-red-500',
    },
  ];

  const save = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Saved',
      detail: 'Default action executed',
    });
  };

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <SplitButton
        label="Update Status"
        icon="pi pi-circle-fill text-[10px] text-green-500" // Smaller icon
        onClick={save}
        model={items}
        className="p-button-outlined p-button-sm text-sm text-green-500" // Compact button
      />
    </div>
  );
};