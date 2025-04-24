import React from 'react';

const AlertBox = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Congratulations</h1>
        <p className="text-gray-600 text-center mb-6">
          You've just displayed this awesome Pop Up View
        </p>
        
        <div className="space-y-3 mb-6">
          <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200">
            First Button
          </button>
          <button className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200">
            Second Button
          </button>
        </div>
        
        <button className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-md transition duration-200">
          Done
        </button>
      </div>
    </div>
  );
};

export default AlertBox;