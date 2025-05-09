
// // import React, { useState, useEffect } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { FileUpload } from 'primereact/fileupload';
// // import CustomButton from '../../systemdesign/CustomeButton';
// // import { Button } from 'primereact/button';

// // export default function AddBanner() {
// //   const { register, handleSubmit, formState: { errors }, reset } = useForm();
// //   const [previewImages, setPreviewImages] = useState({
// //     mainImage: null,
// //     productImage1: null,
// //     productImage2: null,
// //   });
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const savedPreviews = JSON.parse(localStorage.getItem('bannerPreviewImages'));
// //     if (savedPreviews) {
// //       setPreviewImages(savedPreviews);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem('bannerPreviewImages', JSON.stringify(previewImages));
// //   }, [previewImages]);

// //   const onSubmit = (data) => {
// //     console.log('Form Data:', data);
// //     reset();
// //     localStorage.removeItem('bannerPreviewImages');
// //   };

// //   const onImageSelect = (event, fieldName) => {
// //     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
// //     const maxSize = 1024 * 1024; // 1MB
// //     const file = event.files[0];

// //     if (file) {
// //       if (!allowedTypes.includes(file.type)) {
// //         setError('Please select a valid image file (png, jpeg, jpg, or webp).');
// //         setTimeout(() => setError(''), 5000);
// //         return;
// //       }
// //       if (file.size > maxSize) {
// //         setError('File size should be less than 1MB.');
// //         setTimeout(() => setError(''), 5000);
// //         return;
// //       }
// //       setPreviewImages(prev => ({
// //         ...prev,
// //         [fieldName]: URL.createObjectURL(file)
// //       }));
// //     }
// //   };

// //   const handleDelete = (fieldName) => {
// //     setPreviewImages(prev => ({
// //       ...prev,
// //       [fieldName]: null
// //     }));
// //   };

// //   const uploadOptions = {
// //     icon: 'pi pi-fw pi-cloud-upload',
// //     iconOnly: true,
// //     className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
// //   };

// //   return (
// //     <div className=" h-screen">
// //       <h1 className="heading mb-6 dark:text-white">Add New Banner</h1>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

// //         <div className="p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
// //           <h2 className="subheading py-2 dark:text-gray-200">Offer Information</h2>
// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <label className="text mb-1 dark:text-gray-300">Offer Title</label>
// //               <input
// //                 type="text"
// //                 {...register('offerTitle', { required: 'Offer Title is required' })}
// //                 className="w-[70%] p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-0 focus:outline-none "
// //               />
// //               {errors.offerTitle && <span className="text-red-500">{errors.offerTitle.message}</span>}
// //             </div>
// //           </div>
// //         </div>


// //         {/* Images */}
// //         <div className="p-4 border dark:border-gray-800 rounded-lg shadow-sm">
// //           <h2 className="subheading py-2">Images</h2>

// //           <div className="space-y-4">
// //             <div className="flex  justify-between items-center">
// //               <label className="text dark:text-gray-300">Main Image</label>
// //               <FileUpload
// //                 mode="basic"
// //                 name="mainImage"
// //                 accept="image/png, image/jpeg, image/jpg, image/webp"
// //                 chooseOptions={{
// //                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
// //                 }}
// //                 maxFileSize={1000000}
// //                 uploadOptions={uploadOptions}
// //                 onSelect={(e) => onImageSelect(e, 'mainImage')}
// //                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
// //               />
// //               {previewImages.mainImage && (
// //                 <div className="relative mt-2">
// //                   <img
// //                     src={previewImages.mainImage}
// //                     alt="Main Preview"
// //                     className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
// //                     style={{ maxHeight: '200px' }}
// //                   />
// //                   <Button
// //                     icon="pi pi-times"
// //                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
// //                     onClick={() => handleDelete('mainImage')}
// //                   />
// //                 </div>
// //               )}
// //             </div>


// //             <div className="flex justify-between items-center">
// //               <label className="text dark:text-gray-300">Product Image 1</label>
// //               <FileUpload
// //                 mode="basic"
// //                 name="productImage1"
// //                 accept="image/png, image/jpeg, image/jpg, image/webp"
// //                 chooseOptions={{
// //                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
// //                 }}
// //                 maxFileSize={1000000}
// //                 uploadOptions={uploadOptions}
// //                 onSelect={(e) => onImageSelect(e, 'productImage1')}
// //                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
// //               />
// //               {previewImages.productImage1 && (
// //                 <div className="relative mt-2">
// //                   <img
// //                     src={previewImages.productImage1}
// //                     alt="Product 1 Preview"
// //                     className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
// //                     style={{ maxHeight: '200px' }}
// //                   />
// //                   <Button
// //                     icon="pi pi-times"
// //                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 
// //         dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
// //                     onClick={() => handleDelete('productImage1')}
// //                   />
// //                 </div>
// //               )}
// //             </div>


