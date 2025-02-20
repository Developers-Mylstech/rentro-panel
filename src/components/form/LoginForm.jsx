import React from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({isTokenValid}) {
   const navigate=useNavigate()
  
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        isTokenValid(true)
        navigate('/')
        console.log('Form Data:', data);
    };

    return (
        <div className="">
            <div className="bg-primary ">
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label className="text mb-2 text-left">Enter email or username</label>
                            <InputText
                                {...register('mainCategory', { required: 'Main Category is required' })}
                                placeholder="Enter email or username"
                                className="w-full text p-3 bg-gray-100 border-none rounded-lg"
                            />
                            {errors.mainCategory && <p className="text-red-500 text-sm mt-1">{errors.mainCategory.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text mb-2 text-left">Password</label>
                            <InputText
                                {...register('subcategory')}
                                placeholder="Password"
                                className="w-full p-3 text bg-gray-100 border-none rounded-lg"
                            />
                        </div>
                    </div>
                </form>
                <div className='flex justify-between items-center my-5'>

                    <h6 className='text '>Forget Password ?</h6>
                    <CustomButton title={'Login'} icon={'pi pi-lock'} onClick={onSubmit}/>
                </div>
            </div>


        </div>
    );
}
