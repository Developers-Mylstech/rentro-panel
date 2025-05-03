import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import SellPricingForm from './SellPricingForm';
import RentPricingForm from './RentPricingForm';
import ServiceOptions from './ServiceOptions';

const PricingOptions = ({ control, watch, setValue, singleProduct }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6 bg-secondary bg-opacity-10 rounded-lg px-5">
        <h2 className="md:text-lg text-base font-semibold text-secondary rounded-lg p-3 dark:text-gray-100">Pricing Options</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Sell', value: 'sell', color: "green-500", hasData: !!singleProduct?.productFor?.sell },
          { label: 'Rent', value: 'rent', color: "orange-500", hasData: !!singleProduct?.productFor?.rent },
          { label: 'Service', value: 'service', color: "purple-500", hasData: !!singleProduct?.productFor?.service },
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
              ${selectedOptions.includes(option.value) || option.hasData
                ? `border-${option.color} text-${option.color}`
                : `bg-white border-${option.color} text-${option.color} hover:border-${option.color} dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 hover:dark:border-blue-400`
              }`}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.value) || option.hasData}
              onChange={() => handleOptionChange(option.value)}
              className="form-checkbox h-5 w-5 text-secondary dark:text-blue-500 focus:ring-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              disabled={option.hasData}
            />
            <span className="text-sm font-medium">{option.label}</span>
            {option.hasData && (
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">(configured)</span>
            )}
          </label>
        ))}
      </div>

      <div className="space-y-6">
        {(selectedOptions.includes('sell') || !!singleProduct?.productFor?.sell) && (
          <SellPricingForm control={control} watch={watch} setValue={setValue} singleProduct={singleProduct?.productFor?.sell} />
        )}

        {(selectedOptions.includes('rent') || !!singleProduct?.productFor?.rent) && (
          <RentPricingForm control={control} watch={watch} setValue={setValue} singleProduct={singleProduct?.productFor?.rent} />
        )}

        {(selectedOptions.includes('service') || !!singleProduct?.productFor?.service) && (
          <ServiceOptions control={control} watch={watch} setValue={setValue} singleProduct={singleProduct?.productFor?.service} />
        )}
      </div>
    </div>
  );
};

export default PricingOptions;