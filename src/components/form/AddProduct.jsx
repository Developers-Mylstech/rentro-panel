// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { FileUpload } from "primereact/fileupload";
// import "../../index.css";
// import "primereact/resources/primereact.min.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primeicons/primeicons.css";
// import { Checkbox } from "primereact/checkbox";
// import { classNames } from "primereact/utils";
// import { MultiSelect } from "primereact/multiselect";
// import { FiPlus } from "react-icons/fi";
// import { IoMdSave } from "react-icons/io";
// import useSpecificationFieldsStore from "../../Context/SpecificationFieldsContext"
// import useCategoryStore from "../../Context/CategoryContext"
// import useBrandStore from '../../Context/BrandContext'
// import useImageUploadStore from "../../Context/ImageUploadContext";
// import ImageUploader from "./imageDemo";


// const RenderServiceFields = ({
//   prefix,
//   priceLabel,
//   serviceData,
//   setServices,
//   serviceLable,
// }) => {
//   const [benefits, setBenefits] = useState([""]);
//   const [servicePrice, setServicePrice] = useState("");
//   const [isDone, setIsDone] = useState(false);

//   const handleAddBenefit = () => {
//     setBenefits([...benefits, ""]);
//     setIsDone(false);
//   };

//   const handleBenefitChange = (index, value) => {
//     const updatedBenefits = [...benefits];
//     updatedBenefits[index] = value;
//     setBenefits(updatedBenefits);
//   };

//   const handleAddService = () => {
//     setServices((prev) => ({
//       ...prev,
//       [serviceLable]: {
//         Price: servicePrice,
//         Benefits: benefits,
//       },
//     }));
//     setIsDone(true);
//   };

//   // console.log(brands)
//   useEffect(() => {
//     console.log("Updated serviceData:", serviceData);
//   }, [serviceData]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-blue-50 p-4 rounded-lg shadow my-4">
//       <div>
//         <label className="block mb-1">{priceLabel}</label>
//         <input
//           type="number"
//           className="w-full p-2 border-b bg-transparent rounded focus:ring-0 focus:outline-none"
//           placeholder="Enter price"
//           value={servicePrice}
//           onChange={(e) => setServicePrice(e.target.value)}
//         />
//       </div>

//       {benefits.map((benefit, index) => (
//         <div key={index}>
//           <label className="block mb-1">
//             {prefix} Benefit {index + 1}
//           </label>
//           <input
//             type="text"
//             value={benefit}
//             onChange={(e) => handleBenefitChange(index, e.target.value)}
//             className="w-full p-2 border-b rounded bg-transparent focus:ring-0 focus:outline-none"
//             placeholder={`Benefit ${index + 1}`}
//           />
//         </div>
//       ))}

//       <div className="col-span-1 md:col-span-2"></div>

//       <div className="col-span-1 md:col-span-2">
//         <div className="w-full flex justify-between items-center">
//           <button
//             type="button"
//             onClick={handleAddBenefit}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             + Add More
//           </button>
//           <button
//             type="button"
//             onClick={handleAddService}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {isDone == true ? "Done" : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function AddProduct() {
//   const { brands, getAllBrands } = useBrandStore()

//   const { specificationFields, getAllSpecificationFields } = useSpecificationFieldsStore()

//   const { categoryList, getAllCategories, flatCategoryList, setSelectedCategory, subCategories } = useCategoryStore()
//   const { uploadImages, isLoading, error, uploadedFiles } = useImageUploadStore();


//   useEffect(() => {
//     getAllBrands()
//     getAllCategories()
//     getAllSpecificationFields()
//   }, [])

//   const {
//     handleSubmit,
//     formState: { errors },
//     reset,
//     register,
//     setValue,
//   } = useForm();

//   const [images, setImages] = useState([]);
//   const [uploadSections, setUploadSections] = useState([0]);
//   const [fileNames, setFileNames] = useState([]);
//   const [key, setKey] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fields, setFields] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubOpen, setSubIsOpen] = useState(false);
//   const [isBrandOpen, setBrandOpen] = useState(false);
//   // const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState();
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [isErrors, setErrors] = useState({});
//   const [showRentForm, setShowRentForm] = useState(false);
//   const [showSellForm, setShowSellForm] = useState(false);
//   const [specifications, setSpecifications] = useState([
//     { name: "Material", code: "material" },
//     { name: "Color", code: "color" },
//     { name: "Size", code: "size" },
//     { name: "Weight", code: "weight" },
//   ]);

