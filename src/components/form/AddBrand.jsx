// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { useForm } from 'react-hook-form';
// import useBrandStore from '../../Context/BrandContext';
// import useImageUploadStore from '../../Context/ImageUploadContext';

// export default function AddBrand() {
//   const navigate = useNavigate();
//   const { addBrand, addBrandImage } = useBrandStore();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
// const { uploadFiles} = useImageUploadStore()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: '',
//     },
//   });

//   const validateFile = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     const maxSize = 1 * 1024 * 1024; // 1 MB

//     if (!allowedTypes.includes(file.type)) {
//       return 'Only JPEG, PNG, and WEBP files are allowed.';
//     }
//     if (file.size > maxSize) {
//       return 'File size should be less than 1 MB.';
//     }
//     return true;
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validationResult = validateFile(file);
//     if (validationResult !== true) {
//       alert(validationResult);
//       return;
//     }

//     setSelectedFile(file);
    
//     // Create preview URL
//     const previewUrl = URL.createObjectURL(file);
//     setImagePreview(previewUrl);
//   };

//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = '';
//       // console.log(se)
//       if (selectedFile) {
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         console.log(formData,'oo')
//         const uploadResponse = await uploadFiles(formData);
//         if (!uploadResponse || !uploadResponse.url) {
//           throw new Error('Image upload failed');
//         }
//         imageUrl = uploadResponse.url;
//       }

//       const payload = {
//         name: data.name,
//         image: imageUrl,
//       };

//       // Call your API to add the brand
//       await addBrand(payload);
      
//       alert('Brand added successfully!');
//       navigate('/brands');
//     } catch (error) {
//       console.error('Error adding brand:', error);
//       alert('Failed to add brand: ' + error.message);
//     } finally {
//       // Clean up the object URL
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="h-screen">
//       <h3 className="heading mb-6 text-gray-900 dark:text-white">Add New Brand</h3>

//       <div className="border p-6 rounded-lg shadow bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-6">
//         <h4 className="font-semibold mb-4">Brand Information</h4>

//         <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
//           <label className="block text-gray-600 dark:text-gray-300 mb-2">Brand Name</label>
//           <InputText
//             className="w-[70%] p-2 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//             placeholder="Enter Brand Name"
//             {...register('name', {
//               required: 'Brand Name is required',
//             })}
//           />
//           {errors.name && (
//             <p className="mt-2 text-sm text-red-600 dark:text-red-400">
//               {errors.name.message}
//             </p>
//           )}
//         </div>

//         <h4 className="font-semibold mb-4">Brand Image</h4>
//         <div className="flex flex-col md:flex-row justify-between md:items-center">
//           <div className="mb-4">
//             <h4 className="font-semibold subheading">Brand Image</h4>
//             <p className="text-yellow-500 dark:text-gray-400 opacity-70 text-sm mt-1">
//               **Image should be below 1 MB and should have dimensions of 500x600 and type of .png / .jpeg / .webp**
//             </p>
//           </div>

//           <div className="flex flex-col items-end">
//             <div className="flex flex-col gap-4">
//               <input 
//                 type="file" 
//                 onChange={handleFileChange}
//                 accept="image/jpeg, image/png, image/webp"
//                 className="block w-full text-sm text-gray-500
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-primary file:text-white
//                   hover:file:bg-primary-dark"
//               />
              
//               {imagePreview && (
//                 <div className="mt-4">
//                   <img 
//                     src={imagePreview} 
//                     alt="Brand preview" 
//                     className="h-20 w-20 object-cover rounded"
//                   />
//                   <p className="text-sm mt-1">{selectedFile?.name}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex justify-center items-center">
//         <button
//           type="submit"
//           className="px-4 py-2 bg-primary rounded dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import useBrandStore from '../../Context/BrandContext';
import axiosInstance from '../../utils/axiosInstance';

export default function AddBrandWithImageUploader() {
    const { addBrand } = useBrandStore();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadedUrl, setUploadedUrl] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
        },
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(previews);
        setMessage("");
        setUploadedUrl([]); // Reset previous uploads
    };

    const handleImageUpload = async () => {
        if (!selectedFiles.length) {
            setMessage("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            setUploading(true);
            setMessage("");

            const response = await axiosInstance.post(
                'product-images/batch-upload?quality=80&fallbackToJpeg=true',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const uploadedFiles = response.data.map(item => item.fileUrl).filter(Boolean);

            if (uploadedFiles.length > 0) {
                setUploadedUrl(uploadedFiles);
                setMessage("Image uploaded successfully.");
            } else {
                setMessage("Image upload failed. No file URLs returned.");
            }

        } catch (error) {
            console.error(error);
            setMessage("Image upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!uploadedUrl.length) {
            setMessage("Please upload an image before submitting.");
            return;
        }
        const payload ={
         
          name: data.name,
          imageUrls: uploadedUrl
        };
        console.log(uploadedUrl)

        try {
            await addBrand(payload);
            setMessage("Brand added successfully!");
            setSelectedFiles([]);
            setPreviewUrls([]);
            setUploadedUrl([]);
            setValue('name', '');
        } catch (error) {
            console.error(error);
            setMessage("Failed to submit brand.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>

            {/* Brand Name */}
            <div>
                <label className="block font-medium mb-1">Brand Name</label>
                <InputText
                    className="w-full p-2 border rounded bg-gray-50"
                    placeholder="Enter Brand Name"
                    {...register('name', {
                        required: 'Brand Name is required',
                    })}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            {/* Image Upload */}
            <div>
                <label className="block font-medium mb-1">Brand Image</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                />
            </div>

            {/* Previews */}
            {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {previewUrls.map((src, idx) => (
                        <div key={idx} className="relative">
                            <img
                                src={src}
                                alt={`preview-${idx}`}
                                className="w-full h-28 object-cover rounded border"
                            />
                            {idx === 0 && (
                                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                                    Main
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading || !selectedFiles.length}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
                {uploading ? 'Uploading Image...' : 'Upload Image'}
            </button>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Submit Brand
            </button>

            {/* Feedback */}
            {message && (
                <p className={`text-center text-sm ${message.includes("failed") ? 'text-red-500' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </form>
    );
}
