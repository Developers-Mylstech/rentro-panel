import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from 'primereact/toast';
import useServiceStore from "../../Context/ServiceContext";
import axiosInstance from "../../utils/axiosInstance";
import { IoCloudUploadOutline } from "react-icons/io5";


export default function AddService() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addService, updateService } = useServiceStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploatedImg, setUploadedImg] = useState([]);
  const toast = useRef(null);
  const [fileKey, setFileKey] = useState(0); // Add this state for FileUpload reset
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tempPreviews, setTempPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedHeading: "",
    detailedDescription: "",
    imageUrl:uploatedImg,
    features: [
      {
        title: "",
        description: ""
      }
    ]
  });

  useEffect(() => {
    const serviceToEdit = location.state?.service;
    if (serviceToEdit) {
      setIsEditMode(true);
      setServiceId(serviceToEdit.ourServiceId);
      setFormData({
        title: serviceToEdit.title || "",
        shortDescription: serviceToEdit.shortDescription || "",
        detailedHeading: serviceToEdit.detailedHeading || "",
        detailedDescription: serviceToEdit.detailedDescription || "",
        imageUrl: serviceToEdit.imageUrl || [],
        features: serviceToEdit.features || [{ title: "", description: "" }]
      });
      setPreviewImages(serviceToEdit.imageUrl || []);
    }
  }, [location.state]);

  const handleFileSelect = (event) => {
    const files = event.files;
    const maxSize = 1024 * 1024; // 1MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    // Validate files
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Please upload only JPG, PNG, or WebP images',
          life: 3000
        });
        return;
      }
      if (file.size > maxSize) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Image size should be less than 1MB',
          life: 3000
        });
        return;
      }
    }

    // Clear previous selections
    tempPreviews.forEach(url => URL.revokeObjectURL(url));
    
    setSelectedFiles(files);
    // Create temporary preview URLs
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setTempPreviews(previews);
  };

  const handleImageUpload = async () => {
    if (!selectedFiles.length) {
      toast.current.show({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select images first',
        life: 3000
      });
      return;
    }

    try {
      setUploading(true);
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post(
          '/images/upload?quality=80&fallbackToJpeg=true',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        return response.data?.fileUrl;
      });

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

      setFormData(prev => ({
        ...prev,
        imageUrl: [...prev.imageUrl, ...uploadedUrls]
      }));

      // Clean up temporary previews
      tempPreviews.forEach(url => URL.revokeObjectURL(url));
      setTempPreviews([]);
      setSelectedFiles([]);
      setFileKey(prev => prev + 1); // Reset FileUpload component

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Images uploaded successfully',
        life: 3000
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to upload images',
        life: 3000
      });
    } finally {
      setUploading(false);
    }
  };

  const removeTempPreview = (index) => {
    const newPreviews = tempPreviews.filter((_, i) => i !== index);
    const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
    
    // Clean up the removed preview URL
    URL.revokeObjectURL(tempPreviews[index]);
    
    setTempPreviews(newPreviews);
    setSelectedFiles(newFiles);
    setFileKey(prev => prev + 1); // Reset FileUpload component
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, field, value) => {
    setFormData(prev => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [field]: value
      };
      return {
        ...prev,
        features: updatedFeatures
      };
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: "", description: "" }]
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await updateService(serviceId, formData);
      } else {
        await addService(formData);
      }
      navigate(-1);
    } catch (error) {
      console.error('Failed to save service:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <div className="p-6  mx-auto">
      <Toast ref={toast} />
      <h2 className="text-2xl font-bold mb-6 text-gray-600 dark:text-gray-200">
        {isEditMode ? 'Edit Service' : 'Add New Service'}
      </h2>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <InputText
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full focus:outline-none focus:ring-0 p-2 border-b focus:border-blue-400 bg-primary dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block mb-2">Short Description</label>
              <Editor
                value={formData.shortDescription}
                onTextChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.htmlValue }))}
                style={{ height: '200px' }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Detailed Content</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Detailed Heading</label>
              <InputText
                value={formData.detailedHeading}
                onChange={(e) => setFormData(prev => ({ ...prev, detailedHeading: e.target.value }))}
                className="w-full focus:outline-none focus:ring-0 p-2 border-b focus:border-blue-400 bg-primary dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block mb-2">Detailed Description</label>
              <Editor
                value={formData.detailedDescription}
                onTextChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.htmlValue }))}
                style={{ height: '200px' }}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Images</h3>
          
          <div className="flex flex-col gap-2 bg-blue-50 dark:bg-gray-800 bg-opacity-55 justify-center items-center w-full h-80 border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <IoCloudUploadOutline className="md:text-7xl text-blue-400"/>
            <FileUpload
              key={fileKey} // Add key for reset
              mode="basic"
              multiple
              accept="image/*"
              maxFileSize={1024000}
              customUpload
              uploadHandler={handleFileSelect}
              chooseLabel="Select Images"
              className=""
            />
            <p className="text-xs">Click to select image to upload image </p>
          </div>

          {/* Selected Images Preview */}
          {tempPreviews.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Selected Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tempPreviews.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Selected image ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger p-button-text"
                        onClick={() => removeTempPreview(index)}
                        tooltip="Remove Image"
                        tooltipOptions={{ position: 'top' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  label="Upload Selected Images"
                  icon="pi pi-upload"
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className="p-button-success"
                />
              </div>
            </div>
          )}

          {uploading && (
            <div className="mt-4 text-center">
              <i className="pi pi-spin pi-spinner mr-2" />
              Uploading images...
            </div>
          )}

          {/* Uploaded Images */}
          {formData.imageUrl.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Uploaded Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.imageUrl.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Service image ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger p-button-text text-red-500"
                        onClick={() => removeImage(index)}
                        tooltip="Remove Image"
                        tooltipOptions={{ position: 'top' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <Button
              icon="pi pi-plus"
              onClick={addFeature}
              className="p-button-success p-button-rounded focus:outline-none focus:ring-0 bg-secondary p-2 text-primary"
              tooltip="Add New Feature"
              tooltipOptions={{ position: 'left' }}
            />
          </div>

          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div 
                key={index} 
                className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all hover:shadow-md"
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  {formData.features.length > 1 && (
                    <Button
                      icon="pi pi-trash"
                      onClick={() => removeFeature(index)}
                      className="p-button-danger p-button-rounded p-button-text"
                      tooltip="Remove Feature"
                      tooltipOptions={{ position: 'left' }}
                    />
                  )}
                </div>

                <div className="mb-4 pt-2">
                  <label className="block text-sm font-medium mb-2">
                    Feature {index + 1} Title
                  </label>
                  <InputText
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="w-full focus:outline-none focus:ring-0 p-2 border-b focus:border-blue-400 bg-primary dark:bg-gray-800"
                    placeholder="Enter feature title "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Feature {index + 1} Description
                  </label>
                  <Editor
                    value={feature.description}
                    onTextChange={(e) => handleFeatureChange(index, 'description', e.htmlValue)}
                    style={{ height: '150px' }}
                    className="border rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>

         
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => navigate(-1)}
            className="p-button-text focus:outline-none focus:ring-0 bg-secondary p-2 text-primary"
          />
          <Button
            label={isEditMode ? 'Update Service' : 'Add Service'}
            icon="pi pi-save"
            onClick={handleSubmit}
            className="p-button-success ocus:outline-none focus:ring-0 bg-secondary p-2 text-primary"
          />
        </div>
      </div>
    </div>
  );
}



