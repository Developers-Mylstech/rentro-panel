import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

import OrdersTable from '../components/listing/OrderListing'; // Import OrdersTable

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [orders] = useState([
    { id: 1, orderCode: 5, dateTime: '2024-08-05 08:37:53', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 2, orderCode: 4, dateTime: '2024-04-13 14:59:06', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 3, orderCode: 3, dateTime: '2024-04-09 10:26:47', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 4, orderCode: 2, dateTime: '2024-04-08 21:51:52', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 'AED 62.50' },
    { id: 5, orderCode: 1, dateTime: '2024-04-08 10:09:14', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Bank Transfer', deliveryStatus: 'Complete', amount: 'AED 62.50' },
  ]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h5 className="heading w-full">Orders List</h5>
        <div className="flex items-center w-full md:justify-end mt-2">
          <IconField iconPosition="right" className='border p-2 rounded'>
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-inputtext-sm focus:ring-0  focus:outline-none focus:border-transparent"
            />
          </IconField>
        </div>
      </div>

      <OrdersTable orders={orders} search={search} />
    </div>
  );
}
