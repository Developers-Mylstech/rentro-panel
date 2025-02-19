import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import CustomButton from '../systemdesign/CustomeButton';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const [orders] = useState([
    { id: 1, orderCode: 5, dateTime: '2024-08-05 08:37:53', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 2, orderCode: 4, dateTime: '2024-04-13 14:59:06', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 3, orderCode: 3, dateTime: '2024-04-09 10:26:47', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 4, orderCode: 2, dateTime: '2024-04-08 21:51:52', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 5, orderCode: 1, dateTime: '2024-04-08 10:09:14', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Bank Transfer', deliveryStatus: 'Complete', amount: 'AED 62.50' },
  ]);

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const statusTemplate = (rowData) => (
    <Tag value={rowData.deliveryStatus} className="bg-secondary text-primary px-2 py-1 rounded-md font-bold" />
  );

  const actionsTemplate = () => (
    <div className="flex gap-2 ">
      <Button icon="pi pi-eye" className="p-button-text p-button-sm text-purple-500 focus:ring-0 focus:outline-none focus:border-transparent" />
      <Button icon="pi pi-pencil" className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent" />
    </div>
  );

  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold">Orders List</h5>
        <div className="flex items-center gap-3">
          <IconField iconPosition="right" className='border p-2 rounded'>
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent"
            />
          </IconField>
          {/* <CustomButton title="Add Order" icon="pi pi-plus" onClick={() => navigate('add')} /> */}
        </div>
      </div>

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

      <Dialog header="Confirmation" position='top' draggable={false} visible={visible} className='' onHide={() => { if (!visible) return; setVisible(false); }}>
        <p className="mb-10">
           Do you want to delete this field?
        </p>
        <div className='flex justify-between'>
          <CustomButton title={'Yes'} icon={'pi pi-check'}/>
          <CustomButton title={'No'} icon={'pi pi-times'}/>
        </div>
      </Dialog>
    </div>
  );
}
