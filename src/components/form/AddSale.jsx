import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import CustomButton from '../../systemdesign/CustomeButton';


export default function AddSale() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    firstImage: null,
    secondImage: null,
    thirdImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log('New Sale Added:', formData);
    navigate('/sale-list');
  };

  return (
    <div className="p-6 w-full">
      <h3 className=" mb-6">Add New Sale Detail</h3>
      
      {/* Sale Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="subheading mb-4">Sale Information</h4>
        <div className="mb-4  flex justify-between">
          <label className="block text-gray-600 mb-2">Title</label>
          <InputText className="w-[70%] p-2 border rounded" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        </div>
        <div className="mb-4  flex justify-between">
          <label className="block text  mb-2">Subtitle</label>
          <InputText className="w-[70%] p-2 border rounded" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" />
        </div>
        <div className=' flex justify-between'>
          <label className="block text mb-2">Description</label>
          <InputTextarea className="w-[70%] p-2 border rounded" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        </div>
      </div>

      {/* Sale Images Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="subheading mb-4">Images</h4>
        <div className="mb-4  flex justify-between">
          <label className="block text-gray-600 mb-2">First Image</label>
          <input type="file" className="border p-2  text rounded w-[70%]" name="firstImage" onChange={handleFileChange} />
        </div>
        <div className="mb-4  flex justify-between">
          <label className="block text-gray-600 mb-2">Second Image</label>
          <input type="file" className="border p-2 text  rounded w-[70%]" name="secondImage" onChange={handleFileChange} />
        </div>
        <div className='mb-4  flex justify-between'>
          <label className="block text-gray-600 mb-2">Third Image</label>
          <input type="file" className="border p-2 text rounded w-[70%]" name="thirdImage" onChange={handleFileChange} />
        </div>
      </div>

      {/* Submit Button */}
       <div className="flex justify-center mt-6">
             <CustomButton title={'submit'} />
           </div>
    </div>
  );
}
