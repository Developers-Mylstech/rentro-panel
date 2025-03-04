// import React from 'react';
// import LoginForm from '../components/form/LoginForm';
// import bg from '../assets/bgsvg.png';
// import Waves from '../components/Waves';

// export default function Login({ isTokenValid }) {
//     console.log(isTokenValid);

//     return (
//         <div className='flex justify-around items-center h-screen w-full relative overflow-hidden bg-secondary'>
//             {/* Background Image */}
//             {/* <div className=''>
//                 <img
//                     // src={bg}
//                     src='https://img.freepik.com/free-vector/transparent-water-splash-with-drops-light-blue-color-flowing-wavy-shape_1017-7251.jpg?ga=GA1.1.1944470534.1737377007&semt=ais_hybrid'
//                     alt="Background"
//                     className="  drop-shadow-xl shadow-lg"
//                 />
//             </div> */}
//             <div className='w-[30%]'>
            
//                     <h1 className='text-white text-5xl'>Welcome to the App</h1>
//                     <p className='text-white text-5xl'>Your success is our business—let’s make great things happen!</p>
                
                

//                 {/* <div className='flex items-center justify-center w-full h-16'>
//                     <p className='text-white text-sm'>Don't have an account? <span className='text-primary'>Sign Up</span></p>
//                 </div> */}
//             </div>

//             {/* Content Wrapper */}
//             <div className='relative  border h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between'>
//                 {/* Left Side (Hidden on mobile & tablets) */}
//                 {/* <div className='hidden w-[50%] justify-center items-center'></div> */}

//                 {/* Right Side (Login Form) */}
//                 <div className=' w-full'>
//                     <div className='border rounded-lg p-6 md:p-8 lg:p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 text-center flex flex-col items-center gap-4 bg-black bg-opacity-10 shadow-xl shadow-gray-800/40 backdrop-blur-md'>
//                         <h1 className='heading text-left text-primary'>Login.</h1>
//                         <LoginForm isTokenValid={isTokenValid} />
//                     </div>
//                 </div>
//             </div>
//             <div className='absolute bottom-0 left-0 right-0'>
//             <Waves/>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import LoginForm from '../components/form/LoginForm';
import Waves from '../components/Waves';

export default function Login({ isTokenValid }) {
    console.log(isTokenValid);

    return (
        <div className="flex justify-center items-center h-screen w-full relative overflow-hidden bg-secondary">
            {/* Welcome Section */}
            <div className="w-[35%] hidden md:block text-center lg:text-left px-6">
                <h1 className="text-white text-5xl  font-bold">Welcome to the App</h1>
                <p className="text-white text-xl mt-4">
                    Your success is our business—let’s make great things happen!
                </p>
            </div>

            {/* Login Form Section */}
            <div className="flex justify-center items-center w-[90%] md:w-[35%]">
                <div className="border rounded-lg p-6 md:p-8 lg:p-10 w-full sm:w-3/4 md:w-2/3 lg:w-[80%] text-center flex flex-col items-center gap-4 bg-black bg-opacity-10 shadow-xl shadow-gray-800/40 ">
                    <h1 className="text-primary text-3xl font-semibold">Login</h1>
                    <LoginForm isTokenValid={isTokenValid} />
                </div>
            </div>

            {/* Waves Background */}
            <div className="absolute bottom-0 left-0 right-0">
                <Waves />
            </div>
        </div>
    );
}
