import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import CustomButton from '../../systemdesign/CustomeButton';

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="">
      <h1 className="heading mb-6">Add New Category</h1>


      <div className="bg-white p-12 rounded-lg shadow-md mb-6">
        <h2 className="subheading mb-4">Category Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-row items-center">
              <label className="text mb-2 w-2/12">Main Category</label>
              <InputText
                {...register('mainCategory', { required: 'Main Category is required' })}
                placeholder="Main Category"
                className="w-full text p-3 bg-gray-100 border-none rounded-lg"
              />
              {errors.mainCategory && <p className="text-red-500 text-sm mt-1">{errors.mainCategory.message}</p>}
            </div>

            <div className="flex flex-row items-center">
              <label className="text mb-2 w-2/12">Subcategory</label>
              <InputText
                {...register('subcategory')}
                placeholder="Subcategory"
                className="w-full p-3 text bg-gray-100 border-none rounded-lg"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Category Image Section */}
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="subheading mb-4">Category Image</h2>

        <div className="flex flex-row items-center gap-4">
          <label className="text mb-2 w-2/12">Main Category Image</label>
          <FileUpload
            mode="basic"
            name="categoryImage"
            
            url="/api/upload"
            className="w-full text"
            contentStyle='bg-red-300'
            chooseLabel="Choose File"
            accept="image/*"
            {...register('categoryImage', { required: 'Image is required' })}
            customUpload
          />
          {errors.categoryImage && <p className="text-red-500 text-sm mt-1">{errors.categoryImage.message}</p>}
        </div>



      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <CustomButton title={'submit'} />
      </div>
    </div>
  );
}
