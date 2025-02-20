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
        
        {/** Offer Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Offer Title</label>
            <input 
                type="text" 
                {...register('offerTitle', { required: 'Offer Title is required' })} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
            {errors.offerTitle && <span className="text-red-500">{errors.offerTitle.message}</span>}
        </div>

        {/** Offer Subtitle */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Offer Subtitle</label>
            <input 
                type="text" 
                {...register('offerSubtitle')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

        {/** Offer Details */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Offer Details</label>
            <input 
                type="text" 
                {...register('offerDetails')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

        {/** Offer Description */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Offer Description</label>
            <input 
                type="text" 
                {...register('offerDescription')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

    </div>
</div>


        {/* Product Details */}
    

        <div className="p-4 border rounded-lg shadow-sm">
    <h2 className="subheading py-2">Product Details</h2>
    <div className="space-y-4">
        
        {/** Product Name */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Product Name</label>
            <input 
                type="text" 
                {...register('productName', { required: 'Product Name is required' })} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
            {errors.productName && <span className="text-red-500">{errors.productName.message}</span>}
        </div>

        {/** Product Category */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Product Category</label>
            <input 
                type="text" 
                {...register('productCategory')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

        {/** Product Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Product Heading</label>
            <input 
                type="text" 
                {...register('productHeading')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

        {/** Product Description */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Product Description</label>
            <input 
                type="text" 
                {...register('productDescription')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

    </div>
</div>


        {/* Prices */}
     


        <div className="p-4 border rounded-lg shadow-sm">
    <h2 className="subheading py-2">Prices</h2>
    <div className="space-y-4">
        
        {/** Original Price */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Original Price</label>
            <input 
                type="text" 
                {...register('originalPrice')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

        {/** Offer Price */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text mb-1 md:w-3/12">Offer Price</label>
            <input 
                type="text" 
                {...register('offerPrice')} 
                className="w-full md:w-[70%] p-2 border rounded-md"
            />
        </div>

    </div>
</div>


        {/* Images */}
     

        <div className="p-4 border rounded-lg shadow-sm">
    <h2 className="subheading py-2">Images</h2>
    <div className="space-y-4">
        
        {/** Main Image */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text md:w-3/12 sm:py-3">Main Image</label>
            <div className="w-full md:w-[70%]">
                <input 
                    type="file" 
                    {...register('mainImage')} 
                    className="w-full p-2 border rounded-md"
                />
            </div>
        </div>

        {/** Product Image 1 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text md:w-3/12">Product Image 1</label>
            <div className="w-full md:w-[70%]">
                <input 
                    type="file" 
                    {...register('productImage1')} 
                    className="w-full p-2 border rounded-md"
                />
            </div>
        </div>

        {/** Product Image 2 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <label className="text md:w-3/12">Product Image 2</label>
            <div className="w-full md:w-[70%]">
                <input 
                    type="file" 
                    {...register('productImage2')} 
                    className="w-full p-2 border rounded-md"
                />
            </div>
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
