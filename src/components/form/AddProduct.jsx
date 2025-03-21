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


  // const options = ["Rent", "Sell", "Service"];
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

      const isValidFormat = ["image/jpeg", "image/png", "image/webp"].includes(fileType);
      const isValidSize = fileSize <= 1024 * 1024; // 1MB limit

      if (!isValidFormat) {
        alert("Select a proper format (JPEG, PNG, WEBP).");
        setKey(!key);
        return; // Stop execution
      }

      if (!isValidSize) {
        alert("File size exceeds 1MB. Please select a smaller file.");
        setKey(!key);
        return; // Stop execution
      }

      if (newImages.length >= 10) {
        alert("You can only upload up to 10 images.");
        return;
      }

      const reader = new FileReader();
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
      className="p-4 px-8 w-full mx-auto border rounded-md"
    >
      <h2 className="heading my-10 text-gray-900 dark:text-gray-100">Add New Product</h2>
      <h3 className="subheading my-6 text-gray-800 dark:text-gray-200">Product Information</h3>

      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1 text-gray-800 dark:text-gray-200">Product Name</label>
        <input
          {...register("productName", { required: true })}
          placeholder="Product Name"
          className="w-[70%] p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.productName && (
          <span className="text-red-500 dark:text-red-400">Product Name is required</span>
        )}
      </div>

      {errors.productName && (
        <span className="text-red-500">Product Name is required</span>
      )}

      <div className="mb-3 flex justify-between items-center relative">
        <label className="text mb-1 text-gray-800 dark:text-gray-200">Main Category</label>

        <div
          className="w-[70%] p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory || "Select Category"}
        </div>

        {isOpen && (
          <div className="absolute left-[30%] top-10 w-[70%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 z-10">
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

        <input type="hidden" {...register("mainCategory", { required: true })} />
        {errors.mainCategory && (
          <span className="text-red-500 dark:text-red-400">Category is required</span>
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
            <input
              type="text"
              className="w-full p-2 border-b"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

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
            <input
              type="text"
              className="w-full p-2 border-b"
              placeholder="Search Brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

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
      <div className="flex justify-between items-center w-full  py-2">
        <h3 className="text">Product For</h3>
        <div className="flex   gap-3  w-[70%]  ">
          {options.map((option, index) => (
            <div key={index} className={`flex align-items-center pr-4   md:pl-20  md:pr-20 ${option.label == "Sell" || option.label == 'Rent' ? "border-r-2 border-gray-200" : ""}`}>
              <Checkbox
                inputId={option.label}
                value={option.label}
                onChange={onOptionChange}
                checked={selectedOptions.includes(option.label)}
                className="border   rounded-md h-6 w-6"
              />
              <label htmlFor={option.label} className={`ml-4 ${option.color}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Long Description</label>
        <textarea
          {...register("longDescription")}
          className="w-[70%] p-2 border rounded"
        ></textarea>
      </div>

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
              className={`subheading my-6 border px-3 py-1 rounded cursor-pointer ${fields.includes(option.key) ? "bg-secondary text-white" : ""
                }`}
            >
              {option.label}
            </h3>
          ))}
        </div>
      </div>

      <div className="mb-3 flex justify-between items-center">
        <label className="text mb-1">Manufacturer</label>
        <input
          {...register("manufacturer")}
          className="w-[70%] p-2 border rounded"
        />
      </div>

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
        <p className="text-gray-500 opacity-70 text-sm mt-1">
          **Image should be below 1 MB and should have dimensions of 500x600 and
          type of .png / .jpeg / .webp**
        </p>
      </div>

      {uploadSections.map((sectionIndex) => (
        <div key={sectionIndex} className="mb-4 relative">
          <div className="flex md:flex-row flex-row justify-between w-[80%]  items-center gap-10">
            <label className="block text mb-2 font-bold">
              {sectionIndex === 0 ? "Main Image" : `Image ${sectionIndex + 1}`}
            </label>

            <FileUpload
              name={`demo-${sectionIndex}[]`}
              key={key} // Force re-render on invalid file selection
              customUpload
              mode="basic"
              chooseOptions={{ className: "bg-white border text-secondary" }}
              uploadHandler={() => { }}
              onSelect={(e) => onImageSelect(e, sectionIndex)}
              accept="image/png,image/jpeg,image/webp"
              // maxFileSize={1024 * 1024} // 1MB limit
              chooseLabel={fileNames[sectionIndex] || "Choose a file"}
              multiple={false}
              auto
            />

            <div className="md:flex hidden justify-center">
              {images[sectionIndex] && (
                <img src={images[sectionIndex]} className="h-20 w-20" alt="Preview" />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeFileUpload(sectionIndex)}
            className="absolute top-0 right-0 text-black p-1"
            title="Remove this section"
          >
            <i className="pi pi-times mt-3 border"></i>
          </button>
        </div>
      ))}
      <div className="flex md:justify-end justify-center">
        {images.length < 10 && (
          <button
            type="button"
            onClick={addNewFileUpload}
            className="mt-2 px-2 py-2 rounded-lg bg-secondary text-white font-semibold"
          >
            <i className="pi pi-plus "></i> Add More
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