//   const [visibleForm, setVisibleForm] = useState(null);

//   const [selectedSpecification, setSelectedSpecification] = useState([]);
//   const [customFields, setCustomFields] = useState([]);
//   const [showNewFieldInput, setShowNewFieldInput] = useState(false);
//   const [newFieldName, setNewFieldName] = useState("");
//   const [shortDescription, setShortDescription] = useState('');

//   const handleAddNewField = () => {
//     if (!newFieldName.trim()) return;

//     const code = newFieldName.toLowerCase().replace(/\s+/g, "_");

//     const newSpec = { name: newFieldName, code };

//     // Add to specification list
//     setSpecifications([...specifications, newSpec]);

//     // Select this newly added spec automatically
//     const updatedSelected = [...selectedSpecification, newSpec];
//     setSelectedSpecification(updatedSelected);

//     // Add to custom fields if not present
//     setCustomFields((prev) =>
//       prev.find((f) => f.code === code)
//         ? prev
//         : [...prev, { label: newFieldName, code, value: "" }]
//     );

//     setNewFieldName("");
//     setShowNewFieldInput(false);
//   };

//   const handleSpecificationChange = (values) => {
//     setSelectedSpecification(values);

//     const selectedCodes = values.map((v) => v.code);

//     const updatedFields = values.map((spec) => {
//       const existing = customFields.find((f) => f.code === spec.code);
//       return existing || { label: spec.name, code: spec.code, value: "" };
//     });

//     setCustomFields(updatedFields);
//   };

//   const handleCustomFieldChange = (code, value) => {
//     const updated = customFields.map((field) =>
//       field.code === code ? { ...field, value } : field
//     );
//     setCustomFields(updated);
//   };

//   const [productFor, setProductFor] = useState();

//   const [selectedServices, setSelectedServices] = useState({});

//   const [oneTimeService, setOneTimeSetvice] = useState({});

//   const [mmcService, setMmcSetvice] = useState({});

//   const [amcBasicService, setAmcBasicSetvice] = useState({});

//   const [amcGoldService, setAmcGoldSetvice] = useState({});

//   const onServiceOptionChange = (e) => {
//     const value = e.value;
//     const isSelected = selectedOptions.includes(value);
//     setSelectedOptions((prev) =>
//       isSelected ? prev.filter((item) => item !== value) : [...prev, value]
//     );


//   };


//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;

//     setSelectedServices((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));

//     // Show/hide the form based on checkbox
//     // setVisibleForms((prev) => ({
//     //   ...prev,
//     //   [name]: checked,
//     // }));
//   };

//   useEffect(() => {
//     setShowRentForm(selectedOptions.includes("Rent"));
//     setShowSellForm(selectedOptions.includes("Sell"));
//     setShowSellForm(selectedOptions.includes("Request"));
//   }, [selectedOptions]);

//   const options = [
//     { label: "Rent", color: "text-blue-600" },
//     { label: "Sell", color: "text-green-600" },
//     { label: "Service", color: "text-red-600" },
//   ];


//   const onOptionChange = (e) => {
//     const value = e.value;
//     const isChecked = e.checked;

//     setSelectedOptions((prev) => {
//       if (isChecked) {
//         return [...prev, value];
//       } else {
//         // Hide the form if unchecking the currently visible one
//         if (
//           (value === "Sell" && visibleForm === "sell") ||
//           (value === "Rent" && visibleForm === "rent") ||
//           (value === "Request" && visibleForm === "request")
//         ) {
//           setVisibleForm(null);
//         }
//         return prev.filter((item) => item !== value);
//       }
//     });

//     // Show the form if checking
//     if (isChecked) {
//       if (value === "Sell") {
//         setVisibleForm("sell");
//       } else if (value === "Rent") {
//         setVisibleForm("rent");
//       } else if (value === "Request") {
//         setVisibleForm("request");
//       }
//     }
//   };

//   // Update the submit handlers
//   const handleSellSubmit = () => {
//     console.log("Sell Data Submitted:", sellFormData);
//     setVisibleForm(null); // Just hide the form
//   };

//   const handleRentSubmit = () => {
//     console.log("Rent Data Submitted:", rentFormData);
//     setVisibleForm(null); // Just hide the form
//   };


