// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FileUpload } from "primereact/fileupload";
// import CustomButton from "../../systemdesign/CustomeButton";

// export default function AddProduct() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [fields, setFields] = useState([]);
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
//   const subCatogery =[
//     "Filter",
//     "Cooler",
//     "Dispenser",
//     "Chillers",
//     "Appliances",
//     "Accessories",
//     "Sweet Water/ Salt Water/Sewage"

//   ]

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
//   const fieldOptions = [
//     { key: "title", label: "Title" },
//     { key: "brand", label: "Brand" },
//     { key: "description", label: "Description" },
//   ];
//   const toggleField = (fieldKey) => {
//     setFields((prev) =>
//       prev.includes(fieldKey) ? prev.filter((f) => f !== fieldKey) : [...prev, fieldKey]
//     );
//   };

//   const [images, setImages] = useState([]);

//   // Load images from local storage on component mount
//   useEffect(() => {
//     const storedImages = JSON.parse(localStorage.getItem("productImages")) || [];
//     setImages(storedImages);
//   }, []);

//   // Save images to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("productImages", JSON.stringify(images));
//   }, [images]);

//   const onUpload = (event) => {
//     const uploadedFiles = event.files;
//     const newImages = [...images];

//     // Check each file for format and quantity
//     uploadedFiles.forEach((file) => {
//       const fileType = file.type;
//       const isValidFormat =
//         fileType === "image/jpeg" || fileType === "image/png";

//       if (!isValidFormat) {
//         alert("Only PNG and JPG images are allowed.");
//         return;
//       }

//       if (newImages.length < 10) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           newImages.push(e.target.result);
//           setImages(newImages);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert("You can only upload up to 10 images.");
//       }
//     });
//   };

//   const onRemoveImage = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
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

//       {/* Long Description */}
//       <div className="mb-3 flex justify-between items-center">
//         <label className="text mb-1">Long Description</label>
//         <textarea
//           {...register("longDescription")}
//           className="w-[70%] p-2 border rounded"
//         ></textarea>
//       </div>

//       {/* Short Description */}
//       <div className="mb-3 flex justify-between items-center">
//         <label className="text mb-1">Short Description</label>
//         <input
//           {...register("shortDescription")}
//           className="w-[70%] p-2 border rounded"
//         />
//       </div>

//       <div className="mb-3 flex justify-between items-center">
//         <h3 className="subheading my-6">Specifications</h3>
//         <div className="w-[70%] gap-4 flex">
//           {fieldOptions.map((option) => (
//             <h3
//               key={option.key}
//               onClick={() => toggleField(option.key)}
//               className={`subheading my-6 border px-3 py-1 rounded cursor-pointer ${
//                 fields.includes(option.key) ? "bg-secondary text-white" : ""
//               }`}
//             >
//               {option.label}
//             </h3>
//           ))}
//         </div>
//       </div>

//       {/* Manufacturer Field */}
//       <div className="mb-3 flex justify-between items-center">
//         <label className="text mb-1">Manufacturer</label>
//         <input {...register("manufacturer")} className="w-[70%] p-2 border rounded" />
//       </div>

//       {/* Dynamic Fields Based on User Selection */}
//       {fields.includes("title") && (
//         <div className="mb-3 flex justify-between items-center">
//           <label className="text mb-1">Title</label>
//           <input {...register("title")} className="w-[70%] p-2 border rounded" />
//         </div>
//       )}
//       {fields.includes("brand") && (
//         <div className="mb-3 flex justify-between items-center">
//           <label className="text mb-1">Brand</label>
//           <input {...register("brand")} className="w-[70%] p-2 border rounded" />
//         </div>
//       )}

//       {fields.includes("description") && (
//         <div className="mb-3 flex justify-between items-center">
//           <label className="text mb-1">Description</label>
//           <textarea {...register("description")} className="w-[70%] p-2 border rounded" />
//         </div>
//       )}

