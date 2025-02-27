import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload'; // Import FileUpload
import CustomButton from '../../systemdesign/CustomeButton';

export default function AddBrand() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainCategory: '',
    categoryImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.files[0];
    setFormData((prevData) => ({ ...prevData, categoryImage: file }));
  };

  const handleSubmit = () => {
    if (!formData.mainCategory || !formData.categoryImage) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    console.log('New Brand Added:', formData);
    navigate('/brands');
  };

  return (
    <div className="">
      <h3 className="heading mb-6">Add New Brand</h3>
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="font-semibold mb-4">Brand Information</h4>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Brand Name</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleChange}
          />
        </div>

        <h4 className="font-semibold mb-4">Brand Image</h4>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Brand Image</label>
          <FileUpload
        
            mode="basic"
            name="categoryImage"
            chooseOptions={{ className: 'bg-secondary' }}
            url="/api/upload"
            className="w-[70%]"
            contentStyle="bg-red-300"
            chooseLabel="Choose File"
            accept="image/*"
            customUpload
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <CustomButton title="Submit" onClick={handleSubmit} icon="pi pi-save" />
      </div>
    </div>
  );
}
