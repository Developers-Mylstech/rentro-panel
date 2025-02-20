import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomButton from '../../systemdesign/CustomeButton';

export default function AddBanner() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="">
      <h1 className="heading mb-6">Add New Banner</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Offer Information */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="subheading py-2">Offer Information</h2>
          <div className="space-y-4">
            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Offer Title</label>
              <input 
                type="text" 
                {...register('offerTitle', { required: 'Offer Title is required' })} 
                className="w-[70%] p-2 border rounded-md "
              />
              {errors.offerTitle && <span className="text-red-500">{errors.offerTitle.message}</span>}
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Offer Subtitle</label>
              <input type="text" {...register('offerSubtitle')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Offer Details</label>
              <input type="text" {...register('offerDetails')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Offer Description</label>
              <input type="text" {...register('offerDescription')} className="w-[70%] p-2 border rounded-md " />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="subheading py-2">Product Details</h2>
          <div className="space-y-4">
            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Name</label>
              <input type="text" {...register('productName', { required: 'Product Name is required' })} className="w-[70%] p-2 border rounded-md " />
              {errors.productName && <span className="text-red-500">{errors.productName.message}</span>}
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Category</label>
              <input type="text" {...register('productCategory')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Heading</label>
              <input type="text" {...register('productHeading')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Description</label>
              <input type="text" {...register('productDescription')} className="w-[70%] p-2 border rounded-md " />
            </div>
          </div>
        </div>

        {/* Prices */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="subheading py-2">Prices</h2>
          <div className="space-y-4">
            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Original Price</label>
              <input type="text" {...register('originalPrice')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Offer Price</label>
              <input type="text" {...register('offerPrice')} className="w-[70%] p-2 border rounded-md " />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="subheading py-2">Images</h2>
          <div className="space-y-4">
            <div className='flex justify-between items-center'>
              <label className="text">Main Image</label>
              <input type="file" {...register('mainImage')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Image 1</label>
              <input type="file" {...register('productImage1')} className="w-[70%] p-2 border rounded-md " />
            </div>

            <div className='flex justify-between items-center'>
              <label className=" text mb-1">Product Image 2</label>
              <input type="file" {...register('productImage2')} className="w-[70%] p-2 border rounded-md " />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center w-full">
          <CustomButton title="Submit" icon={'pi pi-save'} />
        </div>
      </form>
    </div>
  );
}