//       <h3 className="subheading my-6 mt-4">Product Images</h3>

//       <FileUpload
//         name="demo[]"
//         customUpload
//         uploadHandler={onUpload}
//         accept="image/png,image/jpeg"
//         maxFileSize={1000000}
//         chooseLabel="Choose Images"
//         chooseOptions={{className:"bg-secondary"}}
//         multiple={false} // Disable multiple uploads at once

//       />

//       <div className="mt-4 grid grid-cols-4 gap-4">
//         {images.map((img, index) => (
//           <div key={index} className="relative">
//             <img
//               src={img}
//               alt={`product-${index}`}
//               className="w-full h-32 object-cover rounded"
//             />
//             <button
//               type="button"
//               className="absolute top-1 right-1  text-black  p-1"
//               onClick={() => onRemoveImage(index)}
//             >
//               <i className="pi pi-times"></i>
//             </button>
//           </div>
//         ))}
//       </div>

//   <h3 className="subheading my-6 mt-4">Inventory</h3>

//   {/* SKU */}
//   <div className="mb-3 flex justify-between items-center">
//     <label className="text mb-1">SKU</label>
//     <input {...register("sku")} className="w-[70%] p-2 border rounded" />
//   </div>

//   {/* Quantity */}
//   <div className="mb-3 flex justify-between items-center">
//     <label className="text mb-1">Quantity</label>
//     <input
//       type="number"
//       {...register("quantity")}
//       className="w-[70%] p-2 border rounded"
//     />
//   </div>

//   {/* Stock Status */}
//   <div className="mb-3 flex justify-between items-center">
//     <label className="text mb-1">Stock Status</label>
//     <select {...register("stockStatus")} className="w-[70%] p-2 border rounded">
//       <option value="In Stock">In Stock</option>
//       <option value="Out of Stock">Out of Stock</option>
//     </select>
//   </div>

//   <h3 className="subheading my-6 mt-4">Prices</h3>

//   {/* Pricing Fields */}
//   {[
//     "Regular Rent Price",
//     "Offer Rent Price",
//     "Regular Buy Price",
//     "Offer Buy Price",
//   ].map((label, index) => (
//     <div className="mb-3 flex justify-between items-center" key={index}>
//       <label className="text mb-1">{label}</label>
//       <input
//         type="number"
//         {...register(label.replace(/\s+/g, "").toLowerCase())}
//         className="w-[70%] p-2 border rounded"
//       />
//     </div>
//   ))}

//   {/* Submit Button */}

//  <div className="flex justify-center items-center w-full">
//  <CustomButton title="Submit" onClick={handleSubmit}/>
//  </div>
//     </form>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FileUpload } from "primereact/fileupload";
// import "primereact/resources/primereact.min.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primeicons/primeicons.css";
// import CustomButton from "../../systemdesign/CustomeButton";

