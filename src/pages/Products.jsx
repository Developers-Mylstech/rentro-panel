import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomButton from '../systemdesign/CustomeButton';
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);

  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/products/add');
  };

  const handleEdit = (sku) => {
      console.log(`Edit product with SKU: ${sku}`);
      navigate(`/products/add/`);
  };

  const handleDelete = (sku) => {
      console.log(`Delete product with SKU: ${sku}`);
      alert(`Delete product with SKU: ${sku}`);
      // Here you can implement delete logic
  };

  const products = [
      { image: "http://panelro.xpertspot.com/assets/images/product/1.png", sku: "RR000001", name: "Domestic Water Filter", category: "Domestic", quantity: 100, monthlyPrice: "AED 70.00", yearlyPrice: "AED 900.00" },
      { image: "http://panelro.xpertspot.com/assets/images/product/2.png", sku: "RR000002", name: "Commercial Water Filter - 200 GPD", category: "Commercial", quantity: 8, monthlyPrice: "AED 120.00", yearlyPrice: "AED 2,800.00" },
      { image: "http://panelro.xpertspot.com/assets/images/product/3.png", sku: "RR000003", name: "Industrial Water Filter", category: "Industrial", quantity: 9, monthlyPrice: "AED 70.00", yearlyPrice: "AED 700.00" },
      { image: "http://panelro.xpertspot.com/assets/images/product/1.png", sku: "RR000004", name: "Water Cooler", category: "Water Cooler", quantity: 9, monthlyPrice: "AED 70.00", yearlyPrice: "AED 700.00" },
      { image: "http://panelro.xpertspot.com/assets/images/product/2.png", sku: "RR000005", name: "Water Dispenser", category: "Dispenser", quantity: 10, monthlyPrice: "AED 70.00", yearlyPrice: "AED 700.00" },
      { image: "http://panelro.xpertspot.com/assets/images/product/3.png", sku: "RR000006", name: "3 in 1 - 3 Way Kitchen Sink Faucet - RO Faucet", category: "Domestic", quantity: 100, monthlyPrice: "AED 30.00", yearlyPrice: "AED 280.00" },
  ];
  
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

  const imageBodyTemplate = (rowData) => {
      return <img src={rowData.image} alt={rowData.name} className="w-20 h-20 object-cover" />;
  };

  const actionBodyTemplate = (rowData) => {
      return (
          <div className="flex gap-2">
              <Button icon="pi pi-pencil"  className="p-button-rounded text-blue-600" onClick={() => handleEdit(rowData.sku)} />
              <Button icon="pi pi-trash"  className="p-button-rounded text-red-600" onClick={() => handleDelete(rowData.sku)} />
          </div>
      );
  };

  return (
    <div className="p-4">
   <div className='flex justify-between p-4'>
   <h2 className="heading">Products List</h2>
   <CustomButton title="Add"  onClick={handleNavigate} />
   </div>
    <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 ">
            <span>Entries per page:</span>
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="border p-1 text-black ">
                <option className='hover:bg-secondary' value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <span>Search:</span>
            <InputText  value={search} onChange={(e) => setSearch(e.target.value)} className="border px-2 py-1 text-black" />
        </div>
        
    </div>

    {/* Scrollable Table Wrapper */}
    <div className="overflow-x-auto border rounded-lg shadow-md">
    <DataTable 
        value={filteredProducts} 
        paginator 
        rows={entries} 
        className="w-full overflow-auto"
        scrollable={true}
    >
        {/* Apply custom class to header */}
        <Column field="image" header="Product Image" body={imageBodyTemplate} headerClassName="bg-secondary text-white" bodyClassName={""}></Column>
        <Column field="sku" header="SKU" headerClassName="bg-secondary text-white "></Column>
    <Column field="name" header="Product Name" headerClassName="bg-secondary text-white" ></Column>
        <Column field="category" header="Main Category" headerClassName="bg-secondary text-white"></Column>
        <Column field="quantity" header="Quantity" headerClassName="bg-secondary text-white"></Column>
        <Column field="monthlyPrice" header="Monthly Price" headerClassName="bg-secondary text-white"></Column>
        <Column field="yearlyPrice" header="Yearly Price" headerClassName="bg-secondary text-white"></Column>
        <Column header="Options" body={actionBodyTemplate} headerClassName="bg-secondary text-white"></Column>
    </DataTable>
</div>

</div>

  );
}
