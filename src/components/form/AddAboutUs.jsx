// // // src/components/forms/AddAboutUs.jsx
// // import React, { useState, useEffect } from "react";
// // import { useForm } from "react-hook-form";
// // import axiosInstance from "../../utils/axiosInstance";
// // import  useAboutUsStore  from "../../Context/AboutUsContext";
// // import { useNavigate, useLocation } from "react-router-dom";

// // export default function AddAboutUs() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const isEdit = !!location.state?.aboutData;
// //   const existing = location.state?.aboutData || {};

// //   const { register, handleSubmit, reset, setValue } = useForm({
// //     defaultValues: {
// //       title: existing.title || "",
// //       subtitle: existing.subtitle || "",
// //       description: existing.description || "",
// //     },
// //   });

// //   // local UI state
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(existing.imageUrl || "");
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadedData, setUploadedData] = useState({
// //     imageUrl: existing.imageUrl || "",
// //     imageId: existing.imageId || null,
// //   });
//   // const [uploadedImage, setUploadedImage] = useState(null)
//   // const [uploadedImageId, setUploadedImageId] = useState(null)



// //   const {createAboutUs, updateAboutUs} = useAboutUsStore()

// //   // on mount, if edit mode populate form
// //   useEffect(() => {
// //     if (isEdit) {
// //       setValue("title", existing.title);
// //       setValue("subtitle", existing.subtitle);
// //       setValue("description", existing.description);
// //     }
// //   }, [isEdit, existing, setValue]);

// //   // when user selects a new file
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     setSelectedFile(file);
// //     setPreviewUrl(URL.createObjectURL(file));
// //     // clear previous uploadedData so user must re-upload
// //     setUploadedData({ imageUrl: "", imageId: null });
// //   };

// //   // upload helper
// //   const uploadImage = async () => {
// //     if (!selectedFile) return null;
// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append("file", selectedFile);

// //     try {
// //       const resp = await axiosInstance.post(
// //         "/image-entities/upload?quality=80&fallbackToJpeg=true", 
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );
// //       // assume resp.data = { imageUrl: "...", imageId: 12345 }
//       // setUploadedImage(resp.data.image.imageUrl)
//       // setUploadedImageId(resp.data.image.imageId)
// //       console.log(uploadedImage,'gg')
// //       console.log(uploadedImageId,"hhh")
// //       return resp.data;
// //     } catch (err) {
// //       console.error("Image upload failed:", err);
// //       alert("Image upload failed. Please try again.");
// //       return null;
// //     } finally {
// //       setUploading(false);
// //     }
// //   };


// //   // when user clicks Upload Image button
// //   const handleUploadClick = async () => {
// //     const result = await uploadImage();
// //     if (result) {
// //       setUploadedData(result);
// //       setSelectedFile(null);
// //     }
// //   };

// //   // final form submit
// //   const onSubmit = async (data) => {
// //     try {
// //       // if user never clicked upload but selected file, upload now
// //       let imgData = uploadedData;
// //       if (selectedFile && !uploadedData.imageUrl) {
// //         const result = await uploadImage();
// //         if (result) imgData = result;
// //         else return; // abort if upload failed
// //       }

// //       const payload = {
// //         title:       data.title,
// //         subtitle:    data.subtitle,
// //         description: data.description,
// //         imageUrl:    uploadedImage,
// //         imageId:     uploadedImageId,
// //       };

// //       if (isEdit) {
// //         await updateAboutUs(existing.aboutUsId, payload);
// //       } else {
// //         await createAboutUs(payload);
// //       }

// //       navigate("/about-us/listing");
// //     } catch (err) {
// //       console.error("Submit failed:", err);
// //       alert("Failed to save. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
// //       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
// //         {isEdit ? "Edit" : "Add"} About Us
// //       </h2>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
// //         <div>
// //           <label className="block mb-1">Title</label>
// //           <input
// //             {...register("title", { required: true })}
// //             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1">Subtitle</label>
// //           <input
// //             {...register("subtitle")}
// //             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1">Description</label>
// //           <textarea
// //             {...register("description")}
// //             rows={4}
// //             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1">Image</label>
// //           <input type="file" accept="image/*" onChange={handleFileChange} />
// //         </div>

// //         {/* Preview */}
// //         {previewUrl && (
// //           <div className="mt-3">
// //             <img
// //               src={previewUrl}
// //               alt="Preview"
// //               className="h-32 w-32 object-cover rounded-md border"
// //             />
// //           </div>
// //         )}

// //         {/* Upload button if a new file is selected and not yet uploaded */}
// //         {selectedFile && !uploading && !uploadedData.imageUrl && (
// //           <button
// //             type="button"
// //             onClick={handleUploadClick}
// //             className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
// //           >
// //             Upload Image
// //           </button>
// //         )}
// //         {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

// //         <button
// //           type="submit"
// //           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
// //         >
// //           {isEdit ? "Update About Us" : "Create About Us"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// // src/components/forms/AddAboutUs.jsx
// // src/components/forms/AddAboutUs.jsx


// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosInstance from "../../utils/axiosInstance";
// import useAboutUsStore from "../../Context/AboutUsContext";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function AddAboutUs() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isEdit = !!location.state?.about;
//   const existing = location.state?.about || {};

//   const { register, handleSubmit, setValue } = useForm({
//     defaultValues: {
//       title:       existing.title || "",
//       subtitle:    existing.subtitle || "",
//       description: existing.description || "",
//     },
//   });

//   // Single source of truth for the image
//   const [uploadedData, setUploadedData] = useState({
//     imageUrl: existing.imageUrl || "",
//     imageId:  existing.imageId  || null,
//   });

//   // For immediate preview (either blob or uploaded URL)
//   const [previewUrl, setPreviewUrl] = useState(uploadedData.imageUrl);

//   // Raw file selected by the user
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading]     = useState(false);

