

import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../Context/CategoryContext';
import useImageUploadStore from '../../Context/ImageUploadContext';
import useBrandStore from '../../Context/BrandContext';
import SpecificationFields from '../formComponet/SpecificationFields';
import useProductStore from '../../Context/ProductContext';
import { RxCross2, RxCrossCircled } from 'react-icons/rx';




const DemoProduct = () => {
    const { createProduct } = useProductStore()
    const [productData, setProductData] = useState({
        basicInfo: {
            name: '',
            description: '',
            shortDescription: '',
            longDescription: '',
            manufacturer: ''
        },
        category: {
            main: null,
            sub: null
        },
        brand: null,
        pricing: {
            sell: null,
            rent: null,
            services: {
                oneTime: null,
                mmc: null,
                amcBasic: null,
                amcGold: null
            }
        },
        inventory: {
            sku: '',
            quantity: 0,
            stockStatus: 'IN_STOCK'
        },
        keyFeatures: [],
        specifications: [],
        images: []
    });

    const handleInputChange = (section, field, value) => {

        setProductData(prev => {
            if (field === 'images') {
                return {
                    ...prev,
                    [section]: value
                };
            }


            if (field === null) {
                return {
                    ...prev,
                    [section]: value
                };
            }


            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = preparePayload(productData);

        if (payload?.categoryId && payload?.brandId) {
            try {
                const response = await createProduct(payload);
                if (response.name) {
                    alert("Product created successfully!");
                }
            } catch (error) {
                alert("Error occurred while creating the product.");
            }
        } else {
            alert('Please make sure Category and Brand fields are filled.');
        }
    };



    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <ProductBasicInfo data={productData.basicInfo} onChange={handleInputChange} />
                    <CategoryBrandSelection
                        category={productData.category}
                        brand={productData.brand}
                        onChange={handleInputChange}
                    />
                    <PricingOptions
                        pricing={productData.pricing}
                        onChange={handleInputChange}
                    />

                    <SpecificationFields specs={productData.specifications}
                        onChange={handleInputChange} />

                    <InventorySection
                        inventory={productData.inventory}
                        onChange={handleInputChange}
                    />
                    <KeyFeaturesFields
                        features={productData.keyFeatures}
                        onChange={handleInputChange}
                    />
                    <ImageUploader
                        images={productData.images}
                        onChange={(images) => handleInputChange('images', 'images', images)}
                    />

                    <div className="flex justify-end pt-4 border-t">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const preparePayload = (productData) => {
    const payload = {
        name: productData.basicInfo.name,
        description: productData.basicInfo.shortDescription,
        longDescription: productData.basicInfo.longDescription,
        manufacturer: productData.basicInfo.manufacturer,
        brandId: +productData?.brand?.brand,
        imageUrls: productData.images.map(img => img?.url?.fileUrl || ''),
        specifications: productData.specifications.map(spec => ({
            name: spec.name,
            value: spec.value
        })),
        productFor: {
            sell: {
                actualPrice: productData.pricing?.sell?.actualPrice || 0,
                discountPrice: productData.pricing?.sell?.discountedPrice || 0,
                benefits: productData.pricing?.sell?.benefits || []
            },
            rent: {
                monthlyPrice: productData.pricing?.rent?.monthlyPrice || 0,
                discountPrice: productData.pricing?.rent?.discountedPrice || 0,
                benefits: productData.pricing?.rent?.benefits || []
            },
            requestQuotation: {
                actualPrice: productData.pricing?.requestQuotation?.actualPrice || 0,
                discountPrice: productData.pricing?.requestQuotation?.discountedPrice || 0
            },
            service: {
                ots: {
                    price: productData.pricing?.services?.oneTime?.price || 0,
                    benefits: Array.isArray(productData.pricing?.services?.oneTime?.benefits)
                        ? productData.pricing?.services?.oneTime?.benefits
                        : []
                },
                mmc: {
                    price: productData.pricing?.services?.mmc?.price || 0,
                    benefits: Array.isArray(productData.pricing?.services?.mmc?.benefits)
                        ? productData.pricing?.services?.mmc?.benefits
                        : []
                },
                amcBasic: {
                    price: productData.pricing?.services?.amcBasic?.price || 0,
                    benefits: Array.isArray(productData.pricing?.services?.amcBasic?.benefits)
                        ? productData.pricing?.services?.amcBasic?.benefits
                        : []
                },
                amcGold: {
                    price: productData.pricing?.services?.amcGold?.price || 0,
                    benefits: Array.isArray(productData.pricing?.services?.amcGold?.benefits)
                        ? productData.pricing?.services?.amcGold?.benefits
                        : []
                },
            }
        },
        categoryId: +productData.category.main.categoryId,
        subCategoryId: +productData.category.sub || "",
        inventory: {
            quantity: productData.inventory.quantity || 0,
            sku: productData.inventory.sku || '',
            stockStatus: productData.inventory.stockStatus || 'IN_STOCK'
        },
        keyFeatures: productData.keyFeatures || []
    };



    return payload;
};





export default DemoProduct;

const ProductBasicInfo = ({ data, onChange }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Product Name*</label>
                    <input
                        value={data.name}
                        onChange={(e) => onChange('basicInfo', 'name', e.target.value)}
                        required
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                    <input
                        value={data.manufacturer}
                        onChange={(e) => onChange('basicInfo', 'manufacturer', e.target.value)}
                        placeholder="Manufacturer name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <input
                        value={data.shortDescription}
                        onChange={(e) => onChange('basicInfo', 'shortDescription', e.target.value)}
                        placeholder="Brief product description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Long Description</label>
                    <textarea
                        value={data.longDescription}
                        onChange={(e) => onChange('basicInfo', 'longDescription', e.target.value)}
                        placeholder="Detailed product description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};






const CategoryBrandSelection = ({ category, brand, onChange }) => {
    const {
        flatCategoryList,
        subCategories,
        getAllCategories,
        setSelectedCategory,
    } = useCategoryStore();

    const { brands, getAllBrands } = useBrandStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getAllBrands();
        getAllCategories();
    }, []);

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Category & Brand</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 relative">
                    <label className="block text-sm font-medium text-gray-700">Main Category*</label>
                    <div className="relative" onClick={() => setIsOpen(!isOpen)}>
                        <button
                            type="button"
                            className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none flex justify-between items-center"
                        >
                            <span>{category.main?.name || 'Select Category'}</span>
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {isOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
                                <div className="px-3 py-2 border-b">
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="py-1">
                                    {flatCategoryList.map(cat => (
                                        <div
                                            key={cat.categoryId}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                onChange('category', 'main', cat);
                                                setSelectedCategory(cat.categoryId); // ✅ Fetch subcategories
                                                setIsOpen(false);
                                                setSearchTerm('');
                                            }}
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {category.main && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                        <select
                            value={category.sub}
                            onChange={(e) => onChange('category', 'sub', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select Sub Category</option>
                            {subCategories.map(subCat => (
                                <option key={subCat.categoryId} value={subCat.categoryId}>
                                    {subCat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Brand*</label>
                    <select
                        value={brand || ""}
                        onChange={(e) => onChange('brand', 'brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select Brand</option>
                        {brands.map(b => (
                            <option key={b.brandId} value={b.brandId}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
};




const PricingOptions = ({ pricing, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (option) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pricing Options</h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes('sell')}
                        onChange={() => handleOptionChange('sell')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Sell</span>
                </label>

                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes('rent')}
                        onChange={() => handleOptionChange('rent')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Rent</span>
                </label>

                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes('service')}
                        onChange={() => handleOptionChange('service')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Service</span>
                </label>

                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes('quotation')}
                        onChange={() => handleOptionChange('quotation')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Request a Quotation</span>
                </label>
            </div>

            <div className="space-y-6">
                {selectedOptions.includes('sell') && (
                    <SellPricingForm
                        data={pricing.sell}
                        onChange={(data) => onChange('pricing', 'sell', data)}
                    />
                )}

                {selectedOptions.includes('rent') && (
                    <RentPricingForm
                        data={pricing.rent}
                        onChange={(data) => onChange('pricing', 'rent', data)}
                    />
                )}

                {selectedOptions.includes('service') && (
                    <ServiceOptions
                        services={pricing.services}
                        onChange={(data) => onChange('pricing', 'services', data)}
                    />
                )}

                {selectedOptions.includes('quotation') && (
                    <QuotationForm
                        data={pricing.quotation}
                        onChange={(data) => onChange('pricing', 'quotation', data)}
                    />
                )}
            </div>
        </div>
    );
};

const QuotationForm = ({ data, onChange }) => {
    const [formData, setFormData] = useState(data || {
        name: '',
        mobile: '',
        companyName: '',
        location: ''
    });

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        onChange(updated);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Request a Quotation</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile*</label>
                    <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        placeholder="Enter your mobile number"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (if any)</label>
                    <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        placeholder="Enter company name"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="Enter location"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                    <div className="mt-1 flex items-center">
                        <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Choose File
                            <input type="file" className="sr-only" />
                        </label>
                        <span className="ml-2 text-sm text-gray-500">No file chosen</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SellPricingForm = ({ data, onChange }) => {
    const [formData, setFormData] = useState(data || {
        price: '',
        discount: '',
        discountedPrice: '',
        benefits: ['']
    });
    const [discountType, setDiscountType] = useState('percentage');

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };

        // Calculate discounted price
        if (field === 'price' || field === 'discount') {
            if (discountType === 'percentage') {
                updated.discountedPrice = updated.price && updated.discount
                    ? (updated.price - (updated.price * updated.discount / 100)).toFixed(2)
                    : '';
            } else {
                updated.discountedPrice = updated.price && updated.discount
                    ? (updated.price - updated.discount).toFixed(2)
                    : '';
            }
        }
        console.log(updated, "ippp")
        setFormData(updated);
        onChange(updated);
    };

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits[index] = value;
        handleChange('benefits', updatedBenefits);
    };

    const addBenefit = () => {
        handleChange('benefits', [...formData.benefits, '']);
    };

    const removeBenefit = (index) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits.splice(index, 1);
        handleChange('benefits', updatedBenefits);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Sell Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Price (AED)</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">AED</span>
                        </div>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            className="block w-full pl-12 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex space-x-4 mb-1">
                        <label className="block text-sm font-medium text-gray-700">Discount</label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'percentage'}
                                onChange={() => setDiscountType('percentage')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">%</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'fixed'}
                                onChange={() => setDiscountType('fixed')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">AED</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleChange('discount', parseFloat(e.target.value))}
                        min="0"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Discounted Price (AED)</label>
                    <input
                        type="text"
                        value={formData.discountedPrice}
                        readOnly
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700">Purchase Benefits</h4>
                    <button
                        type="button"
                        onClick={addBenefit}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Benefit
                    </button>
                </div>

                {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                            placeholder={`Benefit ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {formData.benefits.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="p-2 text-red-600 hover:text-red-800"
                                title="Remove benefit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};




const RentPricingForm = ({ data, onChange }) => {
    const [formData, setFormData] = useState(data || {
        monthlyPrice: '',
        discount: '',
        discountedPrice: '',
        benefits: ['']
    });
    const [discountType, setDiscountType] = useState('percentage');

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };

        // Calculate discounted price
        if (field === 'monthlyPrice' || field === 'discount') {
            if (discountType === 'percentage') {
                updated.discountedPrice = updated.monthlyPrice && updated.discount
                    ? (updated.monthlyPrice - (updated.monthlyPrice * updated.discount / 100)).toFixed(2)
                    : '';
            } else {
                updated.discountedPrice = updated.monthlyPrice && updated.discount
                    ? (updated.monthlyPrice - updated.discount).toFixed(2)
                    : '';
            }
        }

        setFormData(updated);
        onChange(updated);
    };

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits[index] = value;
        handleChange('benefits', updatedBenefits);
    };

    const addBenefit = () => {
        handleChange('benefits', [...formData.benefits, '']);
    };

    const removeBenefit = (index) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits.splice(index, 1);
        handleChange('benefits', updatedBenefits);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Rent Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Monthly Price (AED)</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">AED</span>
                        </div>
                        <input
                            type="number"
                            value={formData.monthlyPrice}
                            onChange={(e) => handleChange('monthlyPrice', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            className="block w-full pl-12 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex space-x-4 mb-1">
                        <label className="block text-sm font-medium text-gray-700">Discount</label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'percentage'}
                                onChange={() => setDiscountType('percentage')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">%</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'fixed'}
                                onChange={() => setDiscountType('fixed')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">AED</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleChange('discount', parseFloat(e.target.value))}
                        min="0"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Discounted Price (AED)</label>
                    <input
                        type="text"
                        value={formData.discountedPrice}
                        readOnly
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700">Rental Benefits</h4>
                    <button
                        type="button"
                        onClick={addBenefit}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Benefit
                    </button>
                </div>

                {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                            placeholder={`Benefit ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {formData.benefits.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="p-2 text-red-600 hover:text-red-800"
                                title="Remove benefit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const ServiceOptions = ({ services, onChange }) => {
    const [selectedServices, setSelectedServices] = useState({
        oneTime: false,
        mmc: false,
        amcBasic: false,
        amcGold: false
    });

    const handleServiceToggle = (service) => {
        const updated = {
            ...selectedServices,
            [service]: !selectedServices[service]
        };
        setSelectedServices(updated);

        // Clear service data if unselected
        if (!updated[service]) {
            onChange({
                ...services,
                [service]: null
            });
        }
    };

    const handleServiceChange = (service, data) => {
        onChange({
            ...services,
            [service]: data
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Service Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(selectedServices).map(([key, isSelected]) => (
                    <label key={key} className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleServiceToggle(key)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{getServiceLabel(key)}</span>
                    </label>
                ))}
            </div>

            <div className="space-y-6">
                {selectedServices.oneTime && (
                    <ServiceForm
                        service={services.oneTime}
                        onChange={(data) => handleServiceChange('oneTime', data)}
                        label="One Time Service"
                        priceLabel="Price (Per Service)"
                    />
                )}

                {selectedServices.mmc && (
                    <ServiceForm
                        service={services.mmc}
                        onChange={(data) => handleServiceChange('mmc', data)}
                        label="MMC Service"
                        priceLabel="Price (Per Month)"
                    />
                )}

                {selectedServices.amcBasic && (
                    <ServiceForm
                        service={services.amcBasic}
                        onChange={(data) => handleServiceChange('amcBasic', data)}
                        label="AMC Basic Service"
                        priceLabel="Price (Per Year)"
                    />
                )}

                {selectedServices.amcGold && (
                    <ServiceForm
                        service={services.amcGold}
                        onChange={(data) => handleServiceChange('amcGold', data)}
                        label="AMC Gold Service"
                        priceLabel="Price (Per Year)"
                    />
                )}
            </div>
        </div>
    );
};

const getServiceLabel = (key) => {
    switch (key) {
        case 'oneTime': return 'One Time Service';
        case 'mmc': return 'MMC Service';
        case 'amcBasic': return 'AMC Basic';
        case 'amcGold': return 'AMC Gold';
        default: return key;
    }
};



const ServiceForm = ({ service, onChange, label, priceLabel }) => {
    const [formData, setFormData] = useState(service || {
        price: '',
        benefits: ['']
    });

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        onChange(updated);
    };

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits[index] = value;
        handleChange('benefits', updatedBenefits);
    };

    const addBenefit = () => {
        handleChange('benefits', [...formData.benefits, '']);
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">{label}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">{priceLabel}</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">AED</span>
                        </div>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            className="block w-full pl-12 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Benefits</label>
                    <div className="space-y-2">
                        {formData.benefits.map((benefit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={benefit}
                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                placeholder={`Benefit ${index + 1}`}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addBenefit}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Benefit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



const InventorySection = ({ inventory, onChange }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Inventory</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                        type="text"
                        value={inventory.sku}
                        onChange={(e) => onChange('inventory', 'sku', e.target.value)}
                        placeholder="Product SKU"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={inventory.quantity}
                        onChange={(e) => onChange('inventory', 'quantity', parseInt(e.target.value))}
                        placeholder="Available quantity"
                        min="0"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                    <select
                        value={inventory.stockStatus}
                        onChange={(e) => onChange('inventory', 'stockStatus', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="IN_STOCK">In Stock</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                        <option value="PRE_ORDER">Pre-order</option>
                    </select>
                </div>
            </div>
        </div>
    );
};





const KeyFeaturesFields = ({ features = [], onChange }) => {
    const [keyFeatures, setKeyFeatures] = useState(features.length > 0 ? features : ['']);

    // Ensure we always have at least one empty field
    useEffect(() => {
        if (keyFeatures.length === 0) {
            setKeyFeatures(['']);
        }
    }, [keyFeatures]);

    // Notify parent of changes
    useEffect(() => {
        // Filter out empty strings before sending to parent
        const nonEmptyFeatures = keyFeatures.filter(feature => feature.trim() !== '');
        onChange('keyFeatures', null, nonEmptyFeatures);
    }, [keyFeatures]);

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...keyFeatures];
        updatedFeatures[index] = value;
        setKeyFeatures(updatedFeatures);
    };

    const addFeature = () => {
        setKeyFeatures([...keyFeatures, '']);
    };

    const removeFeature = (index) => {
        if (keyFeatures.length <= 1) {
            // If it's the last feature, just clear it instead of removing
            const updatedFeatures = [...keyFeatures];
            updatedFeatures[index] = '';
            setKeyFeatures(updatedFeatures);
        } else {
            const updatedFeatures = keyFeatures.filter((_, i) => i !== index);
            setKeyFeatures(updatedFeatures);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h2>

            <div className="space-y-3">
                {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-1">
                            <textarea
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder={`Enter key feature #${index + 1}`}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="mt-2 px-2 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                            title="Remove feature"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Feature
                </button>
            </div>
        </div>
    );
};





const ImageUploader = ({ images, onChange }) => {
    const { uploadFiles, isLoading } = useImageUploadStore();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChooseFiles = async (e) => {
        const files = Array.from(e.target.files);
        const validImages = [];

        for (const file of files) {
            const image = new Image();
            const objectUrl = URL.createObjectURL(file);

            const isValid = await new Promise((resolve) => {
                image.onload = () => {
                    const is500x500 = image.width === 500 && image.height === 500;
                    const isUnder500KB = file.size <= 500 * 1024; // 500KB in bytes
                    URL.revokeObjectURL(objectUrl);
                    resolve(is500x500 && isUnder500KB);
                };
                image.onerror = () => resolve(false);
                image.src = objectUrl;
            });

            if (isValid) {
                validImages.push(file);
            } else {
                const sizeKB = (file.size / 1024).toFixed(2);
                alert(`"${file.name}" is either not 500x500 pixels or larger than 500KB (${sizeKB}KB). It will be skipped.`);
            }
        }

        setSelectedFiles(validImages);
    };


    const resetImage = () => {
        setSelectedFiles([])
    }
    const removeImage = (name) => {
        const filterImages = selectedFiles.filter((e) => e.name != name)
        setSelectedFiles(filterImages)
    }
    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        const uploaded = await uploadFiles(selectedFiles);
        if (uploaded) {
            onChange([...images, ...uploaded]);
            setSelectedFiles([]);
        }
    };

    return (
        <section className="bg-white p-6 rounded-2xl shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Product Images</h2>

            <div className="space-y-4">
                <div className="flex items-center gap-4">


                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    >
                        Choose Images
                    </label>


                    <button
                        onClick={handleUpload}
                        disabled={isLoading || selectedFiles.length === 0}
                        className={`px-4 py-2 rounded-md text-white ${selectedFiles.length === 0 || isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            } transition duration-200`}
                    >
                        {isLoading ? "Uploading..." : "Upload"}
                    </button>
                    <button
                        onClick={() => resetImage()}
                        disabled={isLoading || selectedFiles.length === 0}
                        className={`px-4 py-2 bg-red-500 rounded-lg text-white font-bold `}
                    >
                        Reset Images
                    </button>

                    <p className="text-sm text-gray-500 italic mt-2">
                        Only 500x500 pixel images are allowed. size should be 500kb
                    </p>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChooseFiles}
                        className="hidden"
                    />
                </div>

                {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {selectedFiles.map((file, index) => {
                            return (
                                <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden shadow-sm border">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {index === 0 && (
                                        <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                            Main Image
                                        </span>
                                    )}

                                    <span onClick={() => removeImage(file.name)} className="absolute top-1 right-1  text-white text-xs px-2 py-1 rounded">
                                        <RxCrossCircled className=' text-xl text-red-500' />
                                    </span>


                                </div>
                            )
                        })}
                    </div>
                )}

                {images.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Uploaded Images:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((img, index) => {
                                return (
                                    <div key={index} className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={img?.url?.fileUrl}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {index === 0 && (
                                            <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                Main Image
                                            </span>
                                        )}
                                        <div>
                                            <RxCrossCircled className='text-lg text-red-500' />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
