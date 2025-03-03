import React from 'react';
import LoginForm from '../components/form/LoginForm';
import bg from '../assets/bgsvg.png';

export default function Login({ isTokenValid }) {
    console.log(isTokenValid);

    return (
        <div className='flex flex-col lg:flex-row justify-center items-center h-screen relative overflow-hidden'>
            {/* Background Image */}
            <div className='absolute inset-0 w-full h-full'>
                <img
                    // src={bg}
                    src='https://media3.giphy.com/media/h6x0ROdzJy4TKyUu1b/giphy.webp?cid=ecf05e47jts0johzeupkob2aswvamehvge98pe9citgy7m0l&ep=v1_gifs_related&rid=giphy.webp&ct=g'
                    alt="Background"
                    className="w-full h-full object-cover drop-shadow-xl shadow-lg"
                />
            </div>

            {/* Content Wrapper */}
            <div className='relative w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between'>
                {/* Left Side (Hidden on mobile & tablets) */}
                <div className='hidden lg:flex w-1/2 justify-center items-center'></div>

                {/* Right Side (Login Form) */}
                <div className='w-full lg:w-1/2 flex justify-center items-center z-10 px-6 lg:px-0'>
                    <div className='border rounded-lg p-6 md:p-8 lg:p-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center flex flex-col gap-4 bg-black bg-opacity-10 shadow-xl shadow-gray-800/40 backdrop-blur-md'>
                        <h1 className='heading text-left text-primary'>Login.</h1>
                        <LoginForm isTokenValid={isTokenValid} />
                    </div>
                </div>
            </div>
        </div>
    );
}
