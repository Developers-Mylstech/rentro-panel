// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { useNavigate } from 'react-router-dom';
// import CustomButton from '../../systemdesign/CustomeButton';

// export default function ProductListing({ products, handleEdit, handleDelete }) {
//   const [search, setSearch] = useState('');
//   const [visible, setVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const navigate = useNavigate();

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Handle Delete Confirmation
//   const confirmDelete = (product) => {
//     setSelectedProduct(product);
//     setVisible(true);
//   };

//   const handleConfirmDelete = () => {
//     handleDelete(selectedProduct.sku);
//     setVisible(false);
//   };

//   // Table Image Template
//   const imageBodyTemplate = (rowData) => (
//     <img
//       src={rowData.image}
//       alt={rowData.name}
//       className="w-20 h-20 object-cover rounded"
//     />
//   );

//   // Table Action Template
//   const actionBodyTemplate = (rowData) => (
//     <div className="flex gap-2">
//       <Button
//         icon="pi pi-pencil"
//         className="p-button-rounded text-blue-600"
//         onClick={() => handleEdit(rowData.sku)}
//       />
//       <Button
//         icon="pi pi-trash"
//         className="p-button-rounded text-red-600"
//         onClick={() => confirmDelete(rowData)}
//       />
//     </div>
//   );

//   return (
//     <div>
//       {/* Header Section */}
//       <div className="flex justify-between mb-4">
//         <div className="flex items-center w-full justify-between">
//           <h2 className="text-xl font-semibold text-gray-700">Products List</h2>
//           <div className="flex gap-3">
//             {/* Search Bar */}
//             <InputText
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               className="border px-3 py-2 rounded-md focus:outline-none"
//             />
//             <CustomButton
//               title="Add"
//               onClick={() => navigate('/products/add')}
//               icon={'pi pi-plus'}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="hidden lg:block overflow-x-auto border rounded-lg shadow-md">
//         <DataTable
//           value={filteredProducts}
//           paginator
//           rows={10}
//           stripedRows
//           className="w-full"
//         >
//           <Column
//             field="image"
//             header="Product Image"
//             body={imageBodyTemplate}
//             headerClassName="bg-secondary text-white border-r"
//           />
//           <Column field="sku" header="SKU" headerClassName="bg-secondary text-white border-r" />
//           <Column field="name" header="Product Name" headerClassName="bg-secondary text-white border-r" />
//           <Column field="category" header="Main Category" headerClassName="bg-secondary text-white border-r" />
//           <Column field="quantity" header="Quantity" headerClassName="bg-secondary text-white border-r" />
//           <Column field="monthlyPrice" header="Monthly Price" headerClassName="bg-secondary text-white border-r" />
//           <Column field="yearlyPrice" header="Yearly Price" headerClassName="bg-secondary text-white border-r" />
//           <Column
//             header="Options"
//             body={actionBodyTemplate}
//             headerClassName="bg-secondary text-white"
//           />
//         </DataTable>
//       </div>

//       {/* Card View Section */}
//       <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 px-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.sku}
//             className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
//           >
//             {/* Product Image */}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover"
//             />

//             {/* Product Details */}
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {product.name}
//               </h3>
//               <p className="text-gray-500 text-sm">
//                 Category: {product.category}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Quantity: {product.quantity}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Monthly Price: ${product.monthlyPrice}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Yearly Price: ${product.yearlyPrice}
//               </p>

//               {/* Edit & Delete Buttons */}
//               <div className="flex justify-center mt-4 gap-3">
//                 <Button
//                   icon="pi pi-pencil"
//                   className="p-button-sm text-white w-full bg-secondary p-2"
//                   onClick={() => handleEdit(product.sku)}
//                 />
//                 <Button
//                   icon="pi pi-trash"
//                   className="p-button-sm text-white w-full bg-secondary p-2"
//                   onClick={() => confirmDelete(product)}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         header="Confirmation"
//         visible={visible}
//         draggable={false}
//         position="top"
//         onHide={() => setVisible(false)}
//       >
//         <p className="mb-6">Do you want to delete this product?</p>
//         <div className="flex justify-between">
//           <CustomButton
//             title="Yes"
//             icon="pi pi-check"
//             onClick={handleConfirmDelete}
//           />
//           <CustomButton
//             title="No"
//             icon="pi pi-times"
//             onClick={() => setVisible(false)}
//           />
//         </div>
//       </Dialog>
//     </div>
//   );
// }import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../systemdesign/CustomeButton';
import { useState } from 'react';

