import React from 'react';

export default function CustomButton({ title, onClick }) {
  return (
    <button
      className="bg-secondary  text-white font-bold py-2 px-4 rounded transition duration-300"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
