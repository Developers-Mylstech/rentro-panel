import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import CustomButton from '../../systemdesign/CustomeButton';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [fields, setFields] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedStockStatus, setSelectedStockStatus] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const mainCategories = [
    { label: "Domestic", value: "Domestic" },
    { label: "Commercial", value: "Commercial" },
    { label: "Industrial", value: "Industrial" },
    { label: "Water Cooler", value: "Water Cooler" },
    { label: "Chillers", value: "Chillers" },
    { label: "Appliances", value: "Appliances" },
    { label: "Accessories", value: "Accessories" },
    { label: "Water Tanker", value: "Water Tanker" },
  ];
  const subCatogery = [
    { label: "Filter", value: "Filter" },
    { label: "Cooler", value: "Cooler" },
    { label: "Dispenser", value: "Dispenser" },
    { label: "Chillers", value: "Chillers" },
    { label: "Appliances", value: "Appliances" },
    { label: "Accessories", value: "Accessories" },
    { label: "Sweet Water/ Salt Water/Sewage", value: "Sweet Water/ Salt Water/Sewage" },
    
  ];
  const brands = [
    { label: "Rent RO ", value: "Filter" },
    { label: "Kentt RO", value: "Cooler" },
    { label: "Aquagaurd", value: "Aquagaurd" },
    { label: "Aqua Pro", value: "Aqua Pro" },
    { label: "Waterlogin", value: "Waterlogin" },
    { label: "Culligen", value: "Culligen" },
   
    
  ];

  const fieldOptions = [
    { key: "title", label: "Title" },
    { key: "brand", label: "Brand" },
    { key: "description", label: "Description" },
  ];

  const toggleField = (fieldKey) => {
    setFields((prev) =>
      prev.includes(fieldKey) ? prev.filter((f) => f !== fieldKey) : [...prev, fieldKey]
    );
  };

  const stockStatusOptions = [
    { label: "In Stock", value: "In Stock" },
    { label: "Out of Stock", value: "Out of Stock" },
  ];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <h2 className="heading my-10">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 px-8 w-full mx-auto border rounded-md">
        <h3 className='subheading my-6'>Product Information</h3>
        <div className="mb-3 flex justify-between items-center">
          <label className="text">Product Name</label>
          <input {...register("productName", { required: true })} placeholder='Product Name' className="w-[70%] p-2 border rounded" />
          {errors.productName && <span className="text-red-500">Product Name is required</span>}
        </div>

        <div className="mb-3 flex justify-between items-center">
          <label className="text">Main Category</label>
          <Dropdown filter value={selectedMainCategory} onChange={(e) => setSelectedMainCategory(e.value)} 
            options={mainCategories} placeholder="Select Main Category" className="w-[70%] border" />
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label className="text">Sub Category</label>
          <Dropdown filter value={selectedBrand} onChange={(e) => setSelectedBrand(e.value)} 
            options={brands} placeholder="Select Sub Category" className="w-[70%] border" />
        </div>
        <div className="mb-3 flex justify-between items-center">
          <label className="text">Brands</label>
          <Dropdown filter value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.value)} 
            options={subCatogery} placeholder="Select Brand" className="w-[70%] border" />
        </div>

        <h3 className='subheading my-6'>Description</h3>
      {/* Long Description */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Long Description</label>
        <textarea
          {...register("longDescription")}
          className="w-[70%] p-2 border rounded"
        ></textarea>
      </div>

      {/* Short Description */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Short Description</label>
        <input
          {...register("shortDescription")}
          className="w-[70%] p-2 border rounded"
        />
      </div>


      <div>
      {/* Tabs Section */}
      <div className="mb-3 flex justify-between items-center">
        <h3 className="subheading my-6">Specifications</h3>
        <div className="w-[70%] gap-4 flex">
          {fieldOptions.map((option) => (
            <h3
              key={option.key}
              onClick={() => toggleField(option.key)}
              className={`subheading my-6 border px-3 py-1 rounded cursor-pointer ${
                fields.includes(option.key) ? "bg-secondary text-white" : ""
              }`}
            >
              {option.label}
            </h3>
          ))}
        </div>
      </div>

      {/* Manufacturer Field */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Manufacturer</label>
        <input {...register("manufacturer")} className="w-[70%] p-2 border rounded" />
      </div>

      {/* Dynamic Fields Based on User Selection */}
      {fields.includes("title") && (
        <div className="mb-3 flex justify-between items-center">
          <label className="text mb-1">Title</label>
          <input {...register("title")} className="w-[70%] p-2 border rounded" />
        </div>
      )}

      {fields.includes("brand") && (
        <div className="mb-3 flex justify-between items-center">
          <label className="text mb-1">Brand</label>
          <input {...register("brand")} className="w-[70%] p-2 border rounded" />
        </div>
      )}

      {fields.includes("description") && (
        <div className="mb-3 flex justify-between items-center">
          <label className="text mb-1">Description</label>
          <textarea {...register("description")} className="w-[70%] p-2 border rounded" />
        </div>
      )}
    </div>

      <h3 className="subheading my-6 mt-4">Product Images</h3>

      {/* Image Uploads */}
      {[1, 2, 3, 4].map((num) => (
        <div className="mb-3 flex justify-between items-center" key={num}>
          <label className="text mb-1">Image {num}</label>
          <input
            type="file"
            {...register(`image${num}`)}
            className="w-[70%] p-2 border rounded"
          />
        </div>
      ))}

      <h3 className="subheading my-6 mt-4">Inventory</h3>

      {/* SKU */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">SKU</label>
        <input {...register("sku")} className="w-[70%] p-2 border rounded" />
      </div>

      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Quantity</label>
        <input
          type="number"
          {...register("quantity")}
          className="w-[70%] p-2 border rounded"
        />
      </div>

      <div className="mb-3 flex justify-between items-center">
          <label className="text">Stock Status</label>
          <Dropdown  value={selectedStockStatus} onChange={(e) => setSelectedStockStatus(e.value)} 
            options={stockStatusOptions} placeholder="Select Stock Status" className="w-[70%] border" />
        </div>

      <h3 className="subheading my-6 mt-4">Prices</h3>

      {[
        "Regular Rent Price",
        "Offer Rent Price",
        "Regular Buy Price",
        "Offer Buy Price",
        "Installation Price"
      ].map((label, index) => (
        <div className="mb-3 flex justify-between items-center" key={index}>
          <label className="text mb-1">{label}</label>
          <input
            type="number"
            {...register(label.replace(/\s+/g, "").toLowerCase())}
            className="w-[70%] p-2 border rounded"
          />
        </div>
      ))}

<h3 className="mt-4 subheading my-6">MMC Service</h3>
        <div className="mb-3 flex justify-between items-center">
          <label className="text">MMC Price (Per Month)</label>
          <input type="number" {...register("mmcPrice")} className="w-[70%] p-2 border rounded" />
        </div>
        {[1,2,3,4].map(num => (
          <div key={num} className="mb-3 flex justify-between items-center">
            <label className="text">MMC Benefit {num}</label>
            <input {...register(`mmcBenefit${num}`)} className="w-[70%] p-2 border rounded" />
          </div>
        ))}

        <h3 className="mt-4 subheading my-6">AMC Service</h3>
        <div className="mb-3 flex justify-between items-center">
          <label className="text">AMC Price (Per Year)</label>
          <input type="number" {...register("amcPrice")} className="w-[70%] p-2 border rounded" />
        </div>
        {[1,2,3,4].map(num => (
          <div key={num} className="mb-3 flex justify-between items-center">
            <label className="text">AMC Benefit {num}</label>
            <input {...register(`amcBenefit${num}`)} className="w-[70%] p-2 border rounded" />
          </div>
        ))}


     
        
        <div className='w-full flex justify-center items-center'>
        <CustomButton  title="Submit" onClick={handleSubmit} icon={'pi pi-save'}/>
        </div>
      </form>
    </>
  );
}




// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// export default function AddProduct() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubOpen, setSubIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
//   const [selectedSubCategory, setSelectedSubCategory] = useState(""); // State to store selected category
//   // State to store selected category

//   const mainCategories = [
//     "Domestic",
//     "Commercial",
//     "Industrial",
//     "Water Cooler",
//     "Chillers",
//     "Appliances",
//     "Accessories",
//     "Dispenser",
//     "Water Tanker",

//   ];
  // const subCatogery =[
  //   "Filter",
  //   "Cooler",
  //   "Dispenser",
  //   "Chillers",
  //   "Appliances",
  //   "Accessories",
  //   "Sweet Water/ Salt Water/Sewage"

  // ]

//   const filteredCategories = mainCategories.filter((category) =>
//     category.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const filteredSubCategories = subCatogery.filter((category) =>
//     category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (category) => {
//     setSelectedCategory(category); // Update selected category state
//     setValue("mainCategory", category);
//     setIsOpen(false);
//     setSearchTerm(""); // Reset search when an option is selected
//   };
//   const handleSubSelect = (category) => {
//     setSelectedSubCategory(category); // Update selected category state
//     setValue("subCatogery", category);
//     setSubIsOpen(false);
//     setSearchTerm(""); // Reset search when an option is selected
//   };

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="p-4 px-8 w-full mx-auto border rounded-md"
//     >
//       <h2 className="heading my-10">Add New Product</h2>
//       <h3 className="subheading  my-6">Product Information</h3>

//       {/* Product Name */}
//       <div className="mb-3 flex justify-between items-center">
//         <label className="text mb-1">Product Name</label>
//         <input
//           {...register("productName", { required: true })}
//           placeholder="Product Name"
//           className="w-[70%] p-2 border rounded"
//         />
//         {errors.productName && (
//           <span className="text-red-500">Product Name is required</span>
//         )}
//       </div>

//       {/* Main Category - Searchable Dropdown */}
//       <div className=" mb-3 flex justify-between items-center relative">
//         <label className="text mb-1">Main Category</label>

//         <div
//           className="w-[70%] p-2 border rounded bg-white cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {selectedCategory || "Select Category"}
//         </div>

//         {isOpen && (
//           <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
//             {/* Search Bar */}
//             <input
//               type="text"
//               className="w-full p-2 border-b"
//               placeholder="Search category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               autoFocus
//             />

//             {/* Category Options */}
//             <div className="max-h-40 overflow-y-auto">
//               {filteredCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
//                   onClick={() => handleSelect(category)}
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <input
//           type="hidden"
//           {...register("mainCategory", { required: true })}
//         />
//         {errors.mainCategory && (
//           <span className="text-red-500">Category is required</span>
//         )}
//       </div>
//       <div className=" mb-3 flex justify-between items-center relative">
//         <label className="text mb-1">Sub Category</label>

//         <div
//           className="w-[70%] p-2 border rounded bg-white cursor-pointer"
//           onClick={() => setSubIsOpen(!isSubOpen)}
//         >
//           {selectedSubCategory || "Select Category"}
//         </div>

//         {isSubOpen && (
//           <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
//             {/* Search Bar */}
//             <input
//               type="text"
//               className="w-full p-2 border-b"
//               placeholder="Search category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               autoFocus
//             />

//             {/* Category Options */}
//             <div className="max-h-40 overflow-y-auto">
//               {filteredSubCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
//                   onClick={() => handleSubSelect(category)}
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <input
//           type="hidden"
//           {...register("subCatogery", { required: true })}
//         />
//         {errors.mainCategory && (
//           <span className="text-red-500">Category is required</span>
//         )}
//       </div>

     

//       {/* Brand */}
//       <div className="mb-3 flex justify-between items-center">
//         <label className="text mb-1">Brand</label>
//         <input {...register("brand")} className="w-[70%] p-2 border rounded" />
//       </div>

      // {/* Long Description */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Long Description</label>
      //   <textarea
      //     {...register("longDescription")}
      //     className="w-[70%] p-2 border rounded"
      //   ></textarea>
      // </div>

      // {/* Short Description */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Short Description</label>
      //   <input
      //     {...register("shortDescription")}
      //     className="w-[70%] p-2 border rounded"
      //   />
      // </div>

      // {/* Specifications */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Specifications</label>
      //   <input
      //     {...register("specifications")}
      //     className="w-[70%] p-2 border rounded"
      //   />
      // </div>

      // {/* Manufacturer */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Manufacturer</label>
      //   <input
      //     {...register("manufacturer")}
      //     className="w-[70%] p-2 border rounded"
      //   />
      // </div>

      // <h3 className="subheading my-6 mt-4">Product Images</h3>

      // {/* Image Uploads */}
      // {[1, 2, 3, 4].map((num) => (
      //   <div className="mb-3 flex justify-between items-center" key={num}>
      //     <label className="text mb-1">Image {num}</label>
      //     <input
      //       type="file"
      //       {...register(`image${num}`)}
      //       className="w-[70%] p-2 border rounded"
      //     />
      //   </div>
      // ))}

      // <h3 className="subheading my-6 mt-4">Inventory</h3>

      // {/* SKU */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">SKU</label>
      //   <input {...register("sku")} className="w-[70%] p-2 border rounded" />
      // </div>

      // {/* Quantity */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Quantity</label>
      //   <input
      //     type="number"
      //     {...register("quantity")}
      //     className="w-[70%] p-2 border rounded"
      //   />
      // </div>

      // {/* Stock Status */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Stock Status</label>
      //   <select {...register("stockStatus")} className="w-[70%] p-2 border rounded">
      //     <option value="In Stock">In Stock</option>
      //     <option value="Out of Stock">Out of Stock</option>
      //   </select>
      // </div>

      // <h3 className="subheading my-6 mt-4">Prices</h3>

      // {/* Pricing Fields */}
      // {[
      //   "Regular Rent Price",
      //   "Offer Rent Price",
      //   "Regular Buy Price",
      //   "Offer Buy Price",
      // ].map((label, index) => (
      //   <div className="mb-3 flex justify-between items-center" key={index}>
      //     <label className="text mb-1">{label}</label>
      //     <input
      //       type="number"
      //       {...register(label.replace(/\s+/g, "").toLowerCase())}
      //       className="w-[70%] p-2 border rounded"
      //     />
      //   </div>
      // ))}

      // {/* Submit Button */}
      // <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      //   Submit
      // </button>
//     </form>
//   );
// }

