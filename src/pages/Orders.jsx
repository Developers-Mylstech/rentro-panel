import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

import OrdersTable from '../components/listing/OrderListing'; // Import OrdersTable
import RequestQuotationListing from '../components/listing/RequestQuotationListing';

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [orders] = useState([
    { id: 1, orderCode: "#OD1234", dateTime: '2024-08-05 08:37:53', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'In Progress', amount: 62.50},
    { id: 2, orderCode: "#OD6783", dateTime: '2024-04-13 14:59:06', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'In Progress', amount: 62.50},
    { id: 3, orderCode: "#OD7665", dateTime: '2024-04-09 10:26:47', customerId: 3, customerName: 'Sabeel Ahmed', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 62.50},
    { id: 4, orderCode: "#OD9388", dateTime: '2024-04-08 21:51:52', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Cash on delivery', deliveryStatus: 'Complete', amount: 62.50 },
    { id: 5, orderCode: "#OD0948", dateTime: '2024-04-08 10:09:14', customerId: 1, customerName: 'Shahzad Saleem', paymentMethod: 'Bank Transfer', deliveryStatus: 'Complete', amount: 62.50},
  ]);

  const quotations = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      companyName: "TechCorp",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Jane Smith",
      email: "jane@example.com",
      location: "California",
      companyName: "InnovateX",
    },
  ];
  

  return (
    <div className='md:h-screen dark:bg-gray-900'>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-4 px-6 md:px-2  dark:text-gray-100 ">
        <h5 className="heading w-full dark:text-gray-100 ">Orders List</h5>
        <div className="flex items-center w-full  md:justify-end mt-2 ">
          <IconField iconPosition="right" className='border rounded'>
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className=" focus:ring-0  focus:outline-none focus:border-transparent dark:bg-gray-800 p-2"
              
            />
          </IconField>
        </div>
      </div>

      <OrdersTable orders={orders} search={search} />
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-4 px-6 md:px-2  dark:text-gray-100 ">
        <h5 className="heading w-full dark:text-gray-100 ">Request Quotation List</h5>
        <div className="flex items-center w-full  md:justify-end mt-2 ">
          <IconField iconPosition="right" className='border rounded'>
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className=" focus:ring-0  focus:outline-none focus:border-transparent dark:bg-gray-800 p-2"
              
            />
          </IconField>
        </div>
      </div>
      <RequestQuotationListing quotations={quotations} search={search} />
    </div>
  );
}
