import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AddCategory() {
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
    console.log('New Category Added:', formData);
    navigate('/category-list');
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Add New Category</h3>
      
      {/* Category Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="font-semibold mb-4">Category Information</h4>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Main Category</label>
          <InputText className="w-full p-2 border rounded" name="mainCategory" value={formData.mainCategory} onChange={handleChange} placeholder="Main Category" />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Subcategory</label>
          <InputText className="w-full p-2 border rounded" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Subcategory" />
        </div>
      </div>
      
      {/* Category Image Upload Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="font-semibold mb-4">Category Image</h4>
        <div>
          <label className="block text-gray-600 mb-2">Main Category Image</label>
          <input type="file" className="border p-2 rounded w-full" onChange={handleFileChange} />
        </div>
      </div>
      
      {/* Submit Button */}
     <div className='w-full flex justify-center items-center'>
            <CustomButton  title="Submit" onClick={handleSubmit} />
            </div>
    </div>
  );
}
