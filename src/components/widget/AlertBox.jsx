import { useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';

export default function AlertBox({title, message}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-start p-4 mb-4 text-green-900 bg-green-50 border border-green-200 rounded-2xl shadow-lg max-w-md mx-auto animate-fade-in">
      <FaInfo className="w-6 h-6 mt-1 mr-3 text-green-500" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-green-800 mt-1">
         {message}
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-green-500 hover:text-green-700"
        aria-label="Close"
      >
        <FiXCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
