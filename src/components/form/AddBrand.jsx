import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import CustomButton from '../../systemdesign/CustomeButton';

export default function AddBrand() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    categoryImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, categoryImage: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log('New Brand Added:', formData);
    navigate('/brands');
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Add New Brand</h3>
      
      {/* Category Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="font-semibold mb-4">Brand Information</h4>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Brand Name</label>
          <InputText className="w-[70%] p-2 border rounded" name="mainCategory" value={formData.mainCategory} onChange={handleChange} />
        </div>

        <h4 className="font-semibold mb-4">Brand Image</h4>
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <label className="block text-gray-600 mb-2">Brand Image</label>
          <input type="file" className="border p-2 rounded w-[70%]" onChange={handleFileChange} />
        </div>
       
      </div>
      
      {/* Category Image Upload Section */}
      {/* <div className=" p-6 rounded-lg shadow bg-white mb-6">
       
      </div> */}
      
      {/* Submit Button */}
     <div className='w-full flex justify-center items-center'>
            <CustomButton  title="Submit" onClick={handleSubmit} />
            </div>
    </div>
  );
}