export default function ProductListing({ products, handleEdit, handleDelete }) {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Delete Confirmation
  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedProduct.sku);
    setVisible(false);
  };

  // Table Image Template
  const imageBodyTemplate = (rowData) => (
    <img
      src={rowData.image}
      alt={rowData.name}
      className="w-16 h-16 object-cover rounded"
    />
  );

  // Table Action Template
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className=" rounded-lg text-white bg-blue-500 p-2 "
        onClick={() => handleEdit(rowData.sku)}
      />
      <Button
        icon="pi pi-trash"
        className=" rounded-lg text-white bg-red-500 p-2 "
        onClick={() => confirmDelete(rowData)}
      />
    </div>
  );

  const quantityBodyTemplate = (rowData) => {
    return (
     <div className={`${rowData.quantity<10?"bg-orange-400 ":"bg-green-500"}  text-white font-bold py-1 w-12 flex justify-center items-center rounded`}>
       <span className={`${rowData.quantity<10?"":""}  `} >
        {rowData.quantity}
      </span>
     </div>
    );
  };
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-2">
      {/* Header Section */}
      <div className="flex  justify-between mb-4">
        <div className="flex items-center md:flex-row flex-col w-full justify-between">
          <h2 className="text-xl mb-4 font-semibold text-gray-700 dark:text-gray-100">
            Products List
          </h2>
          <div className="flex gap-3 md:flex-row ">
            {/* Search Bar */}
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border px-2 py-2 rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 w-[70%]"
            />
            <CustomButton
              title="Add"
              onClick={() => navigate('/products/add')}
              icon={'pi pi-plus'}
              className="dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="hidden lg:block overflow-x-auto border rounded shadow-md dark:border-gray-700">
        <DataTable
          value={filteredProducts}
          paginator
          rows={10}
          stripedRows={true}
          className="w-full dark:bg-gray-800 dark:text-gray-100"
          paginatorClassName='dark:bg-gray-800 dark:text-gray-100 border'
        
        >
          <Column
            field="image"
            header="Product_Image"
            body={imageBodyTemplate}
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm border  dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 border '

            
          />
          <Column
            field="sku"
            header="SKU"
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm  border dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b font-semibold'
          />
          <Column
            field="name"
            header="Product_Name"
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm  border dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b font-semibold'
          />
          <Column
            field="category"
            header="Main_Category"
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm border dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b font-semibold'
          />
          <Column
            field="quantity"
            header="Quantity"
            body={quantityBodyTemplate}
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm  border dark:bg-gray-800 dark:text-gray-100 "
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b   font-semibold  '
            
          />
          <Column
            field="monthlyPrice"
            header="Monthly_Price"
            // body={monthlyPriceBodyTemplate}
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm  border dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b font-semibold'
          />
          <Column
            field="yearlyPrice"
            header="Yearly_Price"
            // body={yearlyPriceBodyTemplate}
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm  border dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800 dark:text-gray-100 text-sm border-b font-semibold'
          />
          <Column
            header="Options"
            body={actionBodyTemplate}
            headerClassName="bg-gray-100 text-gray-500 font-light text-sm border  dark:bg-gray-800 dark:text-gray-100"
            className='dark:bg-gray-800  dark:text-gray-100 border-b border-r text-sm'
          />
        </DataTable>
      </div>

      {/* Card View Section */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {filteredProducts.map((product) => (
          <div
            key={product.sku}
            className="bg-white shadow-md rounded-lg  overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg 
                       dark:bg-gray-800 dark:text-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Category: {product.category}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Quantity: {product.quantity}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Monthly Price: ${product.monthlyPrice}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Yearly Price: ${product.yearlyPrice}
              </p>

              <div className="flex justify-center mt-4 gap-3">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-sm text-white bg-green-300 p-2"
                  onClick={() => handleEdit(product.sku)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-sm text-white bg-red-400"
                  onClick={() => confirmDelete(product)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        header="Confirmation"
        visible={visible}
        draggable={false}
        position="top"
        onHide={() => setVisible(false)}
        className="dark:bg-gray-900 dark:text-gray-100"
      >
        <p className="mb-6">Do you want to delete this product?</p>
        <div className="flex justify-between">
          <CustomButton
            title="Yes"
            icon="pi pi-check"
            onClick={handleConfirmDelete}
            className="dark:bg-green-500 dark:hover:bg-green-600"
          />
          <CustomButton
            title="No"
            icon="pi pi-times"
            onClick={() => setVisible(false)}
            className="dark:bg-red-500 dark:hover:bg-red-600"
          />
        </div>
      </Dialog>
    </div>
  );
}
