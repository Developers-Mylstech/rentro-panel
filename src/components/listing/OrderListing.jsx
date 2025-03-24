import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";
import { useNavigate } from "react-router-dom";

export default function OrderListing({ orders }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // Filter Orders Based on Search
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete
  const handleDelete = () => {
    console.log(`Order with ID ${selectedOrder?.id} deleted`);
    setVisible(false);
  };

  // Status Template for Table
  const statusTemplate = (rowData) => (
    <Tag
      value={rowData.deliveryStatus}
      className="bg-secondary text-primary px-2 py-1 rounded-md font-bold"
    />
  );

  // Actions Template for Table
  const actionsTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-text p-button-sm text-purple-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
      <Button
        icon="pi pi-trash"
        onClick={() => {
          setSelectedOrder(rowData);
          setVisible(true);
        }}
        className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent"
      />
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      

      {/* Table Section */}
      <DataTable
        value={filteredOrders}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 rounded-md mb-8 hidden lg:block dark:bg-gray-800 dark:text-gray-100"
        paginatorClassName="dark:bg-gray-800 dark:text-gray-100"
        footerClassName="dark:bg-gray-800 dark:text-gray-100"
      >
        <Column
          field="orderCode"
          header="Order Code"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="dateTime"
          header="Date Time"
          headerClassName="bg-secondary border  text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="customerId"
          header="Customer Id"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="customerName"
          header="Customer Name"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="paymentMethod"
          header="Payment Method"
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="deliveryStatus"
          header="Delivery Status"
          body={statusTemplate}
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="amount"
          header="Amount"
          body={(rowData) =>
            rowData.amount
              ? `₹${Number(rowData.amount).toFixed(2)}`
              : "N/A"
          }
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-secondary border text-white text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
      </DataTable>

      {/* Card View Section */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6  ">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-4 dark:bg-gray-800 dark:text-gray-100">
              <h3 className="text-lg font-bold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                {order.customerName}
              </h3>
              <p className="text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-100">
                <span className="font-semibold">Order Code:</span>{" "}
                {order.orderCode}
              </p>
              <p className="text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-100">
                <span className="font-semibold">Date Time:</span>{" "}
                {order.dateTime}
              </p>
              <p className="text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-100">
                <span className="font-semibold">Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-100">
                <span className="font-semibold">Amount:</span>{" "}
                ₹
                {Number(order.amount)
                  ? Number(order.amount).toFixed(2)
                  : "N/A"}
              </p>
              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-eye"
                  className="p-button-sm text-white p-2 w-full bg-secondary "
                />
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white p-2 w-full bg-green-300 "
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white p-2 w-full bg-red-300 "
                  onClick={() => {
                    setSelectedOrder(order);
                    setVisible(true);
                  }}
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
        <p className="mb-10">
          Do you want to delete this order with ID{" "}
          <strong>{selectedOrder?.id}</strong>?
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