//   const filteredCategories = flatCategoryList?.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   // const filteredSubCategories = categoryList?.subCategories?.filter((category) =>
//   //   category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );
//   const filteredBrand = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (category) => {
//     setSelectedCategory(category.name);
//     setValue("mainCategory", category);
//     setIsOpen(false);
//     setSearchTerm("");
//   };

//   const handleSubSelect = (category) => {
//     setSelectedSubCategory(category.subCategories.name);
//     setValue("subCatogery", category);
//     setSubIsOpen(false);
//     setSearchTerm("");
//   };

//   const handleBrand = (brand) => {
//     setSelectedBrand(brand);

//   };

//   const fieldOptions = [
//     { key: "title", label: "Title" },
//     { key: "brand", label: "Brand" },
//     { key: "description", label: "Description" },
//   ];

//   const [rentFormData, setRentFormData] = useState({
//     price: "",
//     discount: "",
//     vat: 5,
//     discountedPrice: "",
//   });

//   const [sellFormData, setSellFormData] = useState({
//     price: "",
//     discount: "",
//     vat: 5,
//     discountedPrice: "",
//   });

//   useEffect(() => {
//     const { price, discount } = rentFormData;
//     if (price && discount) {
//       const discounted = price - (price * discount) / 100;
//       setRentFormData((prev) => ({
//         ...prev,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     } else {
//       setRentFormData((prev) => ({
//         ...prev,
//         discountedPrice: "",
//       }));
//     }
//   }, [rentFormData.price, rentFormData.discount]);

//   useEffect(() => {
//     const { price, discount } = sellFormData;
//     if (price && discount) {
//       const discounted = price - (price * discount) / 100;
//       setSellFormData((prev) => ({
//         ...prev,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     } else {
//       setSellFormData((prev) => ({
//         ...prev,
//         discountedPrice: "",
//       }));
//     }
//   }, [sellFormData.price, sellFormData.discount]);

//   const handlePriceChange = (e) => {
//     const value = e.target.value;
//     setRentFormData((prev) => ({ ...prev, price: value }));
//   };

//   const [discountType, setDiscountType] = useState("percentage"); // 'percentage' or 'aed'
//   const [discountValue, setDiscountValue] = useState();

//   const handleDiscountChange = (e) => {
//     const value = parseFloat(e.target.value) || null;
//     setDiscountValue(value);

//     // Calculate discounted price based on discount type
//     if (discountType === "percentage") {
//       const discounted =
//         rentFormData.price - (rentFormData.price * value) / 100;
//       setRentFormData((prev) => ({
//         ...prev,
//         discount: value,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     } else {
//       // AED discount
//       const discounted = rentFormData.price - value;
//       const discountPercentage = ((value / rentFormData.price) * 100).toFixed(
//         2
//       );
//       setRentFormData((prev) => ({
//         ...prev,
//         discount: discountPercentage,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     }
//   };

//   const [sellDiscountType, setSellDiscountType] = useState("percentage"); // 'percentage' or 'aed'
//   const [sellDiscountValue, setSellDiscountValue] = useState();

//   const handleSellDiscountChange = (e) => {
//     const value = parseFloat(e.target.value) || null;
//     setSellDiscountValue(value);

//     // Calculate discounted price based on discount type
//     if (sellDiscountType === "percentage") {
//       const discounted =
//         sellFormData.price - (sellFormData.price * value) / 100;
//       setSellFormData((prev) => ({
//         ...prev,
//         discount: value,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     } else {
//       // AED discount
//       const discounted = sellFormData.price - value;
//       const discountPercentage = ((value / sellFormData.price) * 100).toFixed(
//         2
//       );
//       setSellFormData((prev) => ({
//         ...prev,
//         discount: discountPercentage,
//         discountedPrice: discounted.toFixed(2),
//       }));
//     }
//   };

//   const handleSellDiscountTypeChange = (type) => {
//     setSellDiscountType(type);
//     handleSellDiscountChange({ target: { value: sellDiscountValue } });
//   };

//   const handleDiscountTypeChange = (type) => {
//     setDiscountType(type);
//     handleDiscountChange({ target: { value: discountValue } });
//   };

//   const onSubmit = (data) => {
//     const specifications = customFields.map(field => ({
//       name: field.name,
//       value: field.value,
//     }));