// export default function AddProduct() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm();

  // const [searchTerm, setSearchTerm] = useState("");
  // const [fields, setFields] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isSubOpen, setSubIsOpen] = useState(false);
  // const [isBrandOpen, setBrandOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  // const [selectedSubCategory, setSelectedSubCategory] = useState(""); // State to store selected category
  // const [selectedBrand, setSelectedBrand] = useState(""); // State to store selected brand
  // // State to store selected category

  // const mainCategories = [
  //   "Domestic",
  //   "Commercial",
  //   "Industrial",
  //   "Water Cooler",
  //   "Chillers",
  //   "Appliances",
  //   "Accessories",
  //   "Dispenser",
  //   "Water Tanker",
  // ];
  // const subCatogery = [
  //   "Filter",
  //   "Cooler",
  //   "Dispenser",
  //   "Chillers",
  //   "Appliances",
  //   "Accessories",
  //   "Sweet Water/ Salt Water/Sewage",
  // ];
  // const brands = [
  //   "Rent RO ",
  //   "Kentt RO",
  //   "Aquagaurd",
  //   "Aqua Pro",
  //   "Waterlogin",
  //   "Culligen",
  // ];

  // const filteredCategories = mainCategories.filter((category) =>
  //   category.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filteredSubCategories = subCatogery.filter((category) =>
  //   category.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filteredBrand = brands.filter((brand) =>
  //   brand.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleSelect = (category) => {
  //   setSelectedCategory(category); // Update selected category state
  //   setValue("mainCategory", category);
  //   setIsOpen(false);
  //   setSearchTerm(""); // Reset search when an option is selected
  // };
  // const handleSubSelect = (category) => {
  //   setSelectedSubCategory(category); // Update selected category state
  //   setValue("subCatogery", category);
  //   setSubIsOpen(false);
  //   setSearchTerm(""); // Reset search when an option is selected
  // };
  // const handleBrand = (brand) => {
  //   setSelectedBrand(brand); // Update selected brand state
  //   setValue("brand", brand);
  //   setBrandOpen(false);
  //   setSearchTerm(""); // Reset search when an option is selected
  // };
  // const fieldOptions = [
  //   { key: "title", label: "Title" },
  //   { key: "brand", label: "Brand" },
  //   { key: "description", label: "Description" },
  // ];
  // const toggleField = (fieldKey) => {
  //   setFields((prev) =>
  //     prev.includes(fieldKey)
  //       ? prev.filter((f) => f !== fieldKey)
  //       : [...prev, fieldKey]
  //   );
  // };

//   const [images, setImages] = useState([]);

//   // Load images from local storage on component mount
//   useEffect(() => {
//     const storedImages =
//       JSON.parse(localStorage.getItem("productImages")) || [];
//     setImages(storedImages);
//   }, []);

//   // Save images to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("productImages", JSON.stringify(images));
//   }, [images]);

//   const onUpload = (event) => {
//     const uploadedFiles = event.files;
//     const newImages = [...images];

//     // Check each file for format and quantity
//     uploadedFiles.forEach((file) => {
//       const fileType = file.type;
//       const isValidFormat =
//         fileType === "image/jpeg" || fileType === "image/png";

//       if (!isValidFormat) {
//         alert("Only PNG and JPG images are allowed.");
//         return;
//       }

//       if (newImages.length < 10) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           newImages.push(e.target.result);
//           setImages(newImages);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         alert("You can only upload up to 10 images.");
//       }
//     });
//   };

//   const onRemoveImage = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//   };

//   // const onSubmit = (data) => {
//   //   console.log("Form Data:", data);
//   // };

//   const onSubmit = (data) => {
//     console.log("Form Data:", {
//       ...data,
//       mainCategory: selectedCategory,
//       subCategory: selectedSubCategory,
//       brand: selectedBrand,
//       images,
//     });