// //             <div className='flex justify-between items-center'>
// //               <label className="text">Product Image 2</label>
// //               <FileUpload
// //                 mode="basic"
// //                 name="productImage2"
// //                 accept="image/png, image/jpeg, image/jpg, image/webp"
// //                 maxFileSize={1000000}
// //                 chooseOptions={{
// //                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
// //                 }}
// //                 uploadOptions={uploadOptions}
// //                 onSelect={(e) => onImageSelect(e, 'productImage2')}
// //               />
// //               {previewImages.productImage2 && (
// //                 <div className="relative mt-2">
// //                   <img
// //                     src={previewImages.productImage2}
// //                     alt="Product 2 Preview"
// //                     className="w-full h-auto rounded-lg shadow-lg object-cover"
// //                     style={{ maxHeight: '200px' }}
// //                   />
// //                   <Button
// //                     icon="pi pi-times"
// //                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2"
// //                     onClick={() => handleDelete('productImage2')}
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <div className="flex justify-center items-center w-full">
// //           <CustomButton title="Submit" icon={'pi pi-save'} />
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }





// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FileUpload } from 'primereact/fileupload';
// import { FloatLabel } from 'primereact/floatlabel';
// import { InputText } from 'primereact/inputtext';
// import CustomButton from '../../systemdesign/CustomeButton';
// import { Button } from 'primereact/button';

// export default function AddBanner() {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [previewImages, setPreviewImages] = useState({
//     mainImage: null,
//     productImage1: null,
//     productImage2: null,
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const savedPreviews = JSON.parse(localStorage.getItem('bannerPreviewImages'));
//     if (savedPreviews) {
//       setPreviewImages(savedPreviews);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('bannerPreviewImages', JSON.stringify(previewImages));
//   }, [previewImages]);

//   const onSubmit = (data) => {
//     reset();
//     localStorage.removeItem('bannerPreviewImages');
//   };

//   const onImageSelect = (event, fieldName) => {
//     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
//     const maxSize = 1024 * 1024; // 1MB
//     const file = event.files[0];

//     if (file) {
//       if (!allowedTypes.includes(file.type)) {
//         setError('Please select a valid image file (png, jpeg, jpg, or webp).');
//         setTimeout(() => setError(''), 5000);
//         return;
//       }
//       if (file.size > maxSize) {
//         setError('File size should be less than 1MB.');
//         setTimeout(() => setError(''), 5000);
//         return;
//       }
//       setPreviewImages(prev => ({
//         ...prev,
//         [fieldName]: URL.createObjectURL(file)
//       }));
//     }
//   };

//   const handleDelete = (fieldName) => {
//     setPreviewImages(prev => ({
//       ...prev,
//       [fieldName]: null
//     }));
//   };

//   const uploadOptions = {
//     icon: 'pi pi-fw pi-cloud-upload',
//     iconOnly: true,
//     className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
//   };

//   return (
//     <div className="h-screen">
//       <h1 className="heading mb-6 dark:text-white">Add New Banner</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//         <div className="p-4 border rounded-lg  shadow-sm dark:bg-gray-800 dark:border-gray-700">
//           <h2 className="subheading py-2 dark:text-gray-200 mb-10 ">Offer Information</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center w-full">
//               <FloatLabel>
//                 <InputText
//                   id="offerTitle"
//                   {...register('offerTitle', { required: 'Offer Title is required' })}
//                   className={`w-[100%] p-2 peer border-0 border-b-2 border-gray-200 dark:bg-gray-700 dark:text-gray-200 focus:border-b-blue-500 focus:ring-0 focus:outline-none ${
//                     errors.offerTitle ? 'border-b-red-500' : ''
//                   }`}
//                 />
//                 <label 
//                   htmlFor="offerTitle" 
//                   className={`dark:text-gray-300 peer-focus:text-blue-500 ${
//                     errors.offerTitle ? 'text-red-500' : 'text-gray-700'
//                   }`}
//                 >
//                   Offer Title
//                 </label>
//               </FloatLabel>
//               {errors.offerTitle && <span className="text-red-500">{errors.offerTitle.message}</span>}
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="p-4 border dark:border-gray-800 rounded-lg shadow-sm">
//           <h2 className="subheading py-2">Images</h2>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <label className="text dark:text-gray-300">Main Image</label>
//               <FileUpload
//                 mode="basic"
//                 name="mainImage"
//                 accept="image/png, image/jpeg, image/jpg, image/webp"
//                 chooseOptions={{
//                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
//                 }}
//                 maxFileSize={1000000}
//                 uploadOptions={uploadOptions}
//                 onSelect={(e) => onImageSelect(e, 'mainImage')}
//                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               />
//               {previewImages.mainImage && (
//                 <div className="relative mt-2">
//                   <img
//                     src={previewImages.mainImage}
//                     alt="Main Preview"
//                     className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
//                     style={{ maxHeight: '200px' }}
//                   />
//                   <Button
//                     icon="pi pi-times"
//                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
//                     onClick={() => handleDelete('mainImage')}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-between items-center">
//               <label className="text dark:text-gray-300">Product Image 1</label>
//               <FileUpload
//                 mode="basic"
//                 name="productImage1"
//                 accept="image/png, image/jpeg, image/jpg, image/webp"
//                 chooseOptions={{
//                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
//                 }}
//                 maxFileSize={1000000}
//                 uploadOptions={uploadOptions}
//                 onSelect={(e) => onImageSelect(e, 'productImage1')}
//                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               />
//               {previewImages.productImage1 && (
//                 <div className="relative mt-2">
//                   <img
//                     src={previewImages.productImage1}
//                     alt="Product 1 Preview"
//                     className="w-full h-auto rounded-lg shadow-lg dark:shadow-gray-900 object-cover"
//                     style={{ maxHeight: '200px' }}
//                   />
//                   <Button
//                     icon="pi pi-times"
//                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2 
//                     dark:bg-red-700 dark:border-red-600 dark:hover:bg-red-800"
//                     onClick={() => handleDelete('productImage1')}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className='flex justify-between items-center'>
//               <label className="text">Product Image 2</label>
//               <FileUpload
//                 mode="basic"
//                 name="productImage2"
//                 accept="image/png, image/jpeg, image/jpg, image/webp"
//                 maxFileSize={1000000}
//                 chooseOptions={{
//                   className: "bg-primary border-2 border-secondary text-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-300",
//                 }}
//                 uploadOptions={uploadOptions}
//                 onSelect={(e) => onImageSelect(e, 'productImage2')}
//               />
//               {previewImages.productImage2 && (
//                 <div className="relative mt-2">
//                   <img
//                     src={previewImages.productImage2}
//                     alt="Product 2 Preview"
//                     className="w-full h-auto rounded-lg shadow-lg object-cover"
//                     style={{ maxHeight: '200px' }}
//                   />
//                   <Button
//                     icon="pi pi-times"
//                     className="p-button-rounded p-button-danger p-button-sm absolute top-2 right-2"
//                     onClick={() => handleDelete('productImage2')}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center items-center w-full">
//           <CustomButton title="Submit" icon={'pi pi-save'} />
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import useBannerStore from "../../Context/BannerContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import axiosInstance from "../../utils/axiosInstance";

