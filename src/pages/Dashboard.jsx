import React from 'react';
import { Card } from 'primereact/card';

export default function Dashboard() {
  const items = [
    { name: 'Leads', value: 0, icon: 'pi pi-database', color: 'border-red-500', bgColor: 'bg-red-100 dark:bg-dark' },
    { name: 'Order Pending', value: 0, icon: 'pi pi-inbox', color: 'border-blue-400', bgColor: 'bg-blue-100 dark:bg-dark' },
    { name: 'Order Processing', value: 0, icon: 'pi pi-box', color: 'border-blue-400', bgColor: 'bg-blue-100 dark:bg-dark' },
    { name: 'Order Complete', value: 5, icon: 'pi pi-box', color: 'border-blue-400', bgColor: 'bg-blue-100 dark:bg-dark' },
    { name: 'Total Products', value: 6, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100 dark:bg-dark' },
    { name: 'In Stock Product', value: 6, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100 dark:bg-dark' },
    { name: 'Out of Stock', value: 0, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100 dark:bg-dark' },
    { name: 'On BackOrder', value: 0, icon: 'pi pi-box', color: 'border-purple-400', bgColor: 'bg-purple-100 dark:bg-dark' },
    { name: 'Main Categories', value: 9, icon: 'pi pi-sitemap', color: 'border-green-400', bgColor: 'bg-green-100 dark:bg-dark' },
    { name: 'Sub Categories', value: 7, icon: 'pi pi-sitemap', color: 'border-green-400', bgColor: 'bg-green-100 dark:bg-dark' },
    { name: 'Brands', value: 7, icon: 'pi pi-tag', color: 'border-red-500', bgColor: 'bg-red-100 dark:bg-dark' },
    { name: 'Clients', value: 13, icon: 'pi pi-users', color: 'border-purple-400', bgColor: 'bg-purple-100 dark:bg-dark' },
    { name: 'Service Pending', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100 dark:bg-dark' },
    { name: 'Service Schedule', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100 dark:bg-dark' },
    { name: 'Service Confirmed', value: 0, icon: 'pi pi-cog', color: 'border-red-500', bgColor: 'bg-red-100 dark:bg-dark' },
    { name: 'Complains Pending', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100 dark:bg-dark' },
    { name: 'Complains Schedule', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100 dark:bg-dark' },
    { name: 'Complains Confirmed', value: 0, icon: 'pi pi-exclamation-circle', color: 'border-yellow-400', bgColor: 'bg-yellow-100 dark:bg-dark' }
  ];

  return (
    <div className="flex flex-wrap justify-center bg-white dark:bg-dark text-black dark:text-dark">
      {items.map((item, index) => (
        <div key={index} className="md:w-[32%] lg:w-[24%] w-full m-1">
          <Card className={`shadow-md rounded-lg border-b-4 ${item.color} dark:border-dark`}>
            <div className="flex justify-between items-center p-4">
              <div className='flex flex-col gap-2'>
                <h5 className="subheading font-semibold text-black dark:text-dark">{item.name}</h5>
                <p className="text-xl font-bold text-gray-900 dark:text-dark">{item.value}</p>
              </div>
              <div className={`w-12 h-12 flex justify-center items-center rounded-full ${item.bgColor}`}>
                <i className={`${item.icon} text-xl text-gray-600 dark:text-white`}></i>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
