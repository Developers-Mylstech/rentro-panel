

import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import useBrandStore from '../../Context/BrandContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import axiosInstance from '../../utils/axiosInstance';
        

export default function AddBrandWithImageUploader() {
    const { addBrand, editBrand } = useBrandStore();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadedUrl, setUploadedUrl] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBrandId, setCurrentBrandId] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            name: '',
        },
    });

    useEffect(() => {
        if (location.state?.brand) {
            const { brandId, name, images } = location.state.brand;
            setIsEditMode(true);
            setCurrentBrandId(brandId);
            setValue('name', name);
            setUploadedUrl(images || []);
            setPreviewUrls(images || []); // Show existing images as previews
        }
    }, [location.state, setValue]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Combine with existing files if any
        const newFiles = [...selectedFiles, ...files];
        setSelectedFiles(newFiles);

        // Create new preview URLs
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviews]);
        
        setMessage("");
    };

    const handleImageUpload = async () => {
        if (!selectedFiles.length) {
            setMessage("Please select at least one image");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            setUploading(true);
            setMessage("Uploading images...");

            const response = await axiosInstance.post(
                '/images/batch-upload?quality=80&fallbackToJpeg=true',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const uploadedFiles = response.data.map(item => item.fileUrl).filter(Boolean);
            
            // Combine with existing uploaded URLs if any
            const combinedUrls = [...uploadedUrl, ...uploadedFiles];
            setUploadedUrl(combinedUrls);
            
            setMessage(uploadedFiles.length ? "Images uploaded successfully" : "Upload completed but no URLs returned");

            // Clear selected files after successful upload
            setSelectedFiles([]);

        } catch (error) {
            console.error(error);
            setMessage("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!uploadedUrl?.length && !isEditMode) {
            setMessage("Please upload images before submitting");
            return;
        }

        try {
            const payload = {
                name: data.name,
                imageUrls: uploadedUrl
            };

            if (isEditMode) {
                await editBrand(currentBrandId, payload);
                setMessage("Brand updated successfully!");
                navigate(-1);
            } else {
                await addBrand(payload);
                setMessage("Brand created successfully!");
                
                // Reset all states
                reset();
                setSelectedFiles([]);
                setPreviewUrls(prev => {
                    // Clean up all object URLs
                    prev.forEach(url => URL.revokeObjectURL(url));
                    return [];
                });
                setUploadedUrl([]);
            }
            
        } catch (error) {
            console.error(error);
            setMessage(`Failed to ${isEditMode ? 'update' : 'create'} brand. Please try again.`);
        }
    };

    const handleRemoveImage = (index) => {
        // Remove from uploaded URLs
        const newUrls = [...uploadedUrl];
        newUrls.splice(index, 1);
        setUploadedUrl(newUrls);
        
        // Remove from preview URLs
        const newPreviews = [...previewUrls];
        newPreviews.splice(index, 1);
        setPreviewUrls(newPreviews);

        // Remove from selected files
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);

        // Clean up object URL to prevent memory leaks
        URL.revokeObjectURL(previewUrls[index]);

        // Reset message
        setMessage("");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 p-4 dark:bg-gray-900 dark:text-gray-100">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-2xl bg-white rounded-xl overflow-hidden border border-gray-300 transition-all hover:shadow-md dark:bg-gray-900 dark:text-gray-100"
            >
                {/* Header */}
                <div className="dark:bg-gray-900 dark:text-gray-100 bg-indigo-50 p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
                                {isEditMode ? 'Edit Brand' : 'Add New Brand'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {isEditMode ? 'Update brand details and logo' : 'Add new brand with logo and details'}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="p-6 space-y-6">
                    {/* Brand Name */}
                    <div className="space-y-2">

                    <FloatLabel>
    <InputText
        id="username"
        className={`peer w-full px-4 py-3 text-sm border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-900 dark:text-gray-100 bg-gray-50 transition-all duration-200 ${errors.name ? 'border-b-red-500' : ''}`}
        {...register('name', {
            required: 'Brand name is required',
            minLength: {
                value: 2,
                message: 'Minimum 2 characters required'
            }
        })}
    />
    <label
        htmlFor="username"
        className={`block  text-sm font-medium text-gray-700 peer-focus:text-blue-600 uppercase tracking-wider transition-colors duration-200`}
    >
        Brand Name
    </label>
</FloatLabel>
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1 animate-fade-in">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2 dark:text-gray-100">Brand Images</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition dark:bg-gray-900 dark:text-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="text-xs text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG, WEBP (MAX. 5 images)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        multiple 
                                        onChange={handleFileChange} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Image Previews */}
                        {(previewUrls.length > 0 || uploadedUrl.length > 0) && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {(previewUrls.length > 0 ? previewUrls : uploadedUrl).map((src, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                                            <img
                                                src={src}
                                                alt={`preview-${idx}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = '/default-image.png';
                                                }}
                                            />
                                        </div>
                                        {idx === 0 && (
                                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                                                Primary
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(idx)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all  rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            disabled={uploading || !selectedFiles.length}
                            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${uploading || !selectedFiles.length ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'}`}
                        >
                            {uploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Images
                                </>
                            )}
                        </button>
                        <button
                            type="submit"
                            disabled={!uploadedUrl.length && !isEditMode}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${(!uploadedUrl.length && !isEditMode) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {isEditMode ? 'Update Brand' : 'Create Brand'}
                        </button>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${message.includes("success") ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} animate-fade-in`}>
                            {message}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
