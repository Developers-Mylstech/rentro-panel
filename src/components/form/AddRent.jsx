import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import CustomButton from '../../systemdesign/CustomeButton';


export default function AddRent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = () => {
    // Creating FormData to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subtitle', formData.subtitle);
    formDataToSend.append('description', formData.description);
    if (formData.image1) formDataToSend.append('image1', formData.image1);
    if (formData.image2) formDataToSend.append('image2', formData.image2);
    if (formData.image3) formDataToSend.append('image3', formData.image3);

    // Log the form data to see the output
    console.log('Form Data:', formDataToSend);
    // Send the formDataToSend to your backend API here

    navigate('/rental-list');
  };

  return (
    <div className=" w-full">
      <h3 className=" heading mb-6">Add New Rental Detail</h3>

      {/* Rental Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className="subheading mb-4">Rental Information</h2>
        <div className="mb-4 flex justify-between">
          <label className="block text-gray-600 text mb-2">Title</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <div className="mb-4 flex justify-between ">
          <label className="flex justify-between text  mb-2">Subtitle</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
          />
        </div>
        <div className='mb-4 flex justify-between'>

          <label className="block text-gray-600 mb-2">Description</label>
          <InputText
            className="w-[70%] text p-2 border rounded"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className=" mb-4 subheading">Images</h4>
        <div className="mb-4  flex justify-between">
          <label className="block text-gray-600 mb-2">First Image</label>
          <input
            type="file"
            className="border p-2 text rounded w-[70%]"
            name="image1"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-4  flex justify-between">
          <label className="block text mb-2">Second Image</label>
          <input
            type="file"
            className="border p-2  text rounded w-[70%]"
            name="image2"
            onChange={handleFileChange}
          />
        </div>
        <div className=' flex justify-between'>
          <label className="text   mb-2">Third Image</label>
          <input
            type="file"
            className="border p-2 text rounded w-[70%]"
            name="image3"
            onChange={handleFileChange}
          />
        </div>
      </div>

     {/* Submit Button */}
           <div className="flex justify-center mt-6">
                 <CustomButton title={'submit'} icon={'pi pi-save'}/>
               </div>
    </div>
  );
}