export default function AddBannerWithImageUploader() {
  const { addBanner, updateBanner } = useBannerStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBannerId, setCurrentBannerId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({ defaultValues: { title: "" } });

  useEffect(() => {
    const banner = location.state?.banner;
    if (banner) {
      setIsEditMode(true);
      setCurrentBannerId(banner.bannerId);
      setValue("title", banner.title); // ✅ use title instead of name
      if (banner.imageUrl) {
        setUploadedUrl(banner.imageUrl); // ✅ use imageUrl instead of images
        setPreviewUrl(banner.imageUrl);
      }
    }
  }, [location.state, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage("");
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setMessage("Uploading image...");
      const response = await axiosInstance.post(
        "/images/upload?quality=80&fallbackToJpeg=true",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data?.fileUrl;
      if (imageUrl) {
        setUploadedUrl(imageUrl);
        setMessage("Image uploaded successfully");
        setSelectedFile(null);
      } else {
        setMessage("Upload succeeded but no URL returned");
      }
    } catch (error) {
      console.error(error);
      setMessage("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedUrl && !isEditMode) {
      setMessage("Please upload an image before submitting");
      return;
    }

    const payload = {
      title: data.title,
      imageUrl: uploadedUrl,
    };

    try {
      if (isEditMode) {
        await updateBanner(currentBannerId, payload);
        setMessage("Banner updated successfully!");
        navigate(-1);
      } else {
        await addBanner(payload);
        setMessage("Banner created successfully!");
        reset();
        setUploadedUrl("");
        setPreviewUrl("");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Failed to ${isEditMode ? "update" : "create"} banner.`);
    }
  };

  const handleRemoveImage = () => {
    setUploadedUrl("");
    setPreviewUrl("");
    setSelectedFile(null);
    setMessage("");
  };
  const nameValue = watch("title", "");
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4 dark:bg-gray-900 dark:text-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white rounded-xl overflow-hidden border border-gray-300 transition-all hover:shadow-md dark:bg-gray-900 dark:text-gray-100"
      >
        <div className="bg-indigo-50 p-6 border-b border-gray-100 dark:bg-gray-900 dark:text-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-light">
                {isEditMode ? "Edit Banner" : "Add New Banner"}
              </h2>
              <p className="text-sm text-gray-500">Banner title and image</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <FloatLabel>
              <InputText
                id="title"
                value={nameValue}
                className="w-full px-3 py-2 border-b dark:bg-gray-800 focus:border-blue-500"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                })}
              />
              <label htmlFor="title">Banner Title</label>
            </FloatLabel>
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">Banner Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.9A5 5 0 1116 6a5 5 0 011 9.9M15 13l-3-3-3 3m3-3v12" />
                </svg>
                <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
              </div>
              <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
            </label>

            {previewUrl && (
              <div className="relative group w-48 h-48 mx-auto">
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover rounded shadow" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs shadow hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>

            {message && <p className="text-sm text-center mt-2">{message}</p>}
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow"
          >
            {isEditMode ? "Update Banner" : "Create Banner"}
          </button>
        </div>
      </form>
    </div>
  );
}
