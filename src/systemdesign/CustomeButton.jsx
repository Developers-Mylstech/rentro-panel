import React from 'react';

export default function CustomButton({ title, onClick }) {
  return (
    <button
      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
