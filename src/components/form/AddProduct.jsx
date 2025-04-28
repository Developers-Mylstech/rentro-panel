// // import React, { useState } from 'react';
// // import { useForm, useFieldArray } from 'react-hook-form';
// // import { FiPlus, FiTrash2 } from 'react-icons/fi';
// // import { Toast } from 'primereact/toast';
// // import useNewProductStore from '../../Context/NewProductContext';

// // const AddProduct = () => {
// //   const toast = React.useRef(null);
// //   const { addProduct, loading } = useNewProductStore();
  
// //   const { register, control, handleSubmit, formState: { errors } } = useForm({
// //     defaultValues: {
// //       productName: '',
// //       description: '',
// //       longDescription: '',
// //       manufacturer: '',
// //       supplierName: '',
// //       supplierCode: '',
// //       modelNo: '',
// //       brandId: '',
// //       categoryId: '',
// //       subCategoryId: '',
// //       imageUrls: [],
// //       productFor: [
// //         {
// //           type: 'SELL', // or 'RENT' or 'REQUEST'
// //           actualPrice: 0,
// //           discountPrice: 0,
// //           benefits: [''],
// //           isWarranty: false,
// //           warrantyPeriod: 0,
// //           isActive: true
// //         }
// //       ],
// //       specifications: [{ name: '', value: '' }],
// //       inventory: {
// //         quantity: 0,
// //         sku: '',
// //         stockStatus: 'IN_STOCK'
// //       }
// //     }
// //   });

// //   const { fields: productForFields, append: appendProductFor, remove: removeProductFor } 
// //     = useFieldArray({ control, name: 'productFor' });

// //   const { fields: specFields, append: appendSpec, remove: removeSpec } 
// //     = useFieldArray({ control, name: 'specifications' });

// //   const onSubmit = async (data) => {
// //     try {
// //       await addProduct(data);
// //       toast.current.show({
// //         severity: 'success',
// //         summary: 'Success',
// //         detail: 'Product added successfully',
// //         life: 3000
// //       });
// //     } catch (error) {
// //       toast.current.show({
// //         severity: 'error',
// //         summary: 'Error',
// //         detail: error.message,
// //         life: 3000
// //       });
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto p-6">
// //       <Toast ref={toast} />
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
// //         {/* Basic Information */}
// //         <div className="bg-white rounded-lg shadow p-6">
// //           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Product Name</label>
// //               <input
// //                 {...register('productName', { required: 'Product name is required' })}
// //                 className="w-full p-2 border rounded"
// //               />
// //               {errors.productName && (
// //                 <span className="text-red-500 text-sm">{errors.productName.message}</span>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Description</label>
// //               <textarea
// //                 {...register('description')}
// //                 className="w-full p-2 border rounded"
// //                 rows="3"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Product For Section */}
// //         <div className="bg-white rounded-lg shadow p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h2 className="text-xl font-semibold">Product For</h2>
// //             <button
// //               type="button"
// //               onClick={() => appendProductFor({
// //                 type: 'SELL',
// //                 actualPrice: 0,
// //                 discountPrice: 0,
// //                 benefits: [''],
// //                 isWarranty: false,
// //                 warrantyPeriod: 0,
// //                 isActive: true
// //               })}
// //               className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //             >
// //               <FiPlus /> Add Product For
// //             </button>
// //           </div>

// //           {productForFields.map((field, index) => (
// //             <div key={field.id} className="border rounded-lg p-4 mb-4">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="text-lg font-medium">Product For #{index + 1}</h3>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeProductFor(index)}
// //                   className="text-red-500 hover:text-red-700"
// //                 >
// //                   <FiTrash2 size={20} />
// //                 </button>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">Type</label>
// //                   <select
// //                     {...register(`productFor.${index}.type`)}
// //                     className="w-full p-2 border rounded"
// //                   >
// //                     <option value="SELL">Sell</option>
// //                     <option value="RENT">Rent</option>
// //                     <option value="REQUEST">Request</option>
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">Actual Price</label>
// //                   <input
// //                     type="number"
// //                     {...register(`productFor.${index}.actualPrice`)}
// //                     className="w-full p-2 border rounded"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">Discount Price</label>
// //                   <input
// //                     type="number"
// //                     {...register(`productFor.${index}.discountPrice`)}
// //                     className="w-full p-2 border rounded"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">
// //                     <input
// //                       type="checkbox"
// //                       {...register(`productFor.${index}.isWarranty`)}
// //                       className="mr-2"
// //                     />
// //                     Warranty
// //                   </label>
// //                   {field.isWarranty && (
// //                     <input
// //                       type="number"
// //                       {...register(`productFor.${index}.warrantyPeriod`)}
// //                       placeholder="Warranty Period (months)"
// //                       className="w-full p-2 border rounded mt-2"
// //                     />
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Submit Button */}
// //         <div className="flex justify-end">
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`px-6 py-2 rounded-lg text-white ${
// //               loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
// //             }`}
// //           >
// //             {loading ? 'Adding Product...' : 'Add Product'}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddProduct



