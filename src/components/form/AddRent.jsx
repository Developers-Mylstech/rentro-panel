// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import CustomButton from '../../systemdesign/CustomeButton';


// export default function AddRent() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     image1: null,
//     image2: null,
//     image3: null,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };

//   const handleSubmit = () => {
//     // Creating FormData to handle file uploads
//     const formDataToSend = new FormData();
//     formDataToSend.append('title', formData.title);
//     formDataToSend.append('subtitle', formData.subtitle);
//     formDataToSend.append('description', formData.description);
//     if (formData.image1) formDataToSend.append('image1', formData.image1);
//     if (formData.image2) formDataToSend.append('image2', formData.image2);
//     if (formData.image3) formDataToSend.append('image3', formData.image3);

//     // Log the form data to see the output
//     console.log('Form Data:', formDataToSend);
//     // Send the formDataToSend to your backend API here

//     navigate('/rental-list');
//   };

//   return (
//     <div className=" w-full">
//       <h3 className=" heading mb-6">Add New Rental Detail</h3>

//       {/* Rental Information Section */}
//       <div className="border p-6 rounded-lg shadow bg-white mb-6">
//         <h2 className="subheading mb-4">Rental Information</h2>
//         <div className="mb-4 flex justify-between">
//           <label className="block text-gray-600 text mb-2">Title</label>
//           <InputText
//             className="w-[70%] p-2 border rounded"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//           />
//         </div>
//         <div className="mb-4 flex justify-between ">
//           <label className="flex justify-between text  mb-2">Subtitle</label>
//           <InputText
//             className="w-[70%] p-2 border rounded"
//             name="subtitle"
//             value={formData.subtitle}
//             onChange={handleChange}
//             placeholder="Subtitle"
//           />
//         </div>
//         <div className='mb-4 flex justify-between'>

//           <label className="block text-gray-600 mb-2">Description</label>
//           <InputText
//             className="w-[70%] text p-2 border rounded"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//           />
//         </div>
//       </div>

//       {/* Image Upload Section */}
     
//       <div className="border p-6 rounded-lg shadow bg-white mb-6">
//       <div className=' mb-4'>
//         <h4 className="font-semibold subheading"> Images</h4>
//         <p className='text-yellow-500 opacity-70 text-sm mt-1'>**Image should be below 1 MB and should have dimentions of 500X600 and type of .png / .jpeg / .webp**</p>
//         </div>
//         <div className="mb-4  flex justify-between">
//           <label className="block text-gray-600 mb-2">First Image</label>
//           <input
//             type="file"
//             className="border p-2 text rounded w-[70%]"
//             name="image1"
//             onChange={handleFileChange}
//           />
//         </div>
//         <div className="mb-4  flex justify-between">
//           <label className="block text mb-2">Second Image</label>
//           <input
//             type="file"
//             className="border p-2  text rounded w-[70%]"
//             name="image2"
//             onChange={handleFileChange}
//           />
//         </div>
//         <div className=' flex justify-between'>
//           <label className="text   mb-2">Third Image</label>
//           <input
//             type="file"
//             className="border p-2 text rounded w-[70%]"
//             name="image3"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>

//      {/* Submit Button */}
//            <div className="flex justify-center mt-6">
//                  <CustomButton title={'submit'} icon={'pi pi-save'}/>
//                </div>
//     </div>
//   );
// }

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

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

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [fileKey, setFileKey] = useState(0);

  // Refs for FileUpload components to access clear() method
  const fileUploadRefs = {
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e, name) => {
    const file = e.files[0];

    // Validation for file type and size
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, [name]: 'Invalid file type. Allowed types: .png, .jpeg, .webp' });
        fileUploadRefs[name].current.clear(); // Clear input on error
        return;
      }
      if (file.size > 1024 * 1024) {
        setErrors({ ...errors, [name]: 'File size exceeds 1 MB' });
        fileUploadRefs[name].current.clear(); // Clear input on error
        return;
      }

      // Set file and preview
      setFormData({ ...formData, [name]: file });
      setPreviews({ ...previews, [name]: URL.createObjectURL(file) });
      setErrors({ ...errors, [name]: '' });
    }
    setFileKey(!fileKey)
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.subtitle) newErrors.subtitle = 'Subtitle is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image1) newErrors.image1 = 'First image is required';
    if (!formData.image2) newErrors.image2 = 'Second image is required';
    if (!formData.image3) newErrors.image3 = 'Third image is required';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subtitle', formData.subtitle);
    formDataToSend.append('description', formData.description);
    if (formData.image1) formDataToSend.append('image1', formData.image1);
    if (formData.image2) formDataToSend.append('image2', formData.image2);
    if (formData.image3) formDataToSend.append('image3', formData.image3);

    console.log('Form Data:', formDataToSend);

    navigate('/rental-list');
  };

  return (
    <div className="w-full">
      <h3 className="heading mb-6">Add New Rental Detail</h3>

      {/* Rental Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className="subheading mb-4">Rental Information</h2>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className=" text-gray-600 mb-2">Title</label>
          <InputText
            className="w-[70%] p-2 border"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Subtitle</label>
          <InputText
            className="w-[70%] p-2 border"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
          />
          {errors.subtitle && <span className="text-red-500 text-sm">{errors.subtitle}</span>}
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Description</label>
          <InputText
            className="w-[70%] p-2 border"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="subheading mb-4">Images</h4>
        <p className="text-red-500 opacity-70 text-sm mb-4">
          **Image should be below 1 MB and should have dimensions of 500X600 and type of .png / .jpeg / .webp**
        </p>

        {['image1', 'image2', 'image3'].map((name, index) => (
          <div key={name} className="mb-4 flex justify-between items-center w-full">
            <div className='flex flex-col md:flex-row justify-between w-[80%]'>
              <label className="block text-gray-600 mb-2">
                Image {index + 1}
              </label>
              <FileUpload
                ref={fileUploadRefs[name]}
                mode="basic"
                name={name}
                accept="image/*"
                auto
                customUpload
                key={fileKey} // Force re-render
                chooseLabel={formData[name] ? formData[name].name : 'Choose Image'}
                onSelect={(e) => handleFileChange(e, name)}
              />
            </div>

            {previews[name] && (
              <img src={previews[name]} alt="" className="w-24 h-24 rounded-lg shadow ml-4" />
            )}
            {errors[name] && <span className="text-red-500 text-sm ml-4">{errors[name]}</span>}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <Button label="Submit" className="p-button-success" onClick={handleSubmit} />
      </div>
    </div>
  );
}