//     const payload = {
//       name: data.productName || "",
//       description: data.description || "",
//       longDescription: data.longDescription || "",
//       description: shortDescription || "",
//       brandId: selectedBrand,
//       imageUrls: images,
//       specifications: specifications,
//       productFor: {
//         sell: {
//           actualPrice: parseFloat(sellFormData.price || 0),
//           discountPrice: parseFloat(sellFormData.discountedPrice || 0),
//         },
//         rent: {
//           monthlyPrice: parseFloat(rentFormData.price || 0),
//           discountPrice: parseFloat(rentFormData.discountedPrice || 0),
//         },
//         requestQuotation: {
//           actualPrice: 0.1,
//           discountPrice: 0.1,
//         },
//         service: {
//           ots: {
//             price: parseFloat(selectedServices.oneTimeService?.price || 0),
//             benefits: selectedServices.oneTimeService?.benefits || [],
//           },
//           mmc: {
//             price: parseFloat(selectedServices.mmcService?.price || 0),
//             benefits: selectedServices.mmcService?.benefits || [],
//           },
//           amcBasic: {
//             price: parseFloat(selectedServices.amcBasicService?.price || 0),
//             benefits: selectedServices.amcBasicService?.benefits || [],
//           },
//           amcGold: {
//             price: parseFloat(selectedServices.amcGoldService?.price || 0),
//             benefits: selectedServices.amcGoldService?.benefits || [],
//           },
//         },
//       },
//       categoryId: data?.subCatogery?.parentCategoryId,
//       // subCategoryId: parseInt(data?.subCategoryId.categoryId || 0),
//       inventory: {
//         quantity: parseInt(data.quantity || 0),
//         sku: data.sku || "",
//         stockStatus: data.stockStatus || "IN_STOCK",
//       },
//     };

//     console.log("Final Payload:", payload);
//     console.log(data, "data form object")

//     setImages([]);
//     setFileNames([]);
//     setSelectedOptions([]);
//     setCustomFields([]);
//     setRentFormData({
//       price: "",
//       discount: "",
//       vat: 5,
//       discountedPrice: "",
//     });
//     setSellFormData({
//       price: "",
//       discount: "",
//       vat: 5,
//       discountedPrice: "",
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="md:p-4 px-4  w-full mx-auto overflow-x-hidden border rounded-md"
//     >
//       <h2 className="heading my-6 md:my-10 text-gray-900 dark:text-gray-100">
//         Add New Product
//       </h2>
//       <h3 className="subheading my-6 text-gray-800 dark:text-gray-200">
//         Product Information
//       </h3>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 text-gray-800 dark:text-gray-200">
//           Product Name
//         </label>
//         <input
//           {...register("productName", { required: true })}
//           placeholder="Product Name"
//           className="md:md:w-[70%] w-[100%]  p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
//         />

//       </div>

//       {errors.productName && (
//         <span className="text-red-500">Product Name is required</span>
//       )}

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
//         <label className="text mb-1 text-gray-800 dark:text-gray-200">
//           Main Category
//         </label>

//         <div
//           className="md:w-[70%] w-[100%] p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {/* {selectedCategory || "Select Category"} */}
//           select Category
//         </div>

//         {isOpen && (
//           <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
//             <input
//               type="text"
//               className="w-full p-2 border-b bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//               placeholder="Search main categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               autoFocus
//             />
//             <div className="max-h-40 overflow-y-auto z-50">
//               {filteredCategories
//                 ?.filter(category =>
//                   // category.parentCategoryId === null && // Only main categories
//                   category.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search filter
//                 )
//                 ?.map((category) => (
//                   <div
//                     key={category.categoryId}
//                     className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
//                     onClick={() => setSelectedCategory(category.categoryId)}
//                   >
//                     {category.name}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}

//         {/* <input
//           type="hidden"
//           {...register("mainCategory", { required: true })}
//         /> */}
//         {/* {errors.mainCategory && (
//           <span className="text-red-500 dark:text-red-400">
//             Category is required
//           </span>
//         )} */}
//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
//         <label className="text mb-1 dark:text-gray-100">Sub Category</label>

//         <div
//           className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer"
//           onClick={() => setSubIsOpen(!isSubOpen)}
//         >
//           {selectedSubCategory || "Select Category"}
//         </div>

