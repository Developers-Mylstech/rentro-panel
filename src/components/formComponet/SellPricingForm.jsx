// import React, { useEffect, useState } from 'react';
// import { Controller } from 'react-hook-form';

// const SellPricingForm = ({ control, watch, setValue, singleProduct }) => {
//     const [discountType, setDiscountType] = useState('percentage');
//     const sellData = watch('pricing.sell') || {};

//     useEffect(() => {
//         const productSellData = singleProduct;

//         if (productSellData) {

//           setValue('pricing.sell.actualPrice', 
//             productSellData.actualPrice !== undefined ? productSellData.actualPrice : ''
//           );

//           setValue('pricing.sell.discountPrice', productSellData.discountPrice || '');
//           setValue('pricing.sell.discountedPrice', productSellData.discountPrice || '');
//           setValue('pricing.sell.benefits', productSellData.benefits?.length > 0 ? productSellData.benefits : ['']);
//           setValue('pricing.sell.vat', productSellData.vat !== undefined ? productSellData.vat : 5);
//           setValue('pricing.sell.isWarrantyAvailable', productSellData.isWarrantyAvailable || false);
//           setValue('pricing.sell.warrantPeriod', productSellData.warrantPeriod || 0);

//           if (productSellData.actualPrice !== undefined && productSellData.discountPrice !== undefined) {
//             const percentage = ((productSellData.actualPrice - productSellData.discountPrice) / productSellData.actualPrice) * 100;
//             const isPercentage = Number.isInteger(percentage);
//             setDiscountType(isPercentage ? 'percentage' : 'fixed');
//           }
//         } else {
//           // Reset form if no product
//           setValue('pricing.sell', {
//             actualPrice: '',
//             discountPrice: '',
//             discountedPrice: '',
//             benefits: [''],
//             vat: 5,
//             isWarrantyAvailable: false,
//             warrantPeriod: 0
//           });
//         }
//       }, [singleProduct, setValue]);


//     useEffect(() => {
//         calculateDiscountedPrice();
//     }, [sellData?.actualPrice, sellData?.discountPrice, discountType, sellData?.vat]);

//     const calculateDiscountedPrice = () => {
//         const basePrice = parseFloat(sellData?.actualPrice) || 0;
//         const discountValue = parseFloat(sellData?.discountPrice) || 0;
//         let discountedPrice = basePrice;

//         if (basePrice && discountValue) {
//             discountedPrice = discountType === 'percentage'
//                 ? basePrice * (1 - (discountValue / 100))
//                 : basePrice - discountValue;
//         }

//         // Apply VAT if included
//         if (sellData?.vat > 0) {
//             discountedPrice = discountedPrice * (1 + (sellData.vat / 100));
//         }


//         const currentDiscountedPrice = parseFloat(sellData?.discountedPrice) || 0;
//         if (Math.abs(discountedPrice - currentDiscountedPrice) > 0.01) {
//             setValue('pricing.sell.discountedPrice', discountedPrice.toFixed(2));
//         }
//     };

//     const handleAddBenefit = () => {
//         const currentBenefits = Array.isArray(sellData?.benefits)
//             ? [...sellData.benefits.filter(b => b !== null)]
//             : [''];
//         setValue('pricing.sell.benefits', [...currentBenefits, '']);
//     };

//     const handleRemoveBenefit = (index) => {
//         if (!Array.isArray(sellData?.benefits)) return;

//         const updatedBenefits = sellData.benefits
//             .filter((_, i) => i !== index)
//             .filter(b => b !== null);

//         setValue('pricing.sell.benefits', updatedBenefits.length > 0 ? updatedBenefits : ['']);
//     };

//     const handleBenefitChange = (index, value) => {
//         if (!Array.isArray(sellData?.benefits)) return;

//         const updatedBenefits = [...sellData.benefits];
//         updatedBenefits[index] = value;
//         setValue('pricing.sell.benefits', updatedBenefits);
//     };

//     return (
//         <div className="p-4 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
//             <h3 className="text-lg font-medium mb-4 dark:text-white text-green-700 bg-green-50/75 p-3 flex items-center border-gray-300 rounded-lg">
//                 Sell Pricing
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 {/* Actual Price */}
//                 <div className="space-y-1">
//                     <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
//                         Actual Price (AED)
//                     </label>
//                     <div className="relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-800 dark:text-gray-100">
//                             <span className="sm:text-sm">AED</span>
//                         </div>

