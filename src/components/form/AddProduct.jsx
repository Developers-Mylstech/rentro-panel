import React, { useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";

export default function AddProduct() {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm();

  const [images, setImages] = useState([]);
  const [uploadSections, setUploadSections] = useState([0]);
  const [fileNames, setFileNames] = useState([]);
  const [key, setKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fields, setFields] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setSubIsOpen] = useState(false);
  const [isBrandOpen, setBrandOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isErrors, setErrors] = useState({});
  const [showRentForm, setShowRentForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);

  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState({
    oneTime: false,
    mmc: false,
    amc: false,
  });

  const onServiceOptionChange = (e) => {
    const value = e.value;
    const isSelected = selectedOptions.includes(value);
    setSelectedOptions((prev) =>
      isSelected ? prev.filter((item) => item !== value) : [...prev, value]
    );

    // Reset individual service types if "Service" is unchecked
    if (value === "Service" && isSelected) {
      setSelectedServices({ oneTime: false, mmc: false, amc: false });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedServices((prev) => ({ ...prev, [name]: checked }));
  };

  const renderServiceFields = (prefix, priceLabel) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-blue-50 p-4 rounded-lg shadow my-4">
      <div>
        <label className="block  mb-1">{priceLabel}</label>
        <input type="number" className="w-full p-2 border-b bg-transparent rounded" placeholder="Enter price" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <label className="block mb-1">{prefix} Benefit {i}</label>
          <input className="w-full p-2 border-b rounded bg-transparent" placeholder={`Benefit ${i}`} />
        </div>
      ))}
    </div>
  );



  useEffect(() => {
    setShowRentForm(selectedOptions.includes("Rent"));
  }, [selectedOptions]);


  const options = [
    { label: "Rent", color: "text-blue-600" },
    { label: "Sell", color: "text-green-600" },
    { label: "Service", color: "text-red-600" },
  ];

  const onOptionChange = (e) => {
    let updatedOptions = [...selectedOptions];
    if (e.checked) {
      updatedOptions.push(e.value);
    } else {
      updatedOptions = updatedOptions.filter((item) => item !== e.value);
    }
    setSelectedOptions(updatedOptions);
  };

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

  const [rentFormData, setRentFormData] = useState({
    price: '',
    discount: '',
    vat: 5,
    discountedPrice: ''
  });

  useEffect(() => {
    const { price, discount } = rentFormData;
    if (price && discount) {
      const discounted = price - (price * discount / 100);
      setRentFormData((prev) => ({
        ...prev,
        discountedPrice: discounted.toFixed(2)
      }));
    } else {
      setRentFormData((prev) => ({
        ...prev,
        discountedPrice: ''
      }));
    }
  }, [rentFormData.price, rentFormData.discount]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setRentFormData((prev) => ({ ...prev, price: value }));
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    setRentFormData((prev) => ({ ...prev, discount: value }));
  };

  const onRentOptionChange = (e) => {
    const value = e.value;
    const selected = [...selectedOptions];
    const index = selected.indexOf(value);
    if (index === -1) {
      selected.push(value);
    } else {
      selected.splice(index, 1);
    }
    setSelectedOptions(selected);
  };

  const handleRent = () => {
    console.log("Rent Form Submitted:", );
    
  };


  const [sellFormData, setSellFormData] = useState({
    price: '',
    discount: '',
    vat: 5,
    discountedPrice: ''
  });

  useEffect(() => {
    setShowRentForm(selectedOptions.includes("Rent"));
    setShowSellForm(selectedOptions.includes("Sell"));
  }, [selectedOptions]);

  // Auto calculate discounted prices
  useEffect(() => {
    const { price, discount } = rentFormData;
    if (price && discount) {
      const discounted = price - (price * discount / 100);
      setRentFormData((prev) => ({
        ...prev,
        discountedPrice: discounted.toFixed(2)
      }));
    } else {
      setRentFormData((prev) => ({ ...prev, discountedPrice: '' }));
    }
  }, [rentFormData.price, rentFormData.discount]);

  useEffect(() => {
    const { price, discount } = sellFormData;
    if (price && discount) {
      const discounted = price - (price * discount / 100);
      setSellFormData((prev) => ({
        ...prev,
        discountedPrice: discounted.toFixed(2)
      }));
    } else {
      setSellFormData((prev) => ({ ...prev, discountedPrice: '' }));
    }
  }, [sellFormData.price, sellFormData.discount]);

  const onsSellOptionChange = (e) => {
    const value = e.value;
    const selected = [...selectedOptions];
    const index = selected.indexOf(value);
    if (index === -1) selected.push(value);
    else selected.splice(index, 1);
    setSelectedOptions(selected);
  };

  const handleRentSubmit = () => {
    console.log("Rent Data Submitted:", rentFormData);
    setShowRentForm(false);
    setSelectedOptions((prev) => prev.filter(opt => opt !== "Rent"));
  };

  const handleSellSubmit = () => {
    console.log("Sell Data Submitted:", sellFormData);
    setShowSellForm(false);
    setSelectedOptions((prev) => prev.filter(opt => opt !== "Sell"));
  };




  const toggleField = (fieldKey) => {
    setFields((prev) =>
      prev.includes(fieldKey)
        ? prev.filter((f) => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  useEffect(() => {
    const storedImages =
      JSON.parse(localStorage.getItem("productImages")) || [];
    setImages(storedImages);
    const storedFileNames = JSON.parse(localStorage.getItem("fileName")) || [];
    setFileNames(storedFileNames);
  }, []);

  useEffect(() => {
    localStorage.setItem("productImages", JSON.stringify(images));
    localStorage.setItem("fileName", JSON.stringify(fileNames));
  }, [images, fileNames]);

  const onImageSelect = (event, index) => {
    const selectedFiles = event.files;
    const newImages = [...images];
    const newFileNames = { ...fileNames };

    for (let file of selectedFiles) {
      const fileType = file.type;
      const fileSize = file.size;

      const isValidFormat = ["image/jpeg", "image/png", "image/webp"].includes(
        fileType
      );
      const isValidSize = fileSize <= 1024 * 1024; // 1MB limit

      if (!isValidFormat) {
        alert("Select a proper format (JPEG, PNG, WEBP).");
        setKey(!key);
        setErrors(true);
        return; // Stop execution
      }

      if (!isValidSize) {
        alert("File size exceeds 1MB. Please select a smaller file.");
        setKey(!key);
        setErrors(true);
        return; // Stop execution
      }

      if (newImages.length >= 10) {
        alert("You can only upload up to 10 images.");

        return;
      }

      const reader = new FileReader();
      setErrors(false);
      reader.onload = (e) => {
        newImages[index] = e.target.result;
        newFileNames[index] = file.name;
        setImages(newImages);
        setFileNames(newFileNames);
      };
      reader.readAsDataURL(file);
      setKey(!key);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      setUploadSections(
        Array.from({ length: images.length }, (_, index) => index)
      );
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
        updatedFileNames[numKey] = fileNames[numKey];
      } else if (numKey > index) {
        updatedFileNames[numKey - 1] = fileNames[numKey];
      }
    });
  };
  const addNewFileUpload = () => {
    setUploadSections((prev) => {
      const newIndex = prev.length;
      console.log(newIndex, "????");
      const newSections = [...prev, newIndex];
      console.log(newSections, "kjbjskbcl");

      setFileNames((prevNames) => ({
        ...prevNames,
        [newIndex]: "Choose",
      }));

      return newSections;
    });
  };

  const [showError, setShowError] = useState(false);
  

  useEffect(() => {
    if (isErrors == true) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setErrors(false);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup to prevent memory leaks
      // timer()
    } else {
      setShowError(false);
    }
  }, [isErrors]);

  const removeFileUpload = (index) => {
    if (uploadSections.length >= 0) {
      const updatedSections = uploadSections.filter((_, i) => i !== index);

      const reIndexedSections = updatedSections.map((_, i) => i);
      setUploadSections(reIndexedSections);

      const reorderedFileNames = {};
      updatedSections.forEach((_, newIndex) => {
        if (newIndex >= index) {
          reorderedFileNames[newIndex] =
            fileNames[newIndex + 1] || "Choose Image";
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
      className="md:p-4 px-4  w-full mx-auto overflow-x-hidden border rounded-md"
    >
      <h2 className="heading my-6 md:my-10 text-gray-900 dark:text-gray-100">
        Add New Product
      </h2>
      <h3 className="subheading my-6 text-gray-800 dark:text-gray-200">
        Product Information
      </h3>

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 text-gray-800 dark:text-gray-200">
          Product Name
        </label>
        <input
          {...register("productName", { required: true })}
          placeholder="Product Name"
          className="md:md:w-[70%] w-[100%]  p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.productName && (
          <span className="text-red-500 dark:text-red-400">
            Product Name is required
          </span>
        )}
      </div>

      {errors.productName && (
        <span className="text-red-500">Product Name is required</span>
      )}

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
        <label className="text mb-1 text-gray-800 dark:text-gray-200">
          Main Category
        </label>

        <div
          className="md:w-[70%] w-[100%] p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory || "Select Category"}
        </div>

        {isOpen && (
          <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
            <input
              type="text"
              className="w-full p-2 border-b bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredCategories.map((category, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
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
          <span className="text-red-500 dark:text-red-400">
            Category is required
          </span>
        )}
      </div>

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
        <label className="text mb-1 dark:text-gray-100">Sub Category</label>

        <div
          className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => setSubIsOpen(!isSubOpen)}
        >
          {selectedSubCategory || "Select Category"}
        </div>

        {isSubOpen && (
          <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
            <input
              type="text"
              className="w-full p-2 border-b border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredSubCategories.map((category, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-secondary dark:hover:bg-gray-700 hover:text-white"
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

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center relative">
        <label className="text mb-1 dark:text-gray-200">Brand</label>

        <div
          className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => setBrandOpen(!isBrandOpen)}
        >
          {selectedBrand || "Select Brand"}
        </div>

        {isBrandOpen && (
          <div className="absolute md:left-[30%] left-0 md:top-10 top-7 md:w-[70%] w-[100%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
            <input
              type="text"
              className="w-full p-2 border-b border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Search Brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <div className="max-h-40 overflow-y-auto">
              {filteredBrand.map((brand, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-secondary dark:hover:bg-gray-700 hover:text-white"
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

      {/* <div className="flex  md:flex-row flex-col md:justify-between md:items-center w-full py-2 gap-2">
        <h3 className="text dark:text-gray-200">Product For</h3>
        <div className="flex gap-2 md:w-[70%] w-[100%]">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex align-items-center pr-4 md:pl-20 md:pr-20 ${
                option.label === "Sell" || option.label === "Rent"
                  ? "border-r-2 border-gray-200 dark:border-gray-600"
                  : ""
              }`}
            >
              <Checkbox
                inputId={option.label}
                value={option.label}
                onChange={onOptionChange}
                checked={selectedOptions.includes(option.label)}
                className="border border-gray-300 dark:border-gray-600 rounded-md h-6 w-6"
              />
              <label
                htmlFor={option.label}
                className={`md:ml-4 ml-1 ${option.color}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div> */}

<div className="flex flex-col md:flex-row md:justify-between md:items-start w-full py-2 gap-2">
      <h3 className="text dark:text-gray-200">Product For</h3>

      <div className="flex flex-wrap md:flex-nowrap gap-4 md:w-[70%] w-full relative">

      <div className="flex flex-col gap-2 pr-4 border-r-2 border-gray-200 dark:border-gray-600 relative">
          <div className="flex items-center gap-2">
            <Checkbox
              inputId="Sell"
              value="Sell"
              onChange={onOptionChange}
              checked={selectedOptions.includes("Sell")}
              className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
            />
            <label htmlFor="Sell" className="text-green-600 text-sm">Sell</label>
          </div>

          {showSellForm && (
            <div className="absolute top-full left-0 mt-2 z-10 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg w-80">
              <div className="flex flex-col gap-2">
                {/* Price */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 dark:text-gray-200">Price</label>
                  <input
                    type="number"
                    value={sellFormData.price}
                    onChange={(e) => setSellFormData({ ...sellFormData, price: e.target.value })}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                  />
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 dark:text-gray-200">Offer Discount (%)</label>
                  <input
                    type="number"
                    value={sellFormData.discount}
                    onChange={(e) => setSellFormData({ ...sellFormData, discount: e.target.value })}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                  />
                </div>

                {/* Discounted Price */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 dark:text-gray-200">Discounted Price</label>
                  <input
                    type="number"
                    value={sellFormData.discountedPrice}
                    disabled
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm"
                  />
                </div>

                {/* VAT */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 dark:text-gray-200">VAT (5%)</label>
                  <input
                    type="number"
                    value={sellFormData.vat}
                    disabled
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm"
                  />
                </div>

                <button
                  onClick={handleSellSubmit}
                  className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>



        {/* Rent */}
        <div className="flex flex-col gap-2 pr-4 border-r-2 border-gray-200 dark:border-gray-600 relative">
          <div className="flex items-center gap-2">
            <Checkbox
              inputId="Rent"
              value="Rent"
              onChange={onRentOptionChange}
              checked={selectedOptions.includes("Rent")}
              className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
            />
            <label htmlFor="Rent" className="text-orange-500 text-sm">Rent</label>
          </div>

          {showRentForm && (
            <div className="absolute top-full md:left-0 -left-2 mt-2 z-10 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg w-80">
              <div className="flex flex-col gap-2">
                {/* Price */}
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-sm text-gray-700 dark:text-gray-200">Price</label>
                  <input
                    id="price"
                    type="number"
                    value={rentFormData.price}
                    onChange={handlePriceChange}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                  />
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                  <label htmlFor="discount" className="text-sm text-gray-700 dark:text-gray-200">Offer Discount (%)</label>
                  <input
                    id="discount"
                    type="number"
                    value={rentFormData.discount}
                    onChange={handleDiscountChange}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                  />
                </div>

                {/* Discounted Price */}
                <div className="flex flex-col">
                  <label htmlFor="discountedPrice" className="text-sm text-gray-700 dark:text-gray-200">Discounted Price</label>
                  <input
                    id="discountedPrice"
                    type="number"
                    value={rentFormData.discountedPrice}
                    disabled
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm"
                  />
                </div>

                {/* VAT */}
                <div className="flex flex-col">
                  <label htmlFor="vat" className="text-sm text-gray-700 dark:text-gray-200">VAT (5%)</label>
                  <input
                    id="vat"
                    type="number"
                    value={rentFormData.vat}
                    disabled
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleRent}
                  className="mt-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Service */}
        <div className="">
      {/* Main Service Checkbox */}
      <div className="flex  items-center gap-2 pr-4">
        <Checkbox
          inputId="Service"
          value="Service"
          onChange={onServiceOptionChange}
          checked={selectedOptions.includes("Service")}
          className="border border-gray-300 dark:border-gray-600 rounded-md h-5 w-5"
        />
        <label htmlFor="Service" className="text-purple-500 text-sm">Service</label>
      </div>

      {/* Sub-options under Service */}
     
    </div>
    

      </div>
    </div>

    {selectedOptions.includes("Service") && (
        <div className="space-y-6 md:w-[100%] flex flex-col justify-end items-center">
          {/* Sub-service checkboxes */}
          <div className="flex flex-wrap gap-6 my-4 md:w-[40%] w-full">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="oneTime" checked={selectedServices.oneTime} onChange={handleCheckboxChange} />
              <span>OneTime Service</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="mmc" checked={selectedServices.mmc} onChange={handleCheckboxChange} />
              <span>MMC Service</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="amc" checked={selectedServices.amc} onChange={handleCheckboxChange} />
              <span>AMC Service</span>
            </label>
          </div>

          {/* Conditional Sections */}
          {selectedServices.oneTime && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">OneTime Service</h2>
              {renderServiceFields("OneTime", "OneTime Price (Per Service)")}
            </div>
          )}
          {selectedServices.mmc && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">MMC Service</h2>
              {renderServiceFields("MMC", "MMC Price (Per Month)")}
            </div>
          )}
          {selectedServices.amc && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">AMC Service</h2>
              {renderServiceFields("AMC", "AMC Price (Per Year)")}
            </div>
          )}
        </div>
      )}




      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">Long Description</label>
        <textarea
          {...register("longDescription")}
          className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        ></textarea>
      </div>

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">
          Short Description
        </label>
        <input
          {...register("shortDescription")}
          className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <h3 className="subheading my-6 dark:text-gray-200">Specifications</h3>
        <div className="md:w-[70%] w-[100%] gap-4 flex md:flex-row flex-col">
          {fieldOptions.map((option) => (
            <h3
              key={option.key}
              onClick={() => toggleField(option.key)}
              className={`subheading md:my-6 my-2 border  border-gray-300 dark:border-gray-600 px-3 py-1 rounded cursor-pointer ${
                fields.includes(option.key)
                  ? "bg-secondary text-white"
                  : "bg-white dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              {option.label}
            </h3>
          ))}
        </div>
      </div>

      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">Manufacturer</label>
        <input
          {...register("manufacturer")}
          className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {fields.includes("title") && (
        <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
          <label className="text mb-1">Title</label>
          <input
            {...register("title")}
            className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      )}

      {fields.includes("brand") && (
        <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
          <label className="text mb-1 dark:text-gray-200">Brand</label>
          <input
            {...register("brand")}
            className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      )}

      {fields.includes("description") && (
        <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
          <label className="text mb-1 dark:text-gray-200">Description</label>
          <textarea
            {...register("description")}
            className="md:w-[70%] w-[100%] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      )}

      <div className="mb-4">
        <h4 className="font-semibold subheading dark:text-gray-200">
          Product Images
        </h4>
        <p className="text-gray-500 opacity-70 text-sm mt-1 dark:text-gray-200">
          **Image should be below 1 MB and should have dimensions of 500x600 and
          type of .png / .jpeg / .webp**
        </p>
      </div>

      {uploadSections.map((sectionIndex) => (
        <div key={sectionIndex} className="mb-4 relative">
          <div className="flex md:flex-row flex-row justify-between md:w-[70%] w-[100%] items-center gap-10">
            <label className="block text mb-2 font-bold text-black dark:text-white">
              {sectionIndex === 0 ? "Main Image" : `Image ${sectionIndex + 1}`}
            </label>
            <div className="flex flex-col justify-start">
              <FileUpload
                name={`demo-${sectionIndex}[]`}
                key={key} // Force re-render on invalid file selection
                customUpload
                mode="basic"
                chooseOptions={{
                  className:
                    "bg-white border border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 text-secondary ",
                }}
                uploadHandler={() => {}}
                onSelect={(e) => onImageSelect(e, sectionIndex)}
                accept="image/png,image/jpeg,image/webp"
                chooseLabel={fileNames[sectionIndex] || "Choose "}
                multiple={false}
                auto
              />
              {/* {showError == true && (
                <div>
                  <span className="text-red-500 dark:text-red-400 text-sm">
                    Check the image format or size
                  </span>
                </div>
              )} */}
            </div>

            <div className="md:flex hidden justify-center">
              {images[sectionIndex] && (
                <img
                  src={images[sectionIndex]}
                  className="h-20 w-20 border border-gray-300 dark:border-gray-600 rounded-lg"
                  alt="Preview"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeFileUpload(sectionIndex)}
            className="absolute -top-2 md:top-0 -right-2 md:right-0 md:text-black text-white dark:text-white p-1 "
            title="Remove this section"
          >
            <i className="pi pi-times md:mt-3 mt-0 md:bg-transparent bg-secondary  text-sm   md:border border-gray-300 dark:border-gray-700 p-1 md:rounded rounded-full"></i>
          </button>
        </div>
      ))}

      <div className="flex md:justify-end justify-center">
        {images.length < 10 && (
          <button
            type="button"
            onClick={addNewFileUpload}
            className="mt-2 px-2 py-2 rounded-lg bg-secondary text-white font-semibold dark:bg-gray-700 dark:text-gray-100 border dark:border-gray-300"
          >
            <i className="pi pi-plus"></i> Add More
          </button>
        )}
      </div>

      <div className="mt-4 md:grid grid-cols-4 gap-4 hidden ">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
          >
            <img
              src={img}
              alt={`product-${index}`}
              className="w-full h-32 object-cover rounded border border-gray-300 dark:border-gray-700"
            />
            <button
              type="button"
              className="absolute top-1 right-1 text-black dark:text-white p-1"
              onClick={() => onRemoveImage(index)}
            >
              <i className="pi pi-times"></i>
            </button>
          </div>
        ))}
      </div>

      <h3 className="subheading my-6 mt-4 dark:text-gray-200">Inventory</h3>

      {/* SKU */}
      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">SKU</label>
        <input
          {...register("sku")}
          className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Quantity */}
      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">Quantity</label>
        <input
          type="number"
          {...register("quantity")}
          className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Stock Status */}
      <div className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center">
        <label className="text mb-1 dark:text-gray-200">Stock Status</label>
        <select
          {...register("stockStatus")}
          className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="In Stock" className="dark:text-black">
            In Stock
          </option>
          <option value="Out of Stock" className="dark:text-black">
            Out of Stock
          </option>
        </select>
      </div>

      <h3 className="subheading my-6 mt-4 dark:text-gray-200">Prices</h3>

      {[
        "Regular Rent Price",
        "Offer Rent Price",
        "Regular Buy Price",
        "Offer Buy Price",
      ].map((label, index) => (
        <div
          className="mb-3 flex md:flex-row flex-col md:justify-between md:items-center"
          key={index}
        >
          <label className="text mb-1 dark:text-gray-200">{label}</label>
          <input
            type="number"
            {...register(label.replace(/\s+/g, "").toLowerCase())}
            className="md:w-[70%] w-[100%] p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      ))}

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="mt-6 bg-secondary text-white py-2 px-4 my-4 rounded hover:bg-secondary-dark transition"
        >
          Submit Product
        </button>
      </div>
    </form>
  );
}