//         {isSubOpen && (
//           <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
//             <div className="max-h-40 overflow-y-auto z-50">
//               {subCategories?.map((subCategory) => (  // Use subCategories from Zustand
//                 <div
//                   key={subCategory.categoryId}  // Use ID instead of index for key
//                   className="p-2 cursor-pointer hover:bg-secondary dark:hover:bg-gray-700 hover:text-white"
//                   onClick={() => handleSubSelect(subCategory)}
//                 >
//                   {subCategory.name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* <input type="hidden" {...register("subCatogery", { required: true })} />
//         {errors.mainCategory && (
//           <span className="text-red-500">Category is required</span>
//         )} */}
//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
//         <label className="text mb-1 dark:text-gray-200">Brand</label>

//         <div
//           className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer"
//           onClick={() => setBrandOpen(!isBrandOpen)}
//         >
//           {selectedBrand || "Select Brand"}
//         </div>

//         {isBrandOpen && (
//           <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
//             <input
//               type="text"
//               className="w-full p-2 border-b border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
//               placeholder="Search Brand..."
//               value={brands.name}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               autoFocus
//             />

//             <div className="max-h-40 overflow-y-auto">
//               {filteredBrand?.map((brand, index) => (

//                 <div
//                   key={index}
//                   className="p-2 cursor-pointer hover:bg-secondary dark:hover:bg-gray-700 hover:text-white"
//                   onClick={() => handleBrand(brand.brandId)}
//                 >
//                   {brand.name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* <input type="hidden" {...register("brand", { required: true })} />
//         {errors.brand && (
//           <span className="text-red-500">Brand is required</span>
//         )} */}
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full py-2 gap-2 ">
//         <h3 className="text dark:text-gray-200">Product For</h3>

//         <div className="grid md:grid-cols-4 grid-cols-1 gap-4 md:w-[70%] w-full relative">
//           <div className="flex   flex-col gap-2 pr-4 border-r-2 border-gray-200 dark:border-gray-600 relative">
//             <div className="flex justify-start items-center gap-2">
//               <Checkbox
//                 inputId="Sell"
//                 value="Sell"
//                 onChange={onOptionChange}
//                 checked={selectedOptions.includes("Sell")}
//                 className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
//               />
//               <label
//                 htmlFor="Sell"
//                 className="text-green-600  text-sm flex justify-between w-full "
//               >
//                 <span>Sell</span>{" "}
//                 {sellFormData?.discountedPrice && (
//                   <span className="font-bold text-gray-500 bg-green-100 p-1 rounded-md">
//                     {sellFormData?.discountedPrice + " AED"}
//                   </span>
//                 )}
//               </label>
//             </div>

//             {visibleForm === "sell" && (
//               <div className="absolute top-full left-0 mt-2 z-10 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg w-80">
//                 <div className="flex flex-col gap-2">
//                   {/* Price */}
//                   <div className="flex flex-col">
//                     <label className="text-sm text-gray-700 dark:text-gray-200">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       value={sellFormData.price}
//                       onChange={(e) =>
//                         setSellFormData({
//                           ...sellFormData,
//                           price: e.target.value,
//                         })
//                       }
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
//                     />
//                   </div>

//                   {/* Discount Input */}
//                   <div className="flex flex-col">
//                     <div className="flex justify-between items-center my-1 text-xs">
//                       <label className="text-xs text-gray-700 dark:text-gray-200">
//                         {sellDiscountType === "percentage"
//                           ? "Offer Discount (%)"
//                           : "Discount Amount (AED)"}
//                       </label>

//                       <div className="flex justify-start items-center gap-4">
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             id="sell-percentage"
//                             name="sellDiscountType"
//                             checked={sellDiscountType === "percentage"}
//                             onChange={() =>
//                               handleSellDiscountTypeChange("percentage")
//                             }
//                             className="mx-1"
//                           />
//                           <label htmlFor="sell-percentage">%</label>
//                         </div>
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             id="sell-aed"
//                             name="sellDiscountType"
//                             checked={sellDiscountType === "aed"}
//                             onChange={() => handleSellDiscountTypeChange("aed")}
//                             className="mx-1"
//                           />
//                           <label htmlFor="sell-aed">AED</label>
//                         </div>
//                       </div>
//                     </div>
//                     <input
//                       type="number"
//                       value={sellDiscountValue}
//                       onChange={handleSellDiscountChange}
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
//                     />
//                   </div>

//                   {sellDiscountType === "aed" && sellFormData.price > 0 && (
//                     <div className="text-sm text-gray-600 dark:text-gray-300">
//                       You're getting {sellFormData.discount}% discount
//                     </div>
//                   )}