//                         <Controller
//                             name="pricing.sell.actualPrice"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     type="number"
//                                     min="0"
//                                     step="0.01"
//                                     className="block w-full pl-12 pr-12 py-2 border-b border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
//                                     placeholder="0.00"
//                                     onChange={(e) => {
//                                         const value = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
//                                         field.onChange(value);
//                                     }}
//                                 />
//                             )}
//                         />
//                     </div>
//                 </div>

//                 {/* Discount */}
//                 <div className="space-y-1">
//                     <div className="flex space-x-4 mb-1">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Discount
//                         </label>
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={discountType === 'percentage'}
//                                 onChange={() => setDiscountType('percentage')}
//                                 className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
//                             />
//                             <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">%</span>
//                         </label>
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={discountType === 'fixed'}
//                                 onChange={() => setDiscountType('fixed')}
//                                 className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
//                             />
//                             <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">AED</span>
//                         </label>
//                     </div>
//                     <Controller
//                         name="pricing.sell.discountPrice"
//                         control={control}
//                         render={({ field }) => (
//                             <input
//                                 {...field}
//                                 type="number"
//                                 min="0"
//                                 step={discountType === 'percentage' ? '1' : '0.01'}
//                                 value={field.value || ''}
//                                 className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
//                                 onChange={(e) => {
//                                     const value = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
//                                     field.onChange(value);
//                                 }}
//                             />
//                         )}
//                     />
//                 </div>

//                 {/* Warranty Section */}
//                 <div className="space-y-1">
//                     <div className="flex items-center justify-between">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Warranty Period (Months)
//                         </label>
//                         <label className="inline-flex items-center">
//                             <Controller
//                                 name="pricing.sell.isWarrantyAvailable"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <input
//                                         type="checkbox"
//                                         checked={field.value}
//                                         onChange={(e) => {
//                                             field.onChange(e.target.checked);
//                                             if (!e.target.checked) {
//                                                 setValue('pricing.sell.warrantPeriod', 0);
//                                             }
//                                         }}
//                                         className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
//                                     />
//                                 )}
//                             />
//                             <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                                 Warranty Available
//                             </span>
//                         </label>
//                     </div>
//                     <Controller
//                         name="pricing.sell.warrantPeriod"
//                         control={control}
//                         render={({ field }) => (
//                             <input
//                                 {...field}
//                                 type="number"
//                                 min="0"
//                                 disabled={!sellData?.isWarrantyAvailable}
//                                 value={field.value}
//                                 placeholder='Enter Months'
//                                 className={`block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 ${!sellData?.isWarrantyAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 onChange={(e) => {
//                                     const value = Math.max(0, parseInt(e.target.value) || 0);
//                                     field.onChange(value);
//                                 }}
//                             />
//                         )}
//                     />
//                 </div>

//                 {/* Discounted Price & VAT */}
//                 <div className="space-y-1">
//                     <div className='flex justify-between'>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Final Price (AED)
//                         </label>
//                         <div className="">
//                             <div className="flex space-x-4 items-center">
//                                 <label className="block text-base font-medium text-secondary dark:text-gray-300">
//                                     VAT ({sellData?.vat || 0}%)
//                                 </label>
//                                 <label className="inline-flex items-center">
//                                     <Controller
//                                         name="pricing.sell.vat"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <input
//                                                 type="radio"
//                                                 checked={field.value === 5}
//                                                 onChange={() => field.onChange(5)}
//                                                 className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
//                                             />
//                                         )}
//                                     />
//                                     <span className="ml-2 text-xs font-semibold uppercase text-green-700 dark:text-gray-300">
//                                         Include
//                                     </span>
//                                 </label>
//                                 <label className="inline-flex items-center">
//                                     <Controller
//                                         name="pricing.sell.vat"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <input
//                                                 type="radio"
//                                                 checked={field.value === 0}
//                                                 onChange={() => field.onChange(0)}
//                                                 className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
//                                             />
//                                         )}
//                                     />
//                                     <span className="ml-2 text-xs font-semibold uppercase text-red-700 dark:text-gray-300">
//                                         Exclude
//                                     </span>
//                                 </label>
//                             </div>
//                             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                                 {sellData?.vat > 0
//                                     ? `${sellData.vat}% VAT included (${(parseFloat(sellData?.discountedPrice || 0) * sellData.vat / 100).toFixed(2)} AED)`
//                                     : "No VAT applied"}
//                             </p>
//                         </div>
//                     </div>
//                     <Controller
//                         name="pricing.sell.discountedPrice"
//                         control={control}
//                         render={({ field }) => (
//                             <input
//                                 {...field}
//                                 type="text"
//                                 readOnly
//                                 value={field.value || ''}
//                                 className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 font-semibold"
//                             />
//                         )}
//                     />
//                 </div>
//             </div>