//   const createAboutUs = useAboutUsStore((s) => s.addAboutUs);
//   const updateAboutUs = useAboutUsStore((s) => s.updateAboutUs);

//   // Populate form fields in edit mode
//   useEffect(() => {
//     if (isEdit) {
//       setValue("title",       existing.title);
//       setValue("subtitle",    existing.subtitle);
//       setValue("description", existing.description);
//     }
//   }, [isEdit, existing, setValue]);

//   // When a new file is picked
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//     // Clear out the old uploadedData so user must re-upload
//     setUploadedData({ imageUrl: "", imageId: null });
//   };

//   // Does the actual upload
//   const uploadImage = async () => {
//     if (!selectedFile) return null;
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const resp = await axiosInstance.post(
//         "/image-entities/upload?quality=80&fallbackToJpeg=true",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       // assume resp.data.image = { imageUrl, imageId }
//       const img = resp.data.image;
//       // commit both the preview and the upload info
//       setUploadedData(img);
//       setPreviewUrl(img.imageUrl);
//       setSelectedFile(null);
//       return img;
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Image upload failed. Please try again.");
//       return null;
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Final submit: ensure any un‐uploaded file is uploaded first
//   const onSubmit = async (data) => {
//     try {
//       if (selectedFile && !uploadedData.imageUrl) {
//         const img = await uploadImage();
//         if (!img) return; // abort if upload failed
//       }

//       const payload = {
//         title:       data.title,
//         subtitle:    data.subtitle,
//         description: data.description,
//         imageUrl:    uploadedData.imageUrl,
//         imageId:     uploadedData.imageId,
//       };

//       if (isEdit) {
//         await updateAboutUs(existing.aboutUsId, payload);
//       } else {
//         await createAboutUs(payload);
//       }

//       navigate("/about-us/listing");
//     } catch (err) {
//       console.error("Submit failed:", err);
//       alert("Failed to save. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
//         {isEdit ? "Edit" : "Add"} About Us
//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         {/* Title */}
//         <div>
//           <label className="block mb-1">Title</label>
//           <input
//             {...register("title", { required: true })}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Subtitle */}
//         <div>
//           <label className="block mb-1">Subtitle</label>
//           <input
//             {...register("subtitle")}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1">Description</label>
//           <textarea
//             {...register("description")}
//             rows={4}
//             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         {/* File chooser */}
//         <div>
//           <label className="block mb-1">Image</label>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         {/* Preview */}
//         {previewUrl && (
//           <div className="mt-3">
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="h-32 w-32 object-cover rounded-md border"
//             />
//           </div>
//         )}

//         {/* Upload button */}
//         {selectedFile && !uploading && !uploadedData.imageUrl && (
//           <button
//             type="button"
//             onClick={uploadImage}
//             className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
//           >
//             Upload Image
//           </button>
//         )}
//         {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//         >
//           {isEdit ? "Update About Us" : "Create About Us"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import useAboutUsStore from "../../Context/AboutUsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit2, FiTrash2, FiUpload, FiX } from "react-icons/fi";

export default function AddAboutUs() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = !!location.state?.about;
  const existing = location.state?.about || {};
  const fileInputRef = useRef(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: existing.title || "",
      subtitle: existing.subtitle || "",
      description: existing.description || "",
    },
  });

  const [uploadedData, setUploadedData] = useState({
    imageUrl: existing.imageUrl || "",
    imageId: existing.imageId || null,
  });

  const [previewUrl, setPreviewUrl] = useState(uploadedData.imageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const { createAboutUs, updateAboutUs } = useAboutUsStore();

  useEffect(() => {
    if (isEdit) {
      setValue("title", existing.title);
      setValue("subtitle", existing.subtitle);
      setValue("description", existing.description);
    }
  }, [isEdit, existing, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedData({ imageUrl: "", imageId: null });
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const resp = await axiosInstance.post(
        "/image-entities/upload?quality=80&fallbackToJpeg=true",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const img = resp.data.image;
      setUploadedData(img);
      setPreviewUrl(img.imageUrl);
      setSelectedFile(null);
      return img;
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    setSelectedFile(null);
    setUploadedData({ imageUrl: "", imageId: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data) => {
    try {
      if (selectedFile && !uploadedData.imageUrl) {
        const img = await uploadImage();
        if (!img) return;
      }

      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: uploadedData.imageUrl,
        imageId: uploadedData.imageId,
      };

      if (isEdit) {
        await updateAboutUs(existing.aboutUsId, payload);
      } else {
        await createAboutUs(payload);
      }

      navigate("/about-us/listing");
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {isEdit ? "Edit" : "Add"} About Us
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Subtitle
          </label>
          <input
            {...register("subtitle")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Image
          </label>
          
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG (Max 5MB)
                </p>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Preview and Image Actions */}
        {(previewUrl || uploadedData.imageUrl) && (
          <div className="relative mt-4">
            <div 
              className="relative inline-block"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
            >
              <img
                src={previewUrl || uploadedData.imageUrl}
                alt="Preview"
                className="h-48 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              
              {(isHoveringImage || uploading) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleEditImage}
                    className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-200 transition"
                    title="Change image"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 bg-white text-red-500 rounded-full hover:bg-red-100 transition"
                    title="Remove image"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <div className="text-white">Uploading...</div>
              </div>
            )}
          </div>
        )}

        {/* Upload button for selected but not uploaded files */}
        {selectedFile && !uploading && !uploadedData.imageUrl && (
          <button
            type="button"
            onClick={uploadImage}
            className="flex items-center justify-center gap-2 mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <FiUpload className="w-5 h-5" />
            Upload Image
          </button>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-md"
          >
            {isEdit ? "Update About Us" : "Create About Us"}
          </button>
        </div>
      </form>
    </div>
  );
}