//                   <div className="flex flex-col">
//                     <label className="text-sm text-gray-700 dark:text-gray-200">
//                       Discounted Price (AED)
//                     </label>
//                     <input
//                       type="number"
//                       value={sellFormData.discountedPrice}
//                       disabled
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm"
//                     />
//                   </div>

//                   {/* VAT */}
//                   <div className="flex flex-col">
//                     <label className="text-sm text-gray-700 dark:text-gray-200">
//                       VAT (5%)
//                     </label>
//                     <input
//                       type="number"
//                       value={sellFormData.vat}
//                       disabled
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm"
//                     />
//                   </div>

//                   <button
//                     onClick={handleSellSubmit}
//                     className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Rent */}
//           <div className="flex flex-col gap-2 pr-4 border-r-2 border-gray-200 dark:border-gray-600 relative">
//             <div className="flex justify-start items-center gap-4">
//               <Checkbox
//                 inputId="Rent"
//                 value="Rent"

//                 onChange={onOptionChange}
//                 checked={selectedOptions.includes("Rent")}
//                 className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
//               />
//               <label
//                 htmlFor="Rent"
//                 className="text-orange-500   text-sm flex justify-between w-full "
//               >
//                 Rent{" "}
//                 {rentFormData?.discountedPrice && (
//                   <span className="font-bold text-gray-500 bg-orange-100 p-1 rounded-md">
//                     {" "}
//                     {rentFormData?.discountedPrice + " AED"}
//                   </span>
//                 )}
//               </label>
//             </div>

//             {visibleForm === "rent" && (
//               <div className="absolute top-full left-0  mt-2 z-10 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg w-80">
//                 <div className="flex flex-col gap-2">
//                   {/* Price */}
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="price"
//                       className="text-sm text-gray-700 dark:text-gray-200"
//                     >
//                       Monthly Rent
//                     </label>
//                     <input
//                       id="price"
//                       type="number"
//                       value={rentFormData.price}
//                       onChange={handlePriceChange}
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <div className="text-xs flex justify-between items-center my-1">
//                       <label
//                         htmlFor="discount"
//                         className="text-xs text-gray-700 dark:text-gray-200"
//                       >
//                         {discountType === "percentage"
//                           ? "Offer Discount (%)"
//                           : "Discount Amount (AED)"}
//                       </label>
//                       <div className="flex justify-start items-center gap-4">
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             id="percentage"
//                             name="discountType"
//                             checked={discountType === "percentage"}
//                             onChange={() =>
//                               handleDiscountTypeChange("percentage")
//                             }
//                             className="mx-1"
//                           />
//                           <label htmlFor="percentage">%</label>
//                         </div>
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             id="aed"
//                             name="discountType"
//                             checked={discountType === "aed"}
//                             onChange={() => handleDiscountTypeChange("aed")}
//                             className="mx-1"
//                           />
//                           <label htmlFor="aed">AED</label>
//                         </div>
//                       </div>
//                     </div>
//                     <input
//                       id="discount"
//                       type="number"
//                       value={discountValue}
//                       onChange={handleDiscountChange}
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
//                     />
//                   </div>

//                   {discountType === "aed" && rentFormData.price > 0 && (
//                     <div className="text-sm text-gray-600 dark:text-gray-300">
//                       You're getting {rentFormData.discount}% discount
//                     </div>
//                   )}

//                   {/* Discounted Price */}
//                   <div className="flex flex-col">
//                     <label className="text-sm text-gray-700 dark:text-gray-200">
//                       Discounted Monthly Rent (AED)
//                     </label>
//                     <input
//                       type="number"
//                       value={rentFormData.discountedPrice}
//                       disabled
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm"
//                     />
//                   </div>

//                   {/* VAT */}
//                   <div className="flex flex-col">
//                     <label
//                       htmlFor="vat"
//                       className="text-sm text-gray-700 dark:text-gray-200"
//                     >
//                       VAT (5%)
//                     </label>
//                     <input
//                       id="vat"
//                       type="number"
//                       value={rentFormData.vat}
//                       disabled
//                       className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleRentSubmit}
//                     className="mt-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Service */}
//           <div className="">
//             {/* Main Service Checkbox */}
//             <div className="flex  items-center gap-2 pr-4 border-r-2">
//               <Checkbox
//                 inputId="Service"
//                 value="Service"
//                 onChange={onServiceOptionChange}
//                 checked={selectedOptions.includes("Service")}
//                 className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
//               />
//               <label htmlFor="Service" className="text-purple-500 text-sm">
//                 Service
//               </label>
//             </div>

