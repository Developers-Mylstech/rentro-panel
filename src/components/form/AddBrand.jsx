import React from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../../systemdesign/CustomeButton';

export default function AddBrand() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <h2 className="heading my-10">Add New Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full mx-auto border rounded-md">
        <h3 className='subheading my-6'>Brand Information</h3>
        
        <div className="mb-3 flex justify-between items-center">
          <label className="text text">Brand Name</label>
          <input {...register("brandName", { required: true })} 
                 placeholder='Brand' 
                 className="w-[70%] p-2 border rounded" />
          {errors.brandName && <span className="text-red-500">Brand Name is required</span>}
        </div>
        
        <div className="mb-3 flex justify-between items-center">
          <label className="text text">Brand Image</label>
          <input type="file" {...register("brandImage", { required: true })} className="w-[70%] p-2 border rounded" />
          {errors.brandImage && <span className="text-red-500">Brand Image is required</span>}
        </div>
        
       <div className='flex justify-center items-center'>
       <CustomButton title="Submit" onClick={handleSubmit(onSubmit)} />
       </div>
      </form>
    </>
  );
}
