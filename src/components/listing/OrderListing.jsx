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
  const statusTemplate = (rowData) => {
    const status = rowData.deliveryStatus;
    let className = "text-white px-2 py-1  rounded-md font-bold";
  
    if (status === "In Progress") {
      className += " bg-orange-500";
    } else {
      className += " bg-green-500";
    }
  
    return <Tag  value={rowData.deliveryStatus} className={className} />;
  };

  // Actions Template for Table
  const actionsTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="text-white p-2 rounded-lg bg-purple-500 "
      />
      <Button
        icon="pi pi-pencil"
        className="text-white p-2 rounded-lg bg-blue-500 "
      />
      <Button
        icon="pi pi-trash"
        onClick={() => {
          setSelectedOrder(rowData);
          setVisible(true);
        }}
        className="text-white p-2 rounded-lg bg-red-500 "
      />
    </div>
  );

  return (
    <div className="">
      {/* Header Section */}
      

      {/* Table Section */}
      <DataTable
        value={filteredOrders}
        paginator
        rows={5}
        stripedRows
        className="border border-gray-300 dark:border-gray-700 rounded-md mb-8 hidden lg:block dark:bg-gray-800 dark:text-gray-100"
        paginatorClassName="dark:bg-gray-800 dark:text-gray-100"
        footerClassName="dark:bg-gray-800 dark:text-gray-100"
      >
        <Column
          field="orderCode"
          header="Order Id"
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:border-gray-700  font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="dateTime"
          header="Date Time"
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center  dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="customerId"
          header="Customer Id"
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center  dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="customerName"
          header="Customer Name"
          headerClassName="bg-gray-100 dark:border-gray-700  text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center  dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="paymentMethod"
          header="Payment Method"
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="deliveryStatus"
          header="Delivery Status"
          body={statusTemplate}
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center  dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          field="amount"
          header="Amount"
          body={(rowData) =>
            rowData.amount
              ? `AED ${Number(rowData.amount).toFixed(2)}`
              : "N/A"
          }
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
          footerClassName="dark:bg-gray-800 dark:text-gray-100"
        />
        <Column
          header="Option"
          body={actionsTemplate}
          headerClassName="bg-gray-100 dark:border-gray-700 text-gray-500 font-light text-sm border text-center dark:bg-gray-800 dark:text-gray-100"
          bodyClassName="text-center dark:border-gray-700 font-semibold text-sm border-b dark:bg-gray-800 dark:text-gray-100"
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