//           </div>

//           <div className="flex flex-col gap-2 pr-4  border-gray-200 dark:border-gray-600 relative">
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 inputId="Request"
//                 value="Request"
//                 onChange={onOptionChange}
//                 checked={selectedOptions.includes("Request")}
//                 className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
//               />
//               <label htmlFor="Request" className="text-orange-500 text-sm">
//                 Request Quatation
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       {visibleForm === "request" && (
//         <div className="   mt-2 z-10 bg-white dark:bg-gray-800 p-4 rounded-md w-full border ">
//           <div className="bg-white rounded-2xl shadow-lg w-full  p-6">
//             <div className="flex justify-between items-center mb-4 w-[100%]">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Request Quotation
//               </h2>
//               {/* <button
//             onClick={() => setOpenDailog(false)}
//             className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
//           >
//             &times;
//           </button> */}
//             </div>

//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
//               {/* Image Upload */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Image
//                 </label>
//                 <input
//                   type="file"
//                   className="rounded-lg shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Name */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Name*
//                 </label>
//                 <input
//                   type="text"
//                   className="rounded-lg shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               {/* Mobile */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Mobile*
//                 </label>
//                 <input
//                   type="tel"
//                   className="rounded-lg shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your mobile number"
//                 />
//               </div>

//               {/* Company Name */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Company Name (if any)
//                 </label>
//                 <input
//                   type="text"
//                   className="rounded-lg shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter company name"
//                 />
//               </div>

//               {/* Location (Full Width) */}
//               <div className="col-span-1 md:col-span-2 flex flex-col">
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   className="rounded-lg shadow-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter location"
//                 />
//               </div>

//               {/* Submit Button (Centered) */}
//               <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
//                 <button
//                   type="submit"
//                   className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {selectedOptions.includes("Service") && (
//         <div className="space-y-6 md:w-[100%] flex  justify-end items-center">
//           {/* Sub-service checkboxes */}
//           <div className="grid md:grid-cols-4 grid-cols-1 justify-end text-gray-500  gap-6 my-4 md:w-[70%] w-full">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="oneTime"
//                 checked={selectedServices.oneTime}
//                 onChange={handleCheckboxChange}
//               />
//               <span>OneTime Service</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="mmc"
//                 checked={selectedServices.mmc}
//                 onChange={handleCheckboxChange}
//               />
//               <span>MMC Service</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="amcbasic"
//                 checked={selectedServices.amcbasic}
//                 onChange={handleCheckboxChange}
//               />
//               <span>AMC Service (Basic)</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="amcgold"
//                 checked={selectedServices.amcgold}
//                 onChange={handleCheckboxChange}
//               />
//               <span>AMC Service (Gold)</span>
//             </label>
//           </div>

//           {/* Conditional Sections */}
//         </div>
//       )}

//       {selectedServices.oneTime && (
//         <div className="w-full">
//           <h2 className="text-lg font-bold text-gray-800">OneTime Service</h2>
//           <RenderServiceFields
//             prefix="OneTime"
//             priceLabel="OneTime Price (Per Service)"
//             serviceData={oneTimeService}
//             setServices={setOneTimeSetvice}
//             serviceLable={"oneTime"}
//             setSelectedServices={setSelectedServices}
//           />
//         </div>
//       )}
//       {selectedServices.mmc && (
//         <div className="w-full">
//           <h2 className="text-lg font-bold text-gray-800">MMC Service</h2>
//           <RenderServiceFields
//             prefix="MMC"
//             priceLabel="MMC Price (Per Month)"
//             serviceData={mmcService}
//             setServices={setMmcSetvice}
//             serviceLable={"mmc"}
//             setSelectedServices={setSelectedServices}

//           />
//         </div>
//       )}
//       {selectedServices.amcbasic && (
//         <div className="w-full">
//           <h2 className="text-lg font-bold text-gray-800">AMC Basic Service</h2>
//           <RenderServiceFields
//             prefix="AMC"
//             priceLabel="AMC Price (Per Year)"
//             serviceData={amcBasicService}
//             setServices={setAmcBasicSetvice}
//             serviceLable={"amcBasic"}
//             setSelectedServices={setSelectedServices}
//           />
//         </div>
//       )}
//       {selectedServices.amcgold && (
//         <div className="w-full">
//           <h2 className="text-lg font-bold text-gray-800">AMC Gold Service</h2>
//           <RenderServiceFields
//             prefix="AMC"
//             priceLabel="AMC Price (Per Year)"
//             serviceData={amcGoldService}
//             setServices={setAmcGoldSetvice}
//             serviceLable={"amcGold"}
//             setSelectedServices={setSelectedServices}
//           />
//         </div>
//       )}

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">Long Description</label>
//         <textarea
//           {...register("longDescription")}
//           className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
//         ></textarea>
//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">
//           Short Description
//         </label>
//         <input
//           {...register("shortDescription")}
//           value={shortDescription}
//           onChange={(e) => setShortDescription(e.target.value)}
//           className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
//         />

//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">Manufacturer</label>
//         <input
//           {...register("manufacturer")}
//           className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
//         />
//       </div>

//       <div className="flex flex-col gap-4 ">
//         {/* Header section with MultiSelect and Add button */}
//         <div className="flex md:flex-row flex-col justify-between items-center w-full">
//           <label className="font-semibold text-gray-500 text-left w-full md:w-auto my-2">
//             Specifications
//           </label>

//           <div className="flex flex-col md:flex-row justify-between gap-2 md:w-[70%] w-full">
//             <MultiSelect
//               value={selectedSpecification}
//               onChange={(e) => handleSpecificationChange(e.value)}
//               options={specificationFields}
//               optionLabel="name"
//               filter
//               placeholder="Select Specifications"
//               // maxSelectedLabels={3}
//               className="w-full md:w-[40%] border"
//               pt={{
//                 item: {
//                   className: "flex items-center gap-2 p-2",
//                 },
//                 checkbox: {
//                   root: { className: "border border-gray-300 rounded-md" },
//                   box: { className: "border border-gray-300 rounded-md" },
//                 },
//               }}
//             />

//             {showNewFieldInput == false ? (
//               <button
//                 type="button"
//                 onClick={() => setShowNewFieldInput(!showNewFieldInput)}
//                 className=" flex justify-center items-center "
//               >
//                 <FiPlus className="p-2 bg-secondary text-white rounded  text-4xl md:w-auto w-16" />
//               </button>
//             ) : (
//               <div className="flex gap-2  w-full ml-auto">
//                 <input
//                   type="text"
//                   value={newFieldName}
//                   onChange={(e) => setNewFieldName(e.target.value)}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter new specification name"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddNewField}
//                   className="bg-secondary text-white rounded p-2 texl-2xl "
//                 >
//                   <IoMdSave />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {customFields.length > 0 && (
//           <div className="flex flex-col gap-3  w-full my-2">
//             {customFields.map((field, index) => (
//               <div
//                 key={field.code}
//                 className="flex justify-between items-center "
//               >
//                 <label className=" font-medium text-gray-500">
//                   {field.label}
//                 </label>
//                 <input
//                   type="text"
//                   value={field.value}
//                   onChange={(e) =>
//                     handleCustomFieldChange(field.code, e.target.value)
//                   }
//                   className="w-[70%] p-2 border rounded"
//                   placeholder={`Enter ${field.label} value`}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

     

      
//       <h3 className="subheading my-6 mt-4 dark:text-gray-200">Inventory</h3>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">SKU</label>
//         <input
//           {...register("sku")}
//           className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//         />
//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">Quantity</label>
//         <input
//           type="number"
//           {...register("quantity")}
//           className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//         />
//       </div>

//       <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
//         <label className="text mb-1 dark:text-gray-200">Stock Status</label>
//         <select
//           {...register("stockStatus")}
//           className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//         >
//           <option value="In Stock" className="dark:text-black">
//             In Stock
//           </option>
//           <option value="Out of Stock" className="dark:text-black">
//             Out of Stock
//           </option>
//         </select>
//       </div>

//       <ImageUploader setImage={setImages} />

//       <div className="flex justify-center items-center">
//         <button
//           type="submit"

//           className="mt-6 bg-secondary text-white py-2 px-4 my-4 rounded hover:bg-secondary-dark transition"
//         >
//           Submit Product
//         </button>
//       </div>
//     </form>
//   );
// }

import React from 'react'

export default function AddProduct() {
  return (
    <div>
      
    </div>
  )
}
