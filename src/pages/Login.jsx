import React from 'react';
import LoginForm from '../components/form/LoginForm';
import bg from '../assets/bgsvg.png';

export default function Login({isTokenValid}) {
    console.log(isTokenValid)
    return (
        <div className='flex justify-center items-center h-screen relative overflow-hidden'>
            {/* Background Image with Backdrop Shadow */}
            <div className='absolute inset-0 w-full h-full'>
                <img
                    src={bg}
                    alt="Background"
                    className="w-full h-full object-cover drop-shadow-xl  shadow-lg"
                />
            </div>

            {/* Content Wrapper */}
            <div className='flex w-full h-full relative'>
                {/* Left Side (Image Section) */}
                <div className='w-1/2 flex justify-center items-center'></div>

                {/* Right Side (Login Form) */}
                <div className='w-1/2 flex justify-center items-center z-10'>
                    <div className='border rounded-lg p-10 w-1/2 text-center flex flex-col gap-4 bg-primary shadow-xl shadow-gray-800/40 backdrop-blur-md'>
                        <h1 className='heading text-left text-secondary'>Login.</h1>
                        <LoginForm isTokenValid={isTokenValid}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
