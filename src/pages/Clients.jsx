// import React, { useState } from 'react';
// import axios from 'axios';

// const Client = () => {
//   const [responseData, setResponseData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleApiCall = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('https://proud-expression-production-6ebc.up.railway.app/api/v1/brands'); // Replace with your API
//       setResponseData(response.data);
//     } catch (err) {
//       setError('Something went wrong!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <button
//         onClick={handleApiCall}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Call APIs
//       </button>

//       {loading && <p className="mt-4">Loading...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//       {responseData && (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <pre>{JSON.stringify(responseData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Client;


import React from 'react'
import AlertBox from '../components/widget/AlertBox'

export default function Clients() {
  return (
    <div>
         <AlertBox/>
    </div>
  )
}
