import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fileUploadRef = useRef();
  const [key, setKey] = useState(0);

  // State to store form data
  const [formData, setFormData] = useState(null);

  // Handle form submission
  const onSubmit = (data) => {
    // Store form data in state
    setFormData(data);
  };

  const handleImageSelect = (event) => {
    const file = event.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          alert('Image dimensions must be 500x500 pixels.');
          setKey((prevKey) => prevKey + 1);
        }
      };
    }
  };

  return (
    <div className="dark:bg-gray-900 h-screen dark:text-gray-200 md:p-6 p-2 rounded ">
      <h1 className="heading mb-6 dark:text-gray-200">Add New Category</h1>

      <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md mb-6">
        <h2 className="subheading mb-4">Category Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full">
              <label className="w-full md:w-2/12 text-left text mb-2 dark:text-gray-300">
                Main Category
              </label>
              <div className="w-full md:w-10/12">
                <InputText
                  {...register("mainCategory", { required: "Main Category is required" })}
                  placeholder="Main Category"
                  className="w-full text p-3 bg-gray-100 dark:bg-gray-700 border-none rounded-lg dark:text-white"
                />
                {errors.mainCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.mainCategory.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start w-full">
              <label className="w-full md:w-2/12 text-left text mb-2 dark:text-gray-300">
                Sub Category
              </label>
              <div className="w-full md:w-10/12">
                <InputText
                  {...register("subcategory")}
                  placeholder="Sub Category"
                  className="w-full text p-3 bg-gray-100 dark:bg-gray-700 border-none rounded-lg dark:text-white"
                />
                {errors.subcategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button label="Submit" icon="pi pi-save" type="submit" className="p-button-primary" />
          </div>
        </form>
      </div>

      {/* <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
        <h2 className="subheading mb-4">Category Image</h2>

        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2">
          <label className="w-full md:w-2/12 text mb-2 dark:text-gray-300">
            Main Category Image
          </label>
          <div className="w-full md:w-10/12">
            <FileUpload
              mode="basic"
              key={key}
              ref={fileUploadRef}
              name="categoryImage"
              chooseOptions={{
                className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300 dark:border-gray-300",
              }}
              url="/api/upload"
              className="md:w-[70%] w-full  dark:text-white"
              chooseLabel="Choose File"
              accept="image/*"
              {...register("categoryImage", { required: "Image is required" })}
              customUpload
              onSelect={handleImageSelect}
            />
            {errors.categoryImage && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryImage.message}</p>
            )}
          </div>
        </div>
      </div> */}

      {/* Display Form Data */}
      {formData && (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md mt-6">
          <h2 className="subheading mb-4">Form Data</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
