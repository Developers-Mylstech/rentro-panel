

// import React, { useState, useEffect } from 'react';
// import useCareerStore from "../../Context/CareerContext";
// import axiosInstance from '../../utils/axiosInstance';
// import { useLocation, useNavigate, } from 'react-router-dom';

// function AddCareer() {
//   const { createJobPost,editJobPost } = useCareerStore(); // Replace or extend with updateJobPost if needed
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [formData, setFormData] = useState({
//     heading: '',
//     description: '',
//     notes: '',
//   });

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Prefill if editing
//   useEffect(() => {
//     const post = location.state?.post;

//     if (post) {
//       setIsEditMode(true);
//       setCurrentPostId(post.jobPostId);
//       setFormData({
//         heading: post.jobTitle || '',
//         description: post.jobDescription || '',
//         notes: post.requirements || '',
//       });

//       if (post.image) {
//         setUploadedImageUrl(post.image);
//         setPreviewUrl(post.image);
//       }
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedFile) {
//       setUploadMessage("Please select an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('files', selectedFile);

//     try {
//       const response = await axiosInstance.post(
//         '/product-images/batch-upload?quality=80&fallbackToJpeg=true',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const uploadedFiles = response.data.map(item => item.fileUrl).filter(Boolean);
//       if (uploadedFiles.length > 0) {
//         setUploadedImageUrl(uploadedFiles[0]);
//         setUploadMessage("Image uploaded successfully.");
//       } else {
//         setUploadMessage("Image upload failed. No file URLs returned.");
//       }
//     } catch (error) {
//       console.error(error);
//       setUploadMessage("Image upload failed.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const payload = {
//       jobTitle: formData.heading,
//       jobDescription: formData.description,
//       requirements: formData.notes,
//       isActive: true,
//       image: uploadedImageUrl || previewUrl || ""
//     };

//     try {
//       if (isEditMode) {
      
//         await editJobPost(payload, currentPostId ); 
//         alert('Career post updated successfully!');
//         navigate(-1)
//       } else {
//         await createJobPost(payload);
//         alert('Career post created successfully!');
//       }

   
//       setFormData({ heading: '', description: '', notes: '' });
//       setPreviewUrl('');
//       setSelectedFile(null);
//       setUploadedImageUrl('');
//       setUploadMessage('');

//       navigate('/dashboard/careers'); // redirect to listing
//     } catch (error) {
//       console.error('Error submitting job post:', error);
//       alert('Failed to submit career post. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold">{isEditMode ? 'Edit Job Post' : 'Create Job Post'}</h1>
//           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//             {isEditMode ? 'Modify your job listing below.' : 'Add a new job opportunity to your career page.'}
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="heading" className="block text-sm font-medium mb-1">
//                 Job Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="heading"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleChange}
//                 required
//                 className="block w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium mb-1">
//                 Job Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="5"
//                 required
//                 className="block w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white  shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium mb-1">
//                 Requirements
//               </label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows="3"
//                 className="block w-full px-4 py-2 border-b  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white  shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Job Post Image
//               </label>
//               <div className="mt-1 flex items-center">
//                 <label
//                   htmlFor="image-upload"
//                   className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border-b border-gray-300 dark:border-gray-600  shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   Choose File
//                 </label>
//                 <input
//                   id="image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="sr-only"
//                 />
//                 <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
//                   {selectedFile ? selectedFile.name : 'No file chosen'}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleImageUpload}
//                 className="mt-2 text-sm text-blue-600 dark:text-blue-400 underline"
//               >
//                 Upload Image
//               </button>
//               {uploadMessage && (
//                 <p className="mt-1 text-xs text-green-600 dark:text-green-400">{uploadMessage}</p>
//               )}
//             </div>

//             {previewUrl && (
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Image Preview:</p>
//                 <div className="border border-gray-200 dark:border-gray-600 rounded-md p-2">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="w-full max-w-lg rounded object-contain max-h-64"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                   isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   isEditMode ? 'Update Job Post' : 'Create Job Post'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddCareer;







// import React, { useState, useEffect, useCallback } from 'react';
// import useCareerStore from "../../Context/CareerContext";
// import axiosInstance from '../../utils/axiosInstance';
// import { useLocation, useNavigate } from 'react-router-dom';

// function AddCareer() {
//   const { createJobPost, editJobPost } = useCareerStore();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentPostId, setCurrentPostId] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [formData, setFormData] = useState({
//     heading: '',
//     description: '',
//     notes: '',
//   });

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Prefill if editing
//   useEffect(() => {
//     const post = location.state?.post;

//     if (post) {
//       setIsEditMode(true);
//       setCurrentPostId(post.jobPostId);
//       setFormData({
//         heading: post.jobTitle || '',
//         description: post.jobDescription || '',
//         notes: post.requirements || '',
//       });

//       if (post.image) {
//         setUploadedImageUrl(post.image);
//         setPreviewUrl(post.image);
//       }
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
    
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       const file = files[0];
//       setSelectedFile(file);
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewUrl(reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedFile) {
//       setUploadMessage("Please select an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('files', selectedFile);

//     try {
//       const response = await axiosInstance.post(
//         '/product-images/batch-upload?quality=80&fallbackToJpeg=true',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const uploadedFiles = response.data.map(item => item.fileUrl).filter(Boolean);
//       if (uploadedFiles.length > 0) {
//         setUploadedImageUrl(uploadedFiles[0]);
//         setUploadMessage("Image uploaded successfully.");
//       } else {
//         setUploadMessage("Image upload failed. No file URLs returned.");
//       }
//     } catch (error) {
//       console.error(error);
//       setUploadMessage("Image upload failed.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const payload = {
//       jobTitle: formData.heading,
//       jobDescription: formData.description,
//       requirements: formData.notes,
//       isActive: true,
//       image: uploadedImageUrl || previewUrl || ""
//     };

//     try {
//       if (isEditMode) {
//         await editJobPost(payload, currentPostId); 
//         alert('Career post updated successfully!');
//         navigate(-1);
//       }
//         await createJobPost(payload);
//         alert('Career post created successfully!');
      

//       setFormData({ heading: '', description: '', notes: '' });
//       setPreviewUrl('');
//       setSelectedFile(null);
//       setUploadedImageUrl('');
//       setUploadMessage('');

//       // navigate('/dashboard/careers');
//     } catch (error) {
//       console.error('Error submitting job post:', error);
//       alert('Failed to submit career post. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-secondary">{isEditMode ? 'Edit Job Post' : 'Create Job Post'}</h1>
//           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//             {isEditMode ? 'Modify your job listing below.' : 'Add a new job opportunity to your career page.'}
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="heading" className="block text-sm font-medium mb-1">
//                 Job Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="heading"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleChange}
//                 required
//                 className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium mb-1">
//                 Job Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 required
//                 className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium mb-1">
//                 Requirements
//               </label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows="2"
//                 className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Job Post Image
//               </label>
//               <div 
//                 className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
//                 onDragEnter={handleDragEnter}
//                 onDragLeave={handleDragLeave}
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//               >
//                 <div className="space-y-1 text-center">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                       strokeWidth={2}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                   <div className="flex text-sm text-gray-600 dark:text-gray-300">
//                     <label
//                       htmlFor="file-upload"
//                       className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none"
//                     >
//                       <span>Upload a file</span>
//                       <input
//                         id="file-upload"
//                         name="file-upload"
//                         type="file"
//                         className="sr-only"
//                         onChange={handleImageChange}
//                         accept="image/*"
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     PNG, JPG, GIF up to 10MB
//                   </p>
//                 </div>
//               </div>
              
//               {uploadMessage && (
//                 <p className={`mt-1 text-xs ${uploadMessage.includes("success") ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                   {uploadMessage}
//                 </p>
//               )}
//               {selectedFile && (
//                 <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                   Selected file: {selectedFile.name}
//                 </p>
//               )}
//             </div>

//             {previewUrl && (
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Image Preview:</p>
//                 <div className="border border-gray-200 dark:border-gray-600 rounded-md p-2">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="w-full max-w-lg rounded object-contain max-h-64"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2">
//             <button
//                 type="button"
//                 onClick={handleImageUpload}
//                 disabled={!selectedFile}
//                 className={`mt-2 py-3 px-4 text-sm ${selectedFile ? 'bg-blue-600 dark:bg-blue-400 ' : 'bg-gray-400 dark:text-bg-500 cursor-not-allowed'} text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500}`}
//               >
//                 Upload Image
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                   isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   isEditMode ? 'Update Job Post' : 'Create Job Post'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   );
// }

// export default AddCareer;













import React, { useState, useEffect, useCallback } from 'react';
import useCareerStore from "../../Context/CareerContext";
import axiosInstance from '../../utils/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';


function AddCareer() {
  const { createJobPost, editJobPost } = useCareerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    notes: '',
  });

  const [focusedFields, setFocusedFields] = useState({
    heading: false,
    description: false,
    notes: false
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Prefill if editing
  useEffect(() => {
    const post = location.state?.post;

    if (post) {
      setIsEditMode(true);
      setCurrentPostId(post.jobPostId);
      setFormData({
        heading: post.jobTitle || '',
        description: post.jobDescription || '',
        notes: post.requirements || '',
      });

      if (post.image) {
        setUploadedImageUrl(post.image);
        setPreviewUrl(post.image);
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleFocus = (field) => {
    setFocusedFields(prev => ({...prev, [field]: true}));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocusedFields(prev => ({...prev, [field]: false}));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const response = await axiosInstance.post(
        '/product-images/batch-upload?quality=80&fallbackToJpeg=true',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedFiles = response.data.map(item => item.fileUrl).filter(Boolean);
      if (uploadedFiles.length > 0) {
        setUploadedImageUrl(uploadedFiles[0]);
        setUploadMessage("Image uploaded successfully.");
      } else {
        setUploadMessage("Image upload failed. No file URLs returned.");
      }
    } catch (error) {
      console.error(error);
      setUploadMessage("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      jobTitle: formData.heading,
      jobDescription: formData.description,
      requirements: formData.notes,
      isActive: true,
      image: uploadedImageUrl || previewUrl || ""
    };

    try {
      if (isEditMode) {
        await editJobPost(payload, currentPostId); 
        alert('Career post updated successfully!');
        navigate(-1);
      }
        await createJobPost(payload);
        alert('Career post created successfully!');
      

      setFormData({ heading: '', description: '', notes: '' });
      setPreviewUrl('');
      setSelectedFile(null);
      setUploadedImageUrl('');
      setUploadMessage('');

      // navigate('/dashboard/careers');
    } catch (error) {
      console.error('Error submitting job post:', error);
      alert('Failed to submit career post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-secondary">{isEditMode ? 'Edit Job Post' : 'Create Job Post'}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isEditMode ? 'Modify your job listing below.' : 'Add a new job opportunity to your career page.'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="relative pt-5">
              <label 
                htmlFor="heading"
                className={`absolute left-0 ${focusedFields.heading || formData.heading ? 
                  '-top-1 text-sm text-gray-500 dark:text-blue-400 transition-all duration-200' : 
                  'top-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200'}`}
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                onFocus={() => handleFocus('heading')}
                onBlur={() => handleBlur('heading')}
                required
                className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>

            {/* Job Description Field */}
            <div className="relative pt-5">
              <label 
                htmlFor="description"
                className={`absolute left-0 ${focusedFields.description || formData.description ? 
                  '-top-1 text-sm text-gray-500 dark:text-blue-400 transition-all duration-200' : 
                  'top-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200'}`}
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => handleFocus('description')}
                onBlur={() => handleBlur('description')}
                rows="3"
                required
                className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>

            {/* Requirements Field */}
            <div className="relative pt-5">
              <label 
                htmlFor="notes"
                className={`absolute left-0 ${focusedFields.notes || formData.notes ? 
                  '-top-1 text-sm text-gray-500 dark:text-blue-400 transition-all duration-200' : 
                  'top-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200'}`}
              >
                Requirements
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                onFocus={() => handleFocus('notes')}
                onBlur={() => handleBlur('notes')}
                rows="2"
                className="block w-full px-0 py-2 border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Job Post Image
              </label>
              <div 
                className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              
              {uploadMessage && (
                <p className={`mt-1 text-xs ${uploadMessage.includes("success") ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {uploadMessage}
                </p>
              )}
              {selectedFile && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="border border-gray-200 dark:border-gray-600 rounded-md p-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className=" max-w-md rounded object-contain max-h-40"
                  />
                </div>
              </div>
            )}

<div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-2">
  <button
    type="button"
    onClick={handleImageUpload}
    disabled={!selectedFile}
    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      selectedFile ? 'bg-blue-600 dark:bg-blue-400 hover:bg-blue-700' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
    }`}
  >
    Upload Image
  </button>

  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {isSubmitting ? (
      <>
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      </>
    ) : (
      isEditMode ? 'Update Job Post' : 'Create Job Post'
    )}
  </button>
</div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCareer;