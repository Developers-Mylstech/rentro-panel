
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import CustomButton from '../../systemdesign/CustomeButton';
import { Button } from 'primereact/button';

export default function AddBanner() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [previewImages, setPreviewImages] = useState({
    mainImage: null,
    productImage1: null,
    productImage2: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPreviews = JSON.parse(localStorage.getItem('bannerPreviewImages'));
    if (savedPreviews) {
      setPreviewImages(savedPreviews);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bannerPreviewImages', JSON.stringify(previewImages));
  }, [previewImages]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
    localStorage.removeItem('bannerPreviewImages');
  };

  const onImageSelect = (event, fieldName) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 1024 * 1024; // 1MB
    const file = event.files[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (png, jpeg, jpg, or webp).');
        setTimeout(() => setError(''), 5000);
        return;
      }
      if (file.size > maxSize) {
        setError('File size should be less than 1MB.');
        setTimeout(() => setError(''), 5000);
        return;
      }
      setPreviewImages(prev => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file)
      }));
    }
  };

  const handleDelete = (fieldName) => {
    setPreviewImages(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
  };

  return (
    <div className="">
      <h1 className="heading mb-6 dark:text-white">Add New Banner</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="subheading py-2 dark:text-gray-200">Offer Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text mb-1 dark:text-gray-300">Offer Title</label>
              <input
                type="text"
                {...register('offerTitle', { required: 'Offer Title is required' })}
                className="w-[70%] p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-0 focus:outline-none"
              />
              {errors.offerTitle && <span className="text-red-500">{errors.offerTitle.message}</span>}
            </div>
          </div>
        </div>


        {/* Images */}
        <div className="p-4 border dark:border-gray-800 rounded-lg shadow-sm">
          <h2 className="subheading py-2">Images</h2>

          <div className="space-y-4">
            <div className="flex  justify-between items-center">
              <label className="text dark:text-gray-300">Main Image</label>
              <FileUpload
                mode="basic"
                name="mainImage"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                chooseOptions={{
                  className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
                }}
                maxFileSize={1000000}
                uploadOptions={uploadOptions}
                onSelect={(e) => onImageSelect(e, 'mainImage')}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {previewImages.mainImage && (
                <div className="relative mt-2">
                  <img
                    src={previewImages.mainImage}
                    alt="Main Preview"
                    className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
                    style={{ maxHeight: '200px' }}
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
                    onClick={() => handleDelete('mainImage')}
                  />
                </div>
              )}
            </div>


            <div className="flex justify-between items-center">
              <label className="text dark:text-gray-300">Product Image 1</label>
              <FileUpload
                mode="basic"
                name="productImage1"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                chooseOptions={{
                  className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
                }}
                maxFileSize={1000000}
                uploadOptions={uploadOptions}
                onSelect={(e) => onImageSelect(e, 'productImage1')}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {previewImages.productImage1 && (
                <div className="relative mt-2">
                  <img
                    src={previewImages.productImage1}
                    alt="Product 1 Preview"
                    className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
                    style={{ maxHeight: '200px' }}
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 
        dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
                    onClick={() => handleDelete('productImage1')}
                  />
                </div>
              )}
            </div>


            <div className='flex justify-between items-center'>
              <label className="text">Product Image 2</label>
              <FileUpload
                mode="basic"
                name="productImage2"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                maxFileSize={1000000}
                chooseOptions={{
                  className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
                }}
                uploadOptions={uploadOptions}
                onSelect={(e) => onImageSelect(e, 'productImage2')}
              />
              {previewImages.productImage2 && (
                <div className="relative mt-2">
                  <img
                    src={previewImages.productImage2}
                    alt="Product 2 Preview"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                    style={{ maxHeight: '200px' }}
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2"
                    onClick={() => handleDelete('productImage2')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center w-full">
          <CustomButton title="Submit" icon={'pi pi-save'} />
        </div>
      </form>
    </div>
  );
}
