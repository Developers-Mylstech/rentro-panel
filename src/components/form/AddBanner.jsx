import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import CustomButton from '../../systemdesign/CustomeButton';


export default function AddBanner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainCategory: '',
    subcategory: '',
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
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
      
      {/* Category Information */}
      <Card className="mb-6 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Category Information</h3>
        <div className="mb-4">
          <label className="block mb-2">Main Category</label>
          <InputText
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleChange}
            placeholder="Main Category"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Subcategory</label>
          <InputText
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            placeholder="Subcategory"
            className="w-full p-2 border rounded"
          />
        </div>
      </Card>
      
      {/* Category Image */}
      <Card className="mb-6 p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Category Image</h3>
        <div>
          <label className="block mb-2">Main Category Image</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>
      </Card>
      
      {/* Submit Button */}
      <div className='w-full flex justify-center items-center'>
             <CustomButton  title="Submit" onClick={handleSubmit} />
             </div>
    </div>
  );
}
