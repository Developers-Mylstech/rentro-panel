import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";
import { FaClipboardCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { IoMdMailUnread } from "react-icons/io";

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
      <StatusSplitButton />
    </div>
  );

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Total Requests</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-purple-100 text-purple-700 rounded-md">
              Today
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-purple-700 dark:text-white">150</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Requests</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Close Won</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-green-100 text-green-700 rounded-md">
              Weekly
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-green-600">45</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Deals</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Close Lost</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-red-100 text-red-700 rounded-md">
              Monthly
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-red-600">22</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Deals</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Waiting for Approval</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-yellow-100 text-yellow-700 rounded-md">
              Pending
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-yellow-600">18</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Requests</p>
            </div>
          </div>
        </div>
      </div>

      <h5 className="heading w-full dark:text-gray-100 mb-3">Request Quotation List</h5>

      <div className="overflow-x-auto">
        <DataTable
          value={filteredQuotations}
          paginator
          rows={5}
          stripedRows
          className="border min-w-[1000px] border-gray-300 rounded-md mb-8 dark:bg-gray-800 dark:text-gray-100"
          scrollable
          scrollHeight="flex"
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
      </div>

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
      icon: 'pi pi-send text-sm',
      command: () => handleStatusChange('Sent Quotation'),
      className: 'text-sm',
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
        icon="pi pi-circle-fill text-[10px] text-green-500"
        onClick={save}
        model={items}
        className="p-button-outlined p-button-sm text-sm text-green-500"
      />
    </div>
  );
};