// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import CustomButton from '../../systemdesign/CustomeButton';

// export default function AddBrand() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     mainCategory: '',
//     subCategory: '',
//     categoryImage: null,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, categoryImage: e.target.files[0] });
//   };

//   const handleSubmit = () => {
//     console.log('New Brand Added:', formData);
//     navigate('/brands');
//   };

//   return (
//     <div className="">
//       <h3 className="heading mb-6">Add New Brand</h3>
      
//       {/* Category Information Section */}
//       <div className="border p-6 rounded-lg shadow bg-white mb-6">
//         <h4 className="font-semibold mb-4">Brand Information</h4>
//         <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
//           <label className="block text-gray-600 mb-2">Brand Name</label>
//           <InputText className="w-[70%] p-2 border rounded" name="mainCategory" value={formData.mainCategory} onChange={handleChange} />
//         </div>

//         <h4 className="font-semibold mb-4">Brand Image</h4>
//         <div className='flex flex-col md:flex-row justify-between md:items-center'>
//           <label className="block text-gray-600 mb-2">Brand Image</label>
//           <input type="file" className="border p-2 rounded w-[70%] sm:w-[70%] file:w-full file:py-2" onChange={handleFileChange} />
//         </div>
      

//       </div>
      
//       {/* Category Image Upload Section */}
//       {/* <div className=" p-6 rounded-lg shadow bg-white mb-6">
       
//       </div> */}
      
//       {/* Submit Button */}
//      <div className='w-full flex justify-center items-center'>
//             <CustomButton  title="Submit" onClick={handleSubmit} icon={'pi pi-save'}/>
//             </div>
//     </div>
//   );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import CustomButton from '../../systemdesign/CustomeButton';
import { FileUpload } from 'primereact/fileupload';
import { useForm } from 'react-hook-form';

export default function AddBrand() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brandName: '',
      brandImage: null,
    },
  });

  // Watch for categoryImage for previewing file name
  const brandImage = watch('brandImage');

  // Image Validation
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG and PNG files are allowed.';
    }
    if (file.size > maxSize) {
      return 'File size should be less than 1 MB.';
    }
    return true;
  };

  const onSubmit = (data) => {
    console.log('New Brand Added:', data);
    navigate('/brands');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h3 className="heading mb-6">Add New Brand</h3>

      {/* Brand Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h4 className="font-semibold mb-4">Brand Information</h4>
        <div className="mb-4 flex flex-col md:flex-row justify-between md:items-center">
          <label className="block text-gray-600 mb-2">Brand Name</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            placeholder="Enter Brand Name"
            {...register('brandName', {
              required: 'Brand Name is required',
            })}
          />
          {errors.mainCategory && (
            <p className="mt-2 text-sm text-red-600">
              {errors.brandName.message}
            </p>
          )}
        </div>

        <h4 className="font-semibold mb-4">Brand Image</h4>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className=' mb-4'>
        <h4 className="font-semibold subheading">Brand Image</h4>
        <p className='text-yellow-500 opacity-70 text-sm mt-1'>**Image should be below 1 MB and should have dimentions of 500X600 and type of .png / .jpeg / .webp**</p>
        </div>
          <FileUpload
            mode="basic"
            name="brandImage"
            customUpload
            accept="image/jpeg, image/png"
            chooseOptions={{ className: 'bg-primary border-2 border-secondary text-secondary' }}
            chooseLabel={brandImage?brandImage.name:"Choose File"}
            auto
            onSelect={(e) => {
              const file = e.files[0];
              const validationMessage = file ? validateFile(file) : null;

              if (file && validationMessage === true) {
                setValue('brandImage', file);
              } else {
                setValue('brandImage', null);
                e.options.clear();
              }
            }}
          />
          
          {errors.brandImage && (
            <p className="mt-2 text-sm text-red-600">
              {errors.brandImage.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center">
        <CustomButton title="Submit" type="submit" icon={'pi pi-save'} />
      </div>
    </form>
  );
}
