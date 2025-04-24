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
    };

    return (
        <div   className="">
            <div className="bg-transparent ">
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            {/* <label className="text-primary mb-2 text-left">Enter email or username</label> */}
                            <InputText
                                {...register('mainCategory', { required: 'Main Category is required' })}
                                placeholder="Enter email or username"
                                className="w-full p-3 text-primary bg-transparent border rounded-lg focus:none placeholder:text-primary"
                            />
                            {errors.mainCategory && <p className="text-red-500 text-sm mt-1">{errors.mainCategory.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            {/* <label className="text mb-2 text-left">Password</label> */}
                            <InputText
                                {...register('subcategory')}
                                placeholder="Password"
                                
                                className="w-full p-3 text-primary bg-transparent border rounded-lg focus:none placeholder:text-primary"
                            />
                        </div>
                    </div>
                </form>
                <div className='flex justify-between items-center my-5'>

                    <h6 className='text-primary '>Forget Password ?</h6>
                    {/* <CustomButton title={'Login'} icon={'pi pi-lock'} onClick={onSubmit}/> */}
                </div>
                    <button icon={'pi pi-lock'} className='bg-primary text-secondary py-2 px-4 rounded-lg' onClick={onSubmit}  >Login</button>
            </div>


        </div>
    );
}