//     onRemoveImage();
//     setSelectedBrand("");
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//     setImages("");
//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="p-4 px-8 w-full mx-auto border rounded-md"
//     >
//       <h2 className="heading my-10">Add New Product</h2>
      // <h3 className="subheading my-6">Product Information</h3>

      // {/* Product Name */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Product Name</label>
      //   <input
      //     {...register("productName", { required: true })}
      //     placeholder="Product Name"
      //     className="w-[70%] p-2 border rounded"
      //   />
      //   {errors.productName && (
      //     <span className="text-red-500">Product Name is required</span>
      //   )}
      // </div>
      // {errors.productName && (
      //   <span className="text-red-500">Product Name is required</span>
      // )}

      // {/* Main Category - Searchable Dropdown */}
      // <div className=" mb-3 flex justify-between items-center relative">
      //   <label className="text mb-1">Main Category</label>

      //   <div
      //     className="w-[70%] p-2 border rounded bg-white cursor-pointer"
      //     onClick={() => setIsOpen(!isOpen)}
      //   >
      //     {selectedCategory || "Select Category"}
      //   </div>

      //   {isOpen && (
      //     <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      //       {/* Search Bar */}
      //       <input
      //         type="text"
      //         className="w-full p-2 border-b"
      //         placeholder="Search category..."
      //         value={searchTerm}
      //         onChange={(e) => setSearchTerm(e.target.value)}
      //         autoFocus
      //       />

      //       {/* Category Options */}
      //       <div className="max-h-40 overflow-y-auto">
      //         {filteredCategories.map((category, index) => (
      //           <div
      //             key={index}
      //             className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
      //             onClick={() => handleSelect(category)}
      //           >
      //             {category}
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   )}

      //   <input
      //     type="hidden"
      //     {...register("mainCategory", { required: true })}
      //   />
      //   {errors.mainCategory && (
      //     <span className="text-red-500">Category is required</span>
      //   )}
      // </div>
      // <div className=" mb-3 flex justify-between items-center relative">
      //   <label className="text mb-1">Sub Category</label>

      //   <div
      //     className="w-[70%] p-2 border rounded bg-white cursor-pointer"
      //     onClick={() => setSubIsOpen(!isSubOpen)}
      //   >
      //     {selectedSubCategory || "Select Category"}
      //   </div>

      //   {isSubOpen && (
      //     <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      //       {/* Search Bar */}
      //       <input
      //         type="text"
      //         className="w-full p-2 border-b"
      //         placeholder="Search category..."
      //         value={searchTerm}
      //         onChange={(e) => setSearchTerm(e.target.value)}
      //         autoFocus
      //       />

      //       {/* Category Options */}
      //       <div className="max-h-40 overflow-y-auto">
      //         {filteredSubCategories.map((category, index) => (
      //           <div
      //             key={index}
      //             className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
      //             onClick={() => handleSubSelect(category)}
      //           >
      //             {category}
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   )}

      //   <input type="hidden" {...register("subCatogery", { required: true })} />
      //   {errors.mainCategory && (
      //     <span className="text-red-500">Category is required</span>
      //   )}
      // </div>
      // <div className=" mb-3 flex justify-between items-center relative">
      //   <label className="text mb-1">Brand</label>

      //   <div
      //     className="w-[70%] p-2 border rounded bg-white cursor-pointer"
      //     onClick={() => setBrandOpen(!isBrandOpen)}
      //   >
      //     {selectedBrand || "Select Brand"}
      //   </div>

      //   {isBrandOpen && (
      //     <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      //       {/* Search Bar */}
      //       <input
      //         type="text"
      //         className="w-full p-2 border-b"
      //         placeholder="Search Brand..."
      //         value={searchTerm}
      //         onChange={(e) => setSearchTerm(e.target.value)}
      //         autoFocus
      //       />

      //       {/* Category Options */}
      //       <div className="max-h-40 overflow-y-auto">
      //         {filteredBrand.map((brand, index) => (
      //           <div
      //             key={index}
      //             className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
      //             onClick={() => handleBrand(brand)}
      //           >
      //             {brand}
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   )}

      //   <input type="hidden" {...register("brand", { required: true })} />
      //   {errors.brand && (
      //     <span className="text-red-500">Brand is required</span>
      //   )}
      // </div>

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

      // <div className="mb-3 flex justify-between items-center">
      //   <h3 className="subheading my-6">Specifications</h3>
      //   <div className="w-[70%] gap-4 flex">
      //     {fieldOptions.map((option) => (
      //       <h3
      //         key={option.key}
      //         onClick={() => toggleField(option.key)}
      //         className={`subheading my-6 border px-3 py-1 rounded cursor-pointer ${
      //           fields.includes(option.key) ? "bg-secondary text-white" : ""
      //         }`}
      //       >
      //         {option.label}
      //       </h3>
      //     ))}
      //   </div>
      // </div>

      // {/* Manufacturer Field */}
      // <div className="mb-3 flex justify-between items-center">
      //   <label className="text mb-1">Manufacturer</label>
      //   <input
      //     {...register("manufacturer")}
      //     className="w-[70%] p-2 border rounded"
      //   />
      // </div>

      // {/* Dynamic Fields Based on User Selection */}
      // {fields.includes("title") && (
      //   <div className="mb-3 flex justify-between items-center">
      //     <label className="text mb-1">Title</label>
      //     <input
      //       {...register("title")}
      //       className="w-[70%] p-2 border rounded"
      //     />
      //   </div>
      // )}
      // {fields.includes("brand") && (
      //   <div className="mb-3 flex justify-between items-center">
      //     <label className="text mb-1">Brand</label>
      //     <input
      //       {...register("brand")}
      //       className="w-[70%] p-2 border rounded"
      //     />
      //   </div>
      // )}

      // {fields.includes("description") && (
      //   <div className="mb-3 flex justify-between items-center">
      //     <label className="text mb-1">Description</label>
      //     <textarea
      //       {...register("description")}
      //       className="w-[70%] p-2 border rounded"
      //     />
      //   </div>
      // )}

