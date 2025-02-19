import React from 'react';

export default function CustomButton({ title, onClick }) {
  return (
    <button
      className="bg-[#07ac95] hover:bg-secondary text-primary font-normal capitalize py-2 px-9 rounded transition duration-300"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
