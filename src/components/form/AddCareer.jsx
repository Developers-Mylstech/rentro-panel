

// import React, { useState } from 'react';
// import useCareerStore from "../../Context/CareerContext";
// import axios from 'axios';

// function AddCareer() {
//   const { createJobPost } = useCareerStore();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [uploadMessage, setUploadMessage] = useState('');

//   const [formData, setFormData] = useState({
//     heading: '',
//     description: '',
//     notes: '',
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type and size
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     const maxSize = 2 * 1024 * 1024; // 2MB

//     if (!allowedTypes.includes(file.type)) {
//       setUploadMessage('Only JPEG, PNG, and WEBP files are allowed.');
//       return;
//     }

//     if (file.size > maxSize) {
//       setUploadMessage('File size should be less than 2MB.');
//       return;
//     }

//     setSelectedFile(file);
//     setUploadMessage('');
    
//     // Create preview URL
//     const previewUrl = URL.createObjectURL(file);
//     setPreviewUrl(previewUrl);
//     setUploadedImageUrl(''); // Reset previous upload
//   };

//   const handleImageUpload = async () => {
//     if (!selectedFile) {
//       setUploadMessage('Please select an image to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('files', selectedFile);

//     try {
//       setIsSubmitting(true);
//       setUploadMessage('Uploading image...');

//       const response = await axios.post(
//         'https://proud-expression-production-6ebc.up.railway.app/api/v1/product-images/batch-upload?quality=80&fallbackToJpeg=true',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (response.data && response.data.length > 0 && response.data[0].fileUrl) {
//         setUploadedImageUrl(response.data[0].fileUrl);
//         setUploadMessage('Image uploaded successfully!');
//       } else {
//         throw new Error('No file URL returned');
//       }
//     } catch (error) {
//       console.error('Image upload failed:', error);
//       setUploadMessage('Image upload failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!uploadedImageUrl) {
//       setUploadMessage('Please upload an image before submitting.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         jobTitle: formData.heading,
//         jobDescription: formData.description,
//         requirements: formData.notes,
//         isActive: true,
//         image: uploadedImageUrl
//       };

//       await createJobPost(payload);
      
//       // Reset form after successful submission
//       setFormData({
//         heading: '',
//         description: '',
//         notes: '',
//       });
//       setSelectedFile(null);
//       setPreviewUrl('');
//       setUploadedImageUrl('');
//       setUploadMessage('Career post created successfully!');
      
//     } catch (error) {
//       console.error('Error creating job post:', error);
//       setUploadMessage('Failed to create career post. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-gray-900">Career Page Editor</h1>
//           <p className="mt-2 text-sm text-gray-600">Update your career page content and image</p>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Job Title */}
//             <div>
//               <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
//                 Job Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="heading"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleChange}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter job title"
//                 required
//               />
//             </div>

//             {/* Job Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Job Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="5"
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Describe the job responsibilities and expectations..."
//                 required
//               />
//             </div>

//             {/* Requirements */}
//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
//                 Requirements
//               </label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows="3"
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="List the required skills, qualifications, and experience"
//               />
//             </div>

//             {/* Image Upload Section */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Job Post Image <span className="text-red-500">*</span>
//               </label>
              
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <input
//                     id="image-upload"
//                     type="file"
//                     accept="image/jpeg, image/png, image/webp"
//                     onChange={handleFileChange}
//                     className="block w-full text-sm text-gray-500
//                       file:mr-4 file:py-2 file:px-4
//                       file:rounded-md file:border-0
//                       file:text-sm file:font-semibold
//                       file:bg-blue-50 file:text-blue-700
//                       hover:file:bg-blue-100"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">
//                     Recommended: JPEG, PNG, or WEBP (max 2MB)
//                   </p>
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={handleImageUpload}
//                   disabled={!selectedFile || isSubmitting}
//                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
//                 >
//                   {isSubmitting ? 'Uploading...' : 'Upload'}
//                 </button>
//               </div>
              
//               {uploadMessage && (
//                 <p className={`mt-2 text-sm ${
//                   uploadMessage.includes('success') ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {uploadMessage}
//                 </p>
//               )}
//             </div>

//             {/* Image Preview */}
//             {(previewUrl || uploadedImageUrl) && (
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
//                 <div className="border border-gray-200 rounded-md p-2">
//                   <img 
//                     src={uploadedImageUrl || previewUrl} 
//                     alt="Preview" 
//                     className="w-full max-w-lg rounded object-contain max-h-64" 
//                   />
//                 </div>
//                 {uploadedImageUrl && (
//                   <p className="mt-1 text-xs text-green-600">✓ Image uploaded and ready for submission</p>
//                 )}
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4 border-t border-gray-200">
//               <button
//                 type="submit"
//                 disabled={isSubmitting || !uploadedImageUrl}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
//                   isSubmitting || !uploadedImageUrl ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating...
//                   </>
//                 ) : 'Create Job Post'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddCareer;



import React, { useState } from 'react';
import useCareerStore from "../../Context/CareerContext";
import axios from 'axios';

function AddCareer() {
  const { createJobPost } = useCareerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const response = await axios.post(
        'http://demo.rentro.ae:8082/api/v1/product-images/batch-upload?quality=80&fallbackToJpeg=true',
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

    try {
      const payload = {
        jobTitle: formData.heading,
        jobDescription: formData.description,
        requirements: formData.notes,
        isActive: true,
        image: uploadedImageUrl || previewUrl || ""
      };

      await createJobPost(payload);

      setFormData({
        heading: '',
        description: '',
        notes: '',
      });
      setPreviewUrl('');
      setSelectedFile(null);
      setUploadedImageUrl('');
      setUploadMessage('');

      alert('Career post created successfully!');
    } catch (error) {
      console.error('Error creating job post:', error);
      alert('Failed to create career post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">Career Page Editor</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Update your career page content and image
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="heading" className="block text-sm font-medium mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Requirements
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Job Post Image
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Choose File
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleImageUpload}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 underline"
              >
                Upload Image
              </button>
              {uploadMessage && (
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">{uploadMessage}</p>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="border border-gray-200 dark:border-gray-600 rounded-md p-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-w-lg rounded object-contain max-h-64"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting
                    ? 'bg-blue-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Job Post'
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