// import React, { useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { FiPlus, FiTrash2 } from 'react-icons/fi';
// import { Toast } from 'primereact/toast';
// import useNewProductStore from '../../Context/NewProductContext';

// const AddProduct = () => {
//   const toast = React.useRef(null);
//   const { addProduct, loading } = useNewProductStore();

//   const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
//     defaultValues: {
//       productName: '',
//       description: '',
//       longDescription: '',
//       manufacturer: '',
//       supplierName: '',
//       supplierCode: '',
//       modelNo: '',
//       brandId: '',
//       categoryId: '',
//       subCategoryId: '',
//       imageUrls: [],
//       productFor: [
//         {
//           type: 'SELL',
//           actualPrice: 0,
//           discountPrice: 0,
//           benefits: [''],
//           isWarranty: false,
//           warrantyPeriod: 0,
//           isActive: true
//         }
//       ],
//       specifications: " ",
//       inventory: { 
//         quantity: 0,
//         sku: '',
//         stockStatus: 'IN_STOCK'
//       }
//     }
//   });

//   const { fields: productForFields, append: appendProductFor, remove: removeProductFor }
//     = useFieldArray({ control, name: 'productFor' });

//   const { fields: specFields, append: appendSpec, remove: removeSpec }
//     = useFieldArray({ control, name: 'specifications' });

//   const onSubmit = async (data) => {
//     try {
//       await addProduct(data);
//       toast.current.show({
//         severity: 'success',
//         summary: 'Success',
//         detail: 'Product added successfully',
//         life: 3000
//       });
//     } catch (error) {
//       toast.current.show({
//         severity: 'error',
//         summary: 'Error',
//         detail: error.message,
//         life: 3000
//       });
//     }
//   };

//   const isWarrantyChecked = watch('productFor');

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <Toast ref={toast} />
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Product Name *</label>
//               <input
//                 {...register('productName', { required: 'Product name is required' })}
//                 className="w-full p-2 border rounded"
//               />
//               {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Short Description</label>
//               <textarea
//                 {...register('description')}
//                 className="w-full p-2 border rounded"
//                 rows="2"
//               />
//             </div>

//             {/* Long Description */}
//             <div className="col-span-1 md:col-span-2">
//               <label className="block text-sm font-medium mb-1">Long Description</label>
//               <textarea
//                 {...register('longDescription')}
//                 className="w-full p-2 border rounded"
//                 rows="4"
//               />
//             </div>

//             {/* Manufacturer */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Manufacturer</label>
//               <input
//                 {...register('manufacturer')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Supplier Name */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Supplier Name</label>
//               <input
//                 {...register('supplierName')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Supplier Code */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Supplier Code</label>
//               <input
//                 {...register('supplierCode')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Model No */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Model No</label>
//               <input
//                 {...register('modelNo')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Brand ID */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Brand</label>
//               <input
//                 {...register('brandId')}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter Brand ID"
//               />
//             </div>

//             {/* Category ID */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Category</label>
//               <input
//                 {...register('categoryId')}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter Category ID"
//               />
//             </div>

//             {/* SubCategory ID */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Subcategory</label>
//               <input
//                 {...register('subCategoryId')}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter Subcategory ID"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Inventory */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Inventory</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Quantity</label>
//               <input
//                 type="number"
//                 {...register('inventory.quantity')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">SKU</label>
//               <input
//                 {...register('inventory.sku')}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Stock Status</label>
//               <select
//                 {...register('inventory.stockStatus')}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="IN_STOCK">In Stock</option>
//                 <option value="OUT_OF_STOCK">Out of Stock</option>
//                 <option value="BACKORDER">Backorder</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Product For Section */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Product For</h2>
//             <button
//               type="button"
//               onClick={() => appendProductFor({
//                 type: 'SELL',
//                 actualPrice: 0,
//                 discountPrice: 0,
//                 benefits: [''],
//                 isWarranty: false,
//                 warrantyPeriod: 0,
//                 isActive: true
//               })}
//               className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               <FiPlus /> Add Product For
//             </button>
//           </div>

//           {productForFields.map((field, index) => (
//             <div key={field.id} className="border rounded-lg p-4 mb-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium">Product For #{index + 1}</h3>
//                 <button
//                   type="button"
//                   onClick={() => removeProductFor(index)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Type</label>
//                   <select
//                     {...register(`productFor.${index}.type`)}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="SELL">Sell</option>
//                     <option value="RENT">Rent</option>
//                     <option value="REQUEST">Request</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Actual Price</label>
//                   <input
//                     type="number"
//                     {...register(`productFor.${index}.actualPrice`)}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Discount Price</label>
//                   <input
//                     type="number"
//                     {...register(`productFor.${index}.discountPrice`)}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="flex items-center text-sm font-medium mb-1">
//                     <input
//                       type="checkbox"
//                       {...register(`productFor.${index}.isWarranty`)}
//                       className="mr-2"
//                     />
//                     Warranty
//                   </label>
//                   {isWarrantyChecked?.[index]?.isWarranty && (
//                     <input
//                       type="number"
//                       {...register(`productFor.${index}.warrantyPeriod`)}
//                       className="w-full p-2 border rounded mt-2"
//                       placeholder="Warranty Period (months)"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-2 rounded-lg text-white ${
//               loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
//             }`}
//           >
//             {loading ? 'Adding Product...' : 'Add Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { Toast } from 'primereact/toast';
import useNewProductStore from '../../Context/NewProductContext';

const AddProduct = () => {
  const toast = useRef(null);
  const { addProduct, loading } = useNewProductStore();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      productName: '',
      description: '',
      longDescription: '',
      manufacturer: '',
      supplierName: '',
      supplierCode: '',
      modelNo: '',
      brandId: '',
      categoryId: '',
      subCategoryId: '',
      imageUrls: [],
      productFor: [
        {
          type: 'SELL',
          actualPrice: 0,
          discountPrice: 0,
          benefits: [''],
          isWarranty: false,
          warrantyPeriod: 0,
          isActive: true
        }
      ],
      specifications: [{ name: '', value: '' }],
      inventory: {
        quantity: 0,
        sku: '',
        stockStatus: 'IN_STOCK'
      }
    }
  });

  const { fields: productForFields, append: appendProductFor, remove: removeProductFor } =
    useFieldArray({ control, name: 'productFor' });

  const { fields: specFields, append: appendSpec, remove: removeSpec } =
    useFieldArray({ control, name: 'specifications' });

  const onSubmit = async (data) => {
    try {
      const payload = {
        productid: '', // If required, generate or remove if API auto-assigns
        productname: data.productName,
        description: data.description,
        longdescription: data.longDescription,
        specification: JSON.stringify(data.specifications), // if backend expects string
        manufacturer: data.manufacturer,
        supplierName: data.supplierName,
        supplierCode: data.supplierCode,
        modelNo: data.modelNo,
        brandId: data.brandId,
        categoryid: data.categoryId,
        subcategoryid: data.subCategoryId,
        qty: Number(data.inventory.quantity),
        sku: data.inventory.sku,
        stockStatus: data.inventory.stockStatus,
        imageUrls: data.imageUrls?.map((img) => ({
          productid: '', // fill if needed
          imageUrl: img
        })) || [],
        productfor: data.productFor.map((item) => ({
          productid: '', // fill if needed
          productfor_type: item.type,
          price: Number(item.actualPrice),
          discountprice: Number(item.discountPrice),
          benefits: item.benefits?.toString() || '',
          iswarranty: item.isWarranty ? 1 : 0,
          warrantperiod: Number(item.warrantyPeriod),
          isActive: item.isActive ? 1 : 0
        })),
        keyfeatures: [] // you can also add dynamic features later
      };

      await addProduct(payload);

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Product added successfully',
        life: 3000
      });
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 3000
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                {...register('productName', { required: 'Product name is required' })}
                className="w-full p-2 border rounded"
              />
              {errors.productName && (
                <span className="text-red-500 text-sm">{errors.productName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register('description')}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Long Description</label>
              <textarea
                {...register('longDescription')}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Manufacturer</label>
              <input
                {...register('manufacturer')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Supplier Name</label>
              <input
                {...register('supplierName')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Supplier Code</label>
              <input
                {...register('supplierCode')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Model No</label>
              <input
                {...register('modelNo')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand ID</label>
              <input
                {...register('brandId')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category ID</label>
              <input
                {...register('categoryId')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sub Category ID</label>
              <input
                {...register('subCategoryId')}
                className="w-full p-2 border rounded"
              />
            </div>

          </div>
        </div>

        {/* Product For Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product For</h2>
            <button
              type="button"
              onClick={() => appendProductFor({
                type: 'SELL',
                actualPrice: 0,
                discountPrice: 0,
                benefits: [''],
                isWarranty: false,
                warrantyPeriod: 0,
                isActive: true
              })}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FiPlus /> Add Product For
            </button>
          </div>

          

          {productForFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Product For #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProductFor(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    {...register(`productFor.${index}.type`)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="SELL">Sell</option>
                    <option value="RENT">Rent</option>
                    <option value="REQUEST">Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Actual Price</label>
                  <input
                    type="number"
                    {...register(`productFor.${index}.actualPrice`)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Price</label>
                  <input
                    type="number"
                    {...register(`productFor.${index}.discountPrice`)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Warranty</label>
                  <input
                    type="checkbox"
                    {...register(`productFor.${index}.isWarranty`)}
                    className="mr-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Warranty Period (months)</label>
                  <input
                    type="number"
                    {...register(`productFor.${index}.warrantyPeriod`)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;
