import React, { useEffect, useRef, useState } from "react";
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
import { useRequestQuotationStore } from "../../Context/RequestQoutation";

export default function RequestQuotationListing() {
  const { quotations, loading, fetchQuotations } = useRequestQuotationStore();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const res = fetchQuotations();
  }, []);
  console.log(quotations,'ask dks')

  const handleDelete = () => {
    console.log(`Deleted quotation ID: ${selectedQuotation?.requestQuotationId}`);
    setVisible(false);
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Quotation deleted successfully',
      life: 3000
    });
  };

  const imageTemplate = (rowData) => {
    // Handle cases where there are no images
    if (!rowData.productImages || rowData.productImages.length === 0) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
          <span className="text-xs text-gray-500">No Image</span>
        </div>
      );
    }
    
    // In a real app, you would map through productImages and display them properly
    return (
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
        <span className="text-xs text-blue-600">{rowData.productImages.length}</span>
      </div>
    );
  };

  const actionsTemplate = (rowData) => (
    <div className="flex justify-center">
      <StatusSplitButton rowData={rowData} />
    </div>
  );

 

  const filteredQuotations = quotations?.filter(quotation => {
    const searchTerm = search.toLowerCase();
    return (
      (quotation.name?.toLowerCase().includes(searchTerm)) ||
      (quotation.mobile?.includes(searchTerm)) ||
      (quotation.companyName?.toLowerCase().includes(searchTerm)) ||
      (quotation.location?.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="">
      <Toast ref={toast} position="top-right" />
      
      <h5 className="heading w-full dark:text-gray-100 mb-3">Request Quotation List</h5>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search quotations..."
          className="p-2 border rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats Cards - Updated with real data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Total Requests</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-purple-100 text-purple-700 rounded-md">
              All
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-purple-700 dark:text-white">{quotations.length}</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Requests</p>
            </div>
          </div>
        </div>

        {/* Add other stat cards with real data as needed */}
      </div>

      {/* DataTable */}
      <div className="overflow-x-auto">
        <DataTable
          value={filteredQuotations}
          paginator
          rows={10}
          loading={loading}
          stripedRows
          className="border min-w-[1000px] border-gray-300 rounded-md mb-8 dark:bg-gray-800 dark:text-gray-100"
          scrollable
          scrollHeight="flex"
          emptyMessage="No quotations found"
          onRowClick={(e) => setSelectedQuotation(e.data)}
          selectionMode="single"
        >
          <Column
            header="ID"
            field="requestQuotationId"
            headerClassName="bg-secondary border text-white"
          />
          <Column
            header="Image"
            body={imageTemplate}
            headerClassName="bg-secondary border text-white"
            bodyClassName="text-center"
          />
          <Column
            field="name"
            header="Name"
            headerClassName="bg-secondary border text-white"
            body={(rowData) => rowData.name || 'N/A'}
          />
          <Column
            field="mobile"
            header="Mobile"
            headerClassName="bg-secondary border text-white"
            body={(rowData) => rowData.mobile || 'N/A'}
          />
          <Column
            field="companyName"
            header="Company"
            headerClassName="bg-secondary border text-white"
            body={(rowData) => rowData.companyName || 'N/A'}
          />
          <Column
            field="location"
            header="Location"
            headerClassName="bg-secondary border text-white"
            body={(rowData) => rowData.location || 'N/A'}
          />
          <Column
            header="Actions"
            body={actionsTemplate}
            headerClassName="bg-secondary border text-white text-center"
          />
        </DataTable>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        header="Confirmation"
        position="top"
        draggable={false}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <p className="mb-10">
          Do you want to delete this quotation with ID{" "}
          <strong>{selectedQuotation?.requestQuotationId}</strong>?
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

const StatusSplitButton = ({ rowData }) => {
  const toast = useRef(null);

  const handleStatusChange = (status) => {
    toast.current.show({
      severity: 'info',
      summary: 'Status Updated',
      detail: `Changed quotation ${rowData.requestQuotationId} to: ${status}`,
      life: 3000,
    });
  };

  const items = [
    {
      label: 'Sent Quotation',
      icon: 'pi pi-send text-sm text-blue-400',
      command: () => handleStatusChange('Sent Quotation'),
    },
    {
      label: 'Negotiation',
      icon: 'pi pi-comments text-sm text-purple-400',
      command: () => handleStatusChange('Negotiation'),
    },
    {
      label: 'Waiting for Approval',
      icon: 'pi pi-clock text-sm text-yellow-400',
      command: () => handleStatusChange('Waiting for Approval'),
    },
    {
      label: 'Close Won',
      icon: 'pi pi-check-circle text-sm text-green-400',
      command: () => handleStatusChange('Close Won'),
    },
    {
      label: 'Close Lost',
      icon: 'pi pi-times-circle text-sm text-red-400',
      command: () => handleStatusChange('Close Lost'),
    },
  ];

  const save = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Saved',
      detail: `Default action for quotation ${rowData.requestQuotationId}`,
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