//       <div className=" mb-4">
//         <h4 className="font-semibold subheading">Product Images</h4>
//         <p className="text-yellow-500 opacity-70 text-sm mt-1">
//           **Image should be below 1 MB and should have dimentions of 500X600 and
//           type of .png / .jpeg / .webp**
//         </p>
//       </div>

//       <FileUpload
     
//         name="demo[]"
//         customUpload
//         chooseOptions={{ className: "bg-secondary" }}
//         uploadHandler={onUpload}
//         accept="image/png,image/jpeg"
//         maxFileSize={1000000}
//         chooseLabel="Choose Images"
//         multiple={false} // Disable multiple uploads at once
//       />

//       <div className="mt-4 grid grid-cols-4 gap-4">
//         {images.map((img, index) => (
//           <div key={index} className="relative">
//             <img
//               src={img}
//               alt={`product-${index}`}
//               className="w-full h-32 object-cover rounded"
//             />
//             <button
//               type="button"
//               className="absolute top-1 right-1  text-black  p-1"
//               onClick={() => onRemoveImage(index)}
//             >
//               <i className="pi pi-times"></i>
//             </button>
//           </div>
//         ))}
//       </div>

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
      //   <select
      //     {...register("stockStatus")}
      //     className="w-[70%] p-2 border rounded"
      //   >
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

//       {/* Submit Button */}

//       <div className="flex justify-center items-center w-full">
//         <CustomButton title="Submit" onClick={onSubmit} />
//       </div>
//     </form>
//   );
// }