//             {/* Benefits Section */}
//             <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                     <h4 className="text-md font-medium text-green-700 dark:text-gray-300">
//                         Sell Benefits
//                     </h4>
//                     <button
//                         type="button"
//                         onClick={handleAddBenefit}
//                         className="inline-flex items-center px-3 py-1 rounded-md transition duration-200 bg-secondary text-white"
//                     >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                         </svg>
//                         Add Benefit
//                     </button>
//                 </div>

//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
//                     {Array.isArray(sellData?.benefits) && sellData.benefits.map((benefit, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                             <input
//                                 type="text"
//                                 value={benefit || ''}
//                                 onChange={(e) => handleBenefitChange(index, e.target.value)}
//                                 placeholder={`Benefit ${index + 1}`}
//                                 className="flex-1 px-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => handleRemoveBenefit(index)}
//                                 className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
//                                 title="Remove benefit"
//                             >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                 </svg>
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SellPricingForm;


import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const SellPricingForm = ({ control, watch, setValue, singleProduct }) => {
    const [discountType, setDiscountType] = useState('PERCENTAGE');
    const sellData = watch('pricing.sell') || {};
    const [isVatIncluded, setIsVatIncluded] = useState(false);
    const [displayDiscountPrice, setDisplayDiscountPrice] = useState('');

    useEffect(() => {
        const productSellData = singleProduct;

        if (productSellData) {
            // Initialize VAT inclusion based on product data
            const initialVatIncluded = productSellData.vat > 0;
            setIsVatIncluded(initialVatIncluded);

            setValue('pricing.sell.actualPrice',
                productSellData.actualPrice !== undefined ? productSellData.actualPrice : ''
            );

            const initialDiscountType = productSellData?.discountUnit === 'AED' ? 'AED' : 'PERCENTAGE';
            setDiscountType(initialDiscountType);

            setDisplayDiscountPrice(productSellData.discountPrice || '');


            setValue('pricing.sell.discountedPrice', productSellData?.discountedPrice || '');
            setValue('pricing.sell.discountValue', productSellData.discountValue || '');
            setValue('pricing.sell.discountUnit', productSellData.discountUnit || (discountType === 'percentage' ? 'PERCENTAGE' : 'AED'));
            setValue('pricing.sell.benefits', productSellData.benefits?.length > 0 ? productSellData.benefits : ['']);
            setValue('pricing.sell.vat', productSellData.vat !== undefined ? productSellData.vat : 0);
            setValue('pricing.sell.isVatIncluded', initialVatIncluded);
            setValue('pricing.sell.isWarrantyAvailable', productSellData.isWarrantyAvailable || false);
            setValue('pricing.sell.warrantPeriod', productSellData.warrantPeriod || 0);

        } else {

            setIsVatIncluded(false);
            setDisplayDiscountPrice('');
            setValue('pricing.sell', {
                actualPrice: '',

                discountedPrice: '',
                discountValue: '',
                discountUnit: discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'AED',
                benefits: [''],
                vat: 0,
                isVatIncluded: false,
                isWarrantyAvailable: false,
                warrantPeriod: 0
            });
        }
    }, [singleProduct, setValue]);


    const handleDiscountTypeChange = (type) => {
        setDiscountType(type);
        setValue('pricing.sell.discountUnit', type);
        if (type !== discountType) {
            setValue('pricing.sell.discountValue', '');
        }
    };

    const handleVatChange = (includeVat) => {
        setIsVatIncluded(includeVat);
        setValue('pricing.sell.vat', includeVat ? 5 : 0);
        setValue('pricing.sell.isVatIncluded', includeVat);
    };


    // useEffect(() => {
    //     const unit = discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'AED';
    //     setValue('pricing.sell.discountUnit', unit);
    // }, [discountType, setValue]);

    const handleAddBenefit = () => {
        const currentBenefits = Array.isArray(sellData?.benefits)
            ? [...sellData.benefits.filter(b => b !== null)]
            : [''];
        setValue('pricing.sell.benefits', [...currentBenefits, '']);
    };

    const handleRemoveBenefit = (index) => {
        if (!Array.isArray(sellData?.benefits)) return;

        const updatedBenefits = sellData.benefits
            .filter((_, i) => i !== index)
            .filter(b => b !== null);

        setValue('pricing.sell.benefits', updatedBenefits.length > 0 ? updatedBenefits : ['']);
    };

    const handleBenefitChange = (index, value) => {
        if (!Array.isArray(sellData?.benefits)) return;

        const updatedBenefits = [...sellData.benefits];
        updatedBenefits[index] = value;
        setValue('pricing.sell.benefits', updatedBenefits);
    };

    return (
        <div className="p-4 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4 dark:text-white text-green-700 bg-green-50/75 p-3 flex items-center border-gray-300 rounded-lg">
                Sell Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Actual Price */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                        Actual Price (AED)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-800 dark:text-gray-100">
                            <span className="sm:text-sm">AED</span>
                        </div>

                        <Controller
                            name="pricing.sell.actualPrice"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="block w-full pl-12 pr-12 py-2 border-b border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        const value = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Discount Section */}
                <div className="space-y-1">
                    <div className="flex space-x-4 mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Discount
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'PERCENTAGE'}
                                onChange={() => handleDiscountTypeChange('PERCENTAGE')}

                                className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">%</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'AED'}
                                onChange={() => handleDiscountTypeChange('AED')}

                                className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">AED</span>
                        </label>
                    </div>
                    <Controller
                        name="pricing.sell.discountValue"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                min="0"
                                value={field.value || ''}
                                className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                                onChange={(e) => {
                                    const value = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
                                    field.onChange(value);
                                }}
                            />
                        )}
                    />
                </div>

                {/* Warranty Section */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Warranty Period (Months)
                        </label>
                        <label className="inline-flex items-center">
                            <Controller
                                name="pricing.sell.isWarrantyAvailable"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            if (!e.target.checked) {
                                                setValue('pricing.sell.warrantPeriod', 0);
                                            }
                                        }}
                                        className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                                    />
                                )}
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Warranty Available
                            </span>
                        </label>
                    </div>
                    <Controller
                        name="pricing.sell.warrantPeriod"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                min="0"
                                disabled={!sellData?.isWarrantyAvailable}
                                value={field.value}
                                placeholder='Enter Months'
                                className={`block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 ${!sellData?.isWarrantyAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onChange={(e) => {
                                    const value = Math.max(0, parseInt(e.target.value) || 0);
                                    field.onChange(value);
                                }}
                            />
                        )}
                    />
                </div>


                <div className="space-y-1">
                    <div className='flex justify-between'>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Final Price (AED)
                        </label>
                        <div className="">
                            <div className="flex space-x-4 items-center">
                                <label className="block text-base font-medium text-secondary dark:text-gray-300">
                                    VAT ({sellData?.vat || 0}%)
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        checked={isVatIncluded}
                                        onChange={() => handleVatChange(true)}
                                        className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                                    />
                                    <span className="ml-2 text-xs font-semibold uppercase text-green-700 dark:text-gray-300">
                                        Include
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        checked={!isVatIncluded}
                                        onChange={() => handleVatChange(false)}
                                        className="h-4 w-4 text-secondary focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                                    />
                                    <span className="ml-2 text-xs font-semibold uppercase text-red-700 dark:text-gray-300">
                                        Exclude
                                    </span>
                                </label>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {isVatIncluded
                                    ? `5% VAT included (${(parseFloat(sellData?.discountedPrice || 0) * 0.05).toFixed(2)} AED)`
                                    : "No VAT applied"}
                            </p>
                        </div>
                    </div>
                    <input
                        type="text"
                        readOnly
                        value={displayDiscountPrice}
                        className="block w-full pl-12 pr-12 py-2 border-b border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-green-700 dark:text-gray-300">
                        Sell Benefits
                    </h4>
                    <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="inline-flex items-center px-3 py-1 rounded-md transition duration-200 bg-secondary text-white"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Benefit
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {Array.isArray(sellData?.benefits) && sellData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={benefit || ''}
                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                placeholder={`Benefit ${index + 1}`}
                                className="flex-1 px-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveBenefit(index)}
                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                                title="Remove benefit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellPricingForm;