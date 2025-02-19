import React from 'react';
import { Card } from 'primereact/card';

export default function Dashboard() {
  const items = [
    { name: 'Leads', value: 0, icon: 'pi pi-database', color: 'border-red-500', bgColor: 'bg-red-100' },
    { name: 'Order Pending', value: 0, icon: 'pi pi-inbox', color: 'border-blue-400', bgColor: 'bg-blue-100' },
    { name: 'Order Processing', value: 0, icon: 'pi pi-box', color: 'border-blue-400', bgColor: 'bg-blue-100' },
    { name: 'Order Complete', value: 5, icon: 'pi pi-box', color: 'border-blue-400', bgColor: 'bg-blue-100' },
    { name: 'Total Products', value: 6, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100' },
    { name: 'In Stock Product', value: 6, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100' },
    { name: 'Out of Stock', value: 0, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100' },
    { name: 'On BackOrder', value: 0, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100' },
    { name: 'Main Categories', value: 9, icon: 'pi pi-sitemap', color: 'border-green-400', bgColor: 'bg-green-100' },
    { name: 'Sub Categories', value: 7, icon: 'pi pi-sitemap', color: 'border-green-400', bgColor: 'bg-green-100' },
    { name: 'Brands', value: 7, icon: 'pi pi-tag', color: 'border-red-500', bgColor: 'bg-red-100' },
    { name: 'Clients', value: 13, icon: 'pi pi-users', color: 'border-purple-400', bgColor: 'bg-purple-100' },
    { name: 'Service Pending', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100' },
    { name: 'Service Schedule', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100' },
    { name: 'Service Confirmed', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100' },
    { name: 'Complains Pending', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100' },
    { name: 'Complains Schedule', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100' },
    { name: 'Complains Confirmed', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100' }
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {items.map((item, index) => (
        <div key={index} className="md:w-[24%] sm:w-[45%] w-full m-1">
          <Card className={`shadow-md rounded-lg border-b-4 ${item.color}`}>
            <div className="flex justify-between items-center p-4">
              <div className='flex flex-col gap-2'>
                <h5 className="subheading font-semibold">{item.name}</h5>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
              </div>
              <div className={`w-12 h-12 flex justify-center items-center rounded-full ${item.bgColor}`}>
                <i className={`${item.icon} text-xl text-gray-600`}></i>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