import React, { useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

export default function AddProduct() {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm();

  const [images, setImages] = useState([]);
  // const imagesLenght =  JSON.parse(localStorage.getItem("productImages")).length;
  const [uploadSections, setUploadSections] = useState([0]); 
  const [fileNames, setFileNames] = useState([]); // Track chosen file names
  const [key, setKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fields, setFields] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setSubIsOpen] = useState(false);
  const [isBrandOpen, setBrandOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  const [selectedSubCategory, setSelectedSubCategory] = useState(""); // State to store selected category
  const [selectedBrand, setSelectedBrand] = useState(""); // State to store selected brand
  // State to store selected category

  const mainCategories = [
    "Domestic",
    "Commercial",
    "Industrial",
    "Water Cooler",
    "Chillers",
    "Appliances",
    "Accessories",
    "Dispenser",
    "Water Tanker",
  ];
  const subCatogery = [
    "Filter",
    "Cooler",
    "Dispenser",
    "Chillers",
    "Appliances",
    "Accessories",
    "Sweet Water/ Salt Water/Sewage",
  ];
  const brands = [
    "Rent RO ",
    "Kentt RO",
    "Aquagaurd",
    "Aqua Pro",
    "Waterlogin",
    "Culligen",
  ];

  const filteredCategories = mainCategories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSubCategories = subCatogery.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredBrand = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (category) => {
    setSelectedCategory(category); // Update selected category state
    setValue("mainCategory", category);
    setIsOpen(false);
    setSearchTerm(""); // Reset search when an option is selected
  };
  const handleSubSelect = (category) => {
    setSelectedSubCategory(category); // Update selected category state
    setValue("subCatogery", category);
    setSubIsOpen(false);
    setSearchTerm(""); // Reset search when an option is selected
  };
  const handleBrand = (brand) => {
    setSelectedBrand(brand); // Update selected brand state
    setValue("brand", brand);
    setBrandOpen(false);
    setSearchTerm(""); // Reset search when an option is selected
  };
  const fieldOptions = [
    { key: "title", label: "Title" },
    { key: "brand", label: "Brand" },
    { key: "description", label: "Description" },
  ];
  const toggleField = (fieldKey) => {
    setFields((prev) =>
      prev.includes(fieldKey)
        ? prev.filter((f) => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };



  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("productImages")) || [];
    setImages(storedImages);
    const storedFileNames = JSON.parse(localStorage.getItem("fileName")) || [];
    setFileNames(storedFileNames);
  }, []);

  useEffect(() => {
    localStorage.setItem("productImages", JSON.stringify(images));
    localStorage.setItem("fileName", JSON.stringify(fileNames));
  }, [images,fileNames]);

  const onImageSelect = (event, index) => {
    const selectedFiles = event.files;
    const newImages = [...images];
    const newFileNames = { ...fileNames };
  
    selectedFiles.forEach((file) => {
      const fileType = file.type;
      const isValidFormat = fileType === "image/jpeg" || fileType === "image/png";
  
      if (!isValidFormat) {
        alert("Only PNG and JPG images are allowed.");
        return;
      }
  
      if (newImages.length < 10 || newImages[index]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Update the image at the correct index
          newImages[index] = e.target.result;
          setImages(newImages);
          newFileNames[index] = file.name; 
          setFileNames(newFileNames);
        };
        reader.readAsDataURL(file);
        setKey(!key);
      } else {
        alert("You can only upload up to 10 images.");
      }
    });
  };
  

  useEffect(() => {
    if (images.length > 0) {
      setUploadSections(Array.from({ length: images.length }, (_, index) => index));
    }
  }, [images]);
  

  
  const onRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedFileNames = {};
  Object.keys(fileNames).forEach((key) => {
    const numKey = parseInt(key, 10);
    if (numKey < index) {
      // Keep indices before the removed one the same
      updatedFileNames[numKey] = fileNames[numKey];
    } else if (numKey > index) {
      // Shift indices after the removed one down by 1
      updatedFileNames[numKey - 1] = fileNames[numKey];
    }
  });

  };
  const addNewFileUpload = () => {
    setUploadSections((prev) => {
      const newIndex = prev.length;
      console.log(newIndex,'????')
      const newSections = [...prev, newIndex];
      console.log(newSections,"kjbjskbcl")
      
      // Preserve existing labels and add new label for the new section
      setFileNames((prevNames) => ({
        ...prevNames,
        [newIndex]: "Choose", // Initialize only the new section's label
      }));
      
      return newSections;
    });
  };
  
  const removeFileUpload = (index) => {
    if (uploadSections.length > 1) {
      // Remove the section
      const updatedSections = uploadSections.filter((_, i) => i !== index);
  
      // Re-index the sections to be sequential
      const reIndexedSections = updatedSections.map((_, i) => i);
      setUploadSections(reIndexedSections);
  

      // const reorderedFileNames = reorderedFileNames.filter((_, i) => i !== index);
  
      // Re-index the sections to be sequential
      // const reIndexedNameSections = reorderedFileNames.map((_, i) => i);
      // setFileNames(reIndexedNameSections);
      // onRemoveImage(index);
  
      // Re-index file names to match the new section order
      // const reorderedFileNames = [];

      const reorderedFileNames = {};
      updatedSections.forEach((_, newIndex) => {
        // If the index is after the removed one, shift it by -1
        if (newIndex >= index) {
          reorderedFileNames[newIndex] = fileNames[newIndex + 1] || "Choose Image";
        } else {
          reorderedFileNames[newIndex] = fileNames[newIndex];
        }
      });
  
  
      setFileNames(reorderedFileNames);
      onRemoveImage(index);
     
    } else {
      alert("You must have at least one file upload section.");
    }
  };
  
  
  
  

  const onSubmit = (data) => {
    console.log("Form Data:", {
      ...data,
      images,
    });

    setImages([]);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 px-8 w-full mx-auto border rounded-md"
    >
      <h2 className="heading my-10">Add New Product</h2>
      <h3 className="subheading my-6">Product Information</h3>

{/* Product Name */}
<div className="mb-3 flex justify-between items-center">
  <label className="text mb-1">Product Name</label>
  <input
    {...register("productName", { required: true })}
    placeholder="Product Name"
    className="w-[70%] p-2 border rounded"
  />
  {errors.productName && (
    <span className="text-red-500">Product Name is required</span>
  )}
</div>
{errors.productName && (
  <span className="text-red-500">Product Name is required</span>
)}

{/* Main Category - Searchable Dropdown */}
<div className=" mb-3 flex justify-between items-center relative">
  <label className="text mb-1">Main Category</label>

  <div
    className="w-[70%] p-2 border rounded bg-white cursor-pointer"
    onClick={() => setIsOpen(!isOpen)}
  >
    {selectedCategory || "Select Category"}
  </div>

  {isOpen && (
    <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      {/* Search Bar */}
      <input
        type="text"
        className="w-full p-2 border-b"
        placeholder="Search category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />

      {/* Category Options */}
      <div className="max-h-40 overflow-y-auto">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
            onClick={() => handleSelect(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )}

  <input
    type="hidden"
    {...register("mainCategory", { required: true })}
  />
  {errors.mainCategory && (
    <span className="text-red-500">Category is required</span>
  )}
</div>
<div className=" mb-3 flex justify-between items-center relative">
  <label className="text mb-1">Sub Category</label>

  <div
    className="w-[70%] p-2 border rounded bg-white cursor-pointer"
    onClick={() => setSubIsOpen(!isSubOpen)}
  >
    {selectedSubCategory || "Select Category"}
  </div>

  {isSubOpen && (
    <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      {/* Search Bar */}
      <input
        type="text"
        className="w-full p-2 border-b"
        placeholder="Search category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />

      {/* Category Options */}
      <div className="max-h-40 overflow-y-auto">
        {filteredSubCategories.map((category, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
            onClick={() => handleSubSelect(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )}

  <input type="hidden" {...register("subCatogery", { required: true })} />
  {errors.mainCategory && (
    <span className="text-red-500">Category is required</span>
  )}
</div>
<div className=" mb-3 flex justify-between items-center relative">
  <label className="text mb-1">Brand</label>

  <div
    className="w-[70%] p-2 border rounded bg-white cursor-pointer"
    onClick={() => setBrandOpen(!isBrandOpen)}
  >
    {selectedBrand || "Select Brand"}
  </div>

  {isBrandOpen && (
    <div className="absolute left-[30%] top-10 w-[70%] bg-white border rounded mt-1 z-10">
      {/* Search Bar */}
      <input
        type="text"
        className="w-full p-2 border-b"
        placeholder="Search Brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />

      {/* Category Options */}
      <div className="max-h-40 overflow-y-auto">
        {filteredBrand.map((brand, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
            onClick={() => handleBrand(brand)}
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  )}

  <input type="hidden" {...register("brand", { required: true })} />
  {errors.brand && (
    <span className="text-red-500">Brand is required</span>
  )}
</div>

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
  <input
    {...register("manufacturer")}
    className="w-[70%] p-2 border rounded"
  />
</div>

{/* Dynamic Fields Based on User Selection */}
{fields.includes("title") && (
  <div className="mb-3 flex justify-between items-center">
    <label className="text mb-1">Title</label>
    <input
      {...register("title")}
      className="w-[70%] p-2 border rounded"
    />
  </div>
)}
{fields.includes("brand") && (
  <div className="mb-3 flex justify-between items-center">
    <label className="text mb-1">Brand</label>
    <input
      {...register("brand")}
      className="w-[70%] p-2 border rounded"
    />
  </div>
)}

{fields.includes("description") && (
  <div className="mb-3 flex justify-between items-center">
    <label className="text mb-1">Description</label>
    <textarea
      {...register("description")}
      className="w-[70%] p-2 border rounded"
    />
  </div>
)}



      <div className="mb-4">
        <h4 className="font-semibold subheading">Product Images</h4>
        <p className="text-yellow-500 opacity-70 text-sm mt-1">
          **Image should be below 1 MB and should have dimensions of 500x600 and
          type of .png / .jpeg / .webp**
        </p>
      </div>

      
      {uploadSections.map((sectionIndex) => { 
        console.log(sectionIndex,'PPPP')
      return(
        <div className="mb-4 relative">
          <div className="flex justify-between w-[80%] items-center gap-10">
            <label className="block text mb-2">
              {sectionIndex === 0
                ? "Main Image"
                : `Image ${sectionIndex + 1}`}
            </label>

            <FileUpload
              name={`demo-${sectionIndex}[]`}
              key={key}
              customUpload
              mode="basic"
              chooseOptions={{ className: "bg-secondary" }}
              uploadHandler={() => {}} 
              onSelect={(e) => onImageSelect(e, sectionIndex)}
              accept="image/png,image/jpeg"
              maxFileSize={1000000}
              chooseLabel={fileNames[sectionIndex] } 
              multiple={false}
              auto
            />
           
            <div className="flex justify-center">
            <img src={images[sectionIndex]} className="h-10 w-10 border-none" alt="" />
           
            </div>
            
          </div>
        
          {sectionIndex !== 0 && (
            <button
              type="button"
              onClick={() => removeFileUpload(sectionIndex)}
              className="absolute top-0 right-0 text-black p-1"
              title="Remove this section"
            >
              <i className="pi pi-times mt-4 border"></i>
            </button>
          )}
        </div>
      )})}

      <div className="flex justify-end">
        {images.length < 10 && images.length > 0 && (
          <button
            type="button"
            onClick={addNewFileUpload}
            className="mt-2 px-2 py-1 rounded-lg bg-secondary text-white font-semibold"
          >
            +Add
          </button>
        )}
      </div>

      <div className="mt-4  grid-cols-4 gap-4 hidden">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`product-${index}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-1 right-1 text-black p-1"
              onClick={() => onRemoveImage(index)}
            >
              <i className="pi pi-times"></i>
            </button>
          </div>
        ))}
      </div>

            <h3 className="subheading my-6 mt-4">Inventory</h3>

      {/* SKU */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">SKU</label>
        <input {...register("sku")} className="w-[70%] p-2 border rounded" />
      </div>

      {/* Quantity */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Quantity</label>
        <input
          type="number"
          {...register("quantity")}
          className="w-[70%] p-2 border rounded"
        />
      </div>

      {/* Stock Status */}
      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Stock Status</label>
        <select
          {...register("stockStatus")}
          className="w-[70%] p-2 border rounded"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <h3 className="subheading my-6 mt-4">Prices</h3>

      {/* Pricing Fields */}
      {[
        "Regular Rent Price",
        "Offer Rent Price",
        "Regular Buy Price",
        "Offer Buy Price",
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

      <button
        type="submit"
        className="mt-6 bg-secondary text-white py-2 px-4 rounded"
      >
        Submit Product
      </button>
    </form>
  );
}
