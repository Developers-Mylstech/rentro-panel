    import React from 'react';
    import { DataTable } from 'primereact/datatable';
    import { Column } from 'primereact/column';
    import { Button } from 'primereact/button';
    import { Tag } from 'primereact/tag';

    export default function OrderListing({ orders, search }) {
    const filteredOrders = orders.filter((order) =>
        order.customerName.toLowerCase().includes(search.toLowerCase())
    );

    const statusTemplate = (rowData) => (
        <Tag value={rowData.deliveryStatus} className="bg-secondary text-primary px-2 py-1 rounded-md font-bold" />
    );

    const actionsTemplate = () => (
        <div className="flex gap-2">
        <Button icon="pi pi-eye" className="p-button-text p-button-sm text-purple-500 focus:ring-0 focus:outline-none focus:border-transparent" />
        <Button icon="pi pi-pencil" className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent" />
        </div>
    );

    return (
        <DataTable
        value={filteredOrders}
        paginator
        rows={5}
        stripedRows
        scrollable
        className="border border-gray-300 rounded-md bg"
        >
        <Column field="orderCode" header="Order Code" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="dateTime" header="Date Time" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="customerId" header="Customer Id" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="customerName" header="Customer Name" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="paymentMethod" header="Payment Method" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="deliveryStatus" header="Delivery Status" body={statusTemplate} headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column field="amount" header="Amount" headerClassName="bg-secondary border-r text-white text-center" bodyClassName="text-center" />
        <Column header="Option" body={actionsTemplate} headerClassName="bg-secondary text-white text-center" bodyClassName="text-center" />
        </DataTable>
    );
    }
