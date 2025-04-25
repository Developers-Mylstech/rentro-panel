

import React, { useEffect, useRef, useState } from 'react';
import useCategoryStore from '../../Context/CategoryContext';
import useImageUploadStore from '../../Context/ImageUploadContext';
import useBrandStore from '../../Context/BrandContext';
import SpecificationFields from '../formComponet/SpecificationFields';
import useProductStore from '../../Context/ProductContext';
import { RxCross2, RxCrossCircled } from 'react-icons/rx';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { FiSend, FiTrash2, FiUpload, FiUploadCloud, FiX } from 'react-icons/fi';
import { FaSpinner } from "react-icons/fa";
import { Toast } from 'primereact/toast';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import "../../index.css"
import { useParams } from 'react-router-dom';




const DemoProduct = () => {
    const { createProduct, getProductsById, singleProduct } = useProductStore()
    const { id } = useParams();

    const [loading, setLoading] = useState(false)
    const toast = useRef(null);
    const [focusedFields, setFocusedFields] = useState({
        name: false,
        description: false,
        shortDescription: false,
        longDescription: false,
        manufacturer: false,
        supplierName: false,
        supplierCode: false,
        modelNo: false,
    });


    useEffect(() => {
        if (id) {
            getProductsById(id)
        }
    }, [id]);

    console.log(singleProduct, 'productById')

    const handleEdit = () => {
        setProductData({
            basicInfo: {
                name: '' || singleProduct?.name,
                description: '',
                shortDescription: '',
                longDescription: '',
                manufacturer: '',
                supplierName: '',
                supplierCode: '',
                modelNo: '',
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
        })
    }

    const [productData, setProductData] = useState({
        basicInfo: {
            name: '',
            description: '',
            shortDescription: '',
            longDescription: '',
            manufacturer: '',
            supplierName: '',
            supplierCode: '',
            modelNo: '',
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

    const showToast = (severity, summary, detail) => {
        toast.current.show({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 3000
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = preparePayload(productData);

        if (payload?.categoryId && payload?.brandId) {
            try {
                setLoading(true)
                const response = await createProduct(payload);
                if (response.name) {
                    setLoading(false)
                    showToast('success', 'Success', 'Product created successfully!');
                }
            } catch (error) {
                setLoading(false);
                showToast('error', 'Error', 'Failed to create product. Please try again.');
                console.error('Error creating product:', error);
            }
        } else {
            showToast('warn', 'Warning', 'Please make sure Category and Brand fields are filled.');
        }
    };



    return (
        <div className="mx-auto px-4 py-8">
            <Toast ref={toast} position="top-right" />

            <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-b dark:border-gray-600 pb-2">
                    Add New Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8 text-gray-700 dark:text-gray-300">
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
                    <SpecificationFields
                        specs={productData.specifications}
                        onChange={handleInputChange}
                    />
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

                    <div className="flex justify-end pt-4 border-t dark:border-gray-600">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {loading ? <FaSpinner className='animate-spin' /> : 'Add New Product '}
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
        modelNo: productData.basicInfo.modelNo,
        supplierName: productData.basicInfo.supplierName,
        supplierCode: productData.basicInfo.supplierCode,
        productFor: {
            sell: {
                actualPrice: productData.pricing?.sell?.price || 0,
                discountPrice: productData.pricing?.sell?.discountedPrice || 0,
                benefits: productData.pricing?.sell?.benefits || [],
                isWarrantyAvailable: productData.pricing?.sell?.isWarrantyAvailable || false,
                warrantPeriod: +productData.pricing?.sell?.warrantPeriod || 0
            },
            rent: {
                monthlyPrice: productData.pricing?.rent?.monthlyPrice || 0,
                discountPrice: productData.pricing?.rent?.discountedPrice || 0,
                benefits: productData.pricing?.rent?.benefits || [],
                isWarrantyAvailable: productData.pricing?.rent?.isWarrantyAvailable || false,
                warrantPeriod: +productData.pricing?.rent?.warrantPeriod || 0
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Product Information</h2>
                <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">Required fields*</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                    <FloatLabel className='active:text-blue-500'>
                        {/* <div className="flex items-center justify-between"> */}
                        {/* <span className="text-xs text-red-500">*required</span> */}
                        {/* </div> */}
                        <InputText
                            value={data.name}
                            id='name'
                            onChange={(e) => onChange('basicInfo', 'name', e.target.value)}
                            required
                            // placeholder="e.g. Premium Wireless Headphones"
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <label htmlFor='name' className="block text-sm font-medium text-gray-700 dark:text-gray-300 focus:text-blue-500">Product Name</label>
                    </FloatLabel>
                    {!data.name && (
                        <p className="text-xs text-red-500 mt-1">Product name is required</p>
                    )}
                </div>
                <div className="space-y-2">
                    {/* <div className="flex items-center justify-between">
                    </div> */}
                    <FloatLabel>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Model No</label>
                        <InputText
                            value={data.modelNo}
                            onChange={(e) => onChange('basicInfo', 'modelNo', e.target.value)}
                            required
                            // placeholder="Enter Model No."
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </FloatLabel>

                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatLabel>
                            <InputText
                                value={data.manufacturer}
                                onChange={(e) => onChange('basicInfo', 'manufacturer', e.target.value)}
                                // placeholder="e.g. Sony, Apple, Samsung"
                                className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                            />
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturer</label>
                        </FloatLabel>
                        {data.manufacturer && (
                            <button
                                onClick={() => onChange('basicInfo', 'manufacturer', '')}
                                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label="Clear manufacturer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <FloatLabel>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Supplier Name</label>
                            <InputText
                                value={data.supplierName}
                                onChange={(e) => onChange('basicInfo', 'supplierName', e.target.value)}
                                // placeholder="Enter Supplier Name"
                                className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                            />
                        </FloatLabel>
                        {data.supplierName && (
                            <button
                                onClick={() => onChange('basicInfo', 'supplierName', '')}
                                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label="Clear manufacturer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="relative">
                        <FloatLabel>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Supplier Code</label>
                            <InputText
                                value={data.supplierCode}
                                onChange={(e) => onChange('basicInfo', 'supplierCode', e.target.value)}
                                // placeholder="Enter Supplier Code"
                                className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                            />
                        </FloatLabel>
                        {data.supplierCode && (
                            <button
                                onClick={() => onChange('basicInfo', 'supplierCode', '')}
                                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label="Clear manufacturer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <div className="relative">
                        <FloatLabel>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                            <InputText
                                value={data.shortDescription}
                                onChange={(e) => onChange('basicInfo', 'shortDescription', e.target.value)}
                                // placeholder="Brief product description (max 160 characters)"
                                maxLength={160}
                                className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                            />
                        </FloatLabel>
                        <span className="absolute right-2 bottom-2 text-xs text-gray-400 dark:text-gray-500">
                            {data.shortDescription?.length || 0}/160
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This will appear in product cards and search results</p>
                </div>

                {/* Long Description */}
                <div className="space-y-2 md:col-span-2">
                    <FloatLabel>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                        <InputTextarea
                            value={data.longDescription}
                            onChange={(e) => onChange('basicInfo', 'longDescription', e.target.value)}
                            // placeholder="Detailed product description with features and benefits"
                            rows={3}
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </FloatLabel>

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
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [brandSearchTerm, setBrandSearchTerm] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        getAllCategories();
        getAllBrands();
    }, []);

    const filteredCategories = flatCategoryList.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );



    const selectedSubCategoryOption = subCategories.find(sub => sub.categoryId === category.sub);

    const selectedCategoryOption = category.main
        ? filteredCategories.find(cat => cat.categoryId === category.main.categoryId) || null
        : null;

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Category & Brand</h2>
                <span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">Required fields*</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Category */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Main Category</label>
                        <span className="text-xs text-red-500">*required</span>
                    </div>

                    <Dropdown
                        id="mainCategory"
                        value={selectedCategoryOption}
                        onChange={(e) => {
                            console.log("Selected value:", e.value);
                            onChange('category', 'main', e.value);
                            setSelectedCategory(e.value?.categoryId);
                        }}
                        options={filteredCategories}
                        optionLabel="name"
                        placeholder="Select Category"
                        filter
                        filterBy="name"
                        className={classNames('w-full border dark:border-gray-600 focus:outline-none focus:ring-0 bg-white dark:bg-gray-900', {
                            'p-invalid': !category.main && isTouched
                        })}
                        onFocus={() => setIsTouched(true)}
                        filterPlaceholder="Search categories..."
                        emptyFilterMessage="No categories found"
                        valueTemplate={(option) => {
                            return option ? (
                                <div className="flex items-center text-gray-800 dark:text-gray-100">
                                    <span>{option.name}</span>
                                </div>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">Select Category</span>
                            );
                        }}
                        itemTemplate={(option) => {
                            return (
                                <div className="flex items-center text-gray-800 dark:text-gray-100">
                                    <span>{option.name}</span>
                                </div>
                            );
                        }}
                    />

                    {!category.main && isTouched && (
                        <small className="p-error">Please select a main category</small>
                    )}
                </div>

                {category.main && (
                    <div className="space-y-2">
                        <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub Category</label>
                        <Dropdown
                            id="subCategory"
                            value={selectedSubCategoryOption}
                            onChange={(e) => onChange('category', 'sub', e.value?.categoryId || '')}
                            options={subCategories}
                            optionLabel="name"
                            placeholder="Select Sub Category"
                            className="w-full border dark:border-gray-600 p-dropdown:focus-none bg-white dark:bg-gray-900"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
                        <span className="text-xs text-red-500">*required</span>
                    </div>

                    <Dropdown
                        id="brand"
                        value={selectedBrand}
                        onChange={(e) => {
                            onChange('brand', 'brand', e.value?.brandId || '');
                            setSelectedBrand(e.value);
                            setIsTouched(true);
                        }}
                        options={filteredBrands}
                        optionLabel="name"
                        placeholder="Select Brand"
                        filter
                        filterBy="name"
                        className={classNames('w-full border bg-white dark:bg-gray-900 dark:border-gray-600 outline-none p-dropdown:focus-none', {
                            'p-invalid': !brand && isTouched
                        })}
                        onFocus={() => setIsTouched(true)}
                        filterPlaceholder="Search brands..."
                        emptyFilterMessage="No brands found"
                    />

                    {!brand && isTouched && (
                        <small className="p-error">Please select a brand</small>
                    )}
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Pricing Options</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Sell', value: 'sell', color: "green-500" },
                    { label: 'Rent', value: 'rent', color: "orange-500" },
                    { label: 'Service', value: 'service', color: "purple-500" },
                    { label: 'Request a Quotation', value: 'quotation', color: "blue-500" },
                ].map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                ${selectedOptions.includes(option.value)
                                ? ` border-${option.color} text-${option.color} `
                                : `bg-white border-${option.color} text-${option.color} hover:border-${option.color} dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 hover:dark:border-blue-400`}
            `}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.value)}
                            onChange={() => handleOptionChange(option.value)}
                            className="form-checkbox h-5 w-5  text-blue-600 dark:text-blue-500 focus:ring-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 "
                        />
                        <span className="text-sm font-medium">{option.label}</span>
                    </label>
                ))}
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



const SellPricingForm = ({ data, onChange, }) => {
    const [formData, setFormData] = useState(data || {
        price: '',
        discount: '',
        discountedPrice: '',
        benefits: [''],
        vatIncluded: false,
        isWarrantyAvailable: false,
        warrantPeriod: 1,
    });
    const [discountType, setDiscountType] = useState('percentage');

    useEffect(() => {
        calculateDiscountedPrice();
    }, [formData.price, formData.discount, discountType, formData.vatIncluded]);

    const calculateDiscountedPrice = () => {
        let basePrice = parseFloat(formData.price) || 0;
        let discountValue = parseFloat(formData.discount) || 0;
        let discountedPrice = basePrice;

        if (basePrice && discountValue) {
            if (discountType === 'percentage') {
                discountedPrice = basePrice - (basePrice * discountValue / 100);
            } else {
                discountedPrice = basePrice - discountValue;
            }
        }

        if (formData.vatIncluded) {
            discountedPrice = discountedPrice * 1.05
        }

        if (discountedPrice !== parseFloat(formData.discountedPrice || 0)) {
            const updated = {
                ...formData,
                discountedPrice: discountedPrice.toFixed(2)
            };
            setFormData(updated);
            onChange(updated);
        }
    };

    const handleChange = (field, value) => {

        const updated = {
            ...formData,
            [field]: value,
            isWarrantyAvailable: field === 'warrantPeriod' ? value !== null : formData.isWarrantyAvailable
        };

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
        <div className="p-4 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Sell Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Price (AED)</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-800 dark:text-gray-100">
                            <span className="sm:text-sm">AED</span>
                        </div>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', parseFloat(e.target.value) || '')}
                            min="0"
                            step="0.01"
                            className="block w-full pl-12 pr-12 py-2 border-b  border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex space-x-4 mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discount</label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'percentage'}
                                onChange={() => setDiscountType('percentage')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">%</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'fixed'}
                                onChange={() => setDiscountType('fixed')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">AED</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleChange('discount', parseFloat(e.target.value) || '')}
                        min="0"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Warranty Period (Months)</label>
                    <input
                        type="number"
                        value={formData.warrantPeriod || ''}
                        onChange={(e) => handleChange('warrantPeriod', e.target.value || null)}
                        className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discounted Price (AED)</label>
                    <input
                        type="text"
                        value={formData.discountedPrice}
                        readOnly
                        className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

            </div>

            <div className="mb-6">
                <div className="flex space-x-4 items-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">VAT (5%)</label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            checked={formData.vatIncluded}
                            onChange={() => handleChange('vatIncluded', true)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Included</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            checked={!formData.vatIncluded}
                            onChange={() => handleChange('vatIncluded', false)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Excluded</span>
                    </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formData.vatIncluded
                        ? "5% VAT is included in the displayed prices"
                        : "5% VAT will be added at checkout"}
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Purchase Benefits</h4>
                    <button
                        type="button"
                        onClick={addBenefit}
                        className="inline-flex items-center px-3 py-1 rounded-md transition duration-200 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
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
                            className="flex-grow px-3 py-2 border-b  border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                        >
                            Remove
                        </button>
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
        benefits: [''],
        vatIncluded: true,
        vatAmount: '',
        isWarrantyAvailable: false,
        warrantPeriod: 1,
    });
    const [discountType, setDiscountType] = useState('percentage');

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };

        // Discounted Price Calculation
        if (field === 'monthlyPrice' || field === 'discount' || field === 'vatIncluded') {
            let priceAfterDiscount = 0;

            if (discountType === 'percentage') {
                priceAfterDiscount =
                    updated.monthlyPrice && updated.discount
                        ? updated.monthlyPrice - (updated.monthlyPrice * updated.discount / 100)
                        : updated.monthlyPrice;
            } else {
                priceAfterDiscount =
                    updated.monthlyPrice && updated.discount
                        ? updated.monthlyPrice - updated.discount
                        : updated.monthlyPrice;
            }

            // VAT calculation (assume 5% VAT)
            const vat = updated.vatIncluded && priceAfterDiscount ? (priceAfterDiscount * 0.05) : 0;

            updated.discountedPrice = priceAfterDiscount ? (priceAfterDiscount + vat).toFixed(2) : '';
            updated.vatAmount = vat.toFixed(2);
        }

        setFormData(updated);
        onChange(updated);
    };

    const handleBenefitChange = (index, value) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits[index] = value;
        handleChange('benefits', updatedBenefits);
    };

    const addBenefit = () => handleChange('benefits', [...formData.benefits, '']);
    const removeBenefit = (index) => {
        const updatedBenefits = [...formData.benefits];
        updatedBenefits.splice(index, 1);
        handleChange('benefits', updatedBenefits);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Rent Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Monthly Price */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Monthly Price (AED)</label>
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
                            className="block w-full pl-12 pr-12 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>


                <div className="space-y-1">
                    <div className="flex space-x-4 mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Discount</label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'percentage'}
                                onChange={() => setDiscountType('percentage')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">%</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={discountType === 'fixed'}
                                onChange={() => setDiscountType('fixed')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">AED</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleChange('discount', parseFloat(e.target.value))}
                        min="0"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        className="block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Warranty Period (Months)</label>
                    <input
                        type="number"
                        value={formData.warrantPeriod || ''}
                        onChange={(e) => handleChange('warrantPeriod', e.target.value || null)}
                        className="block w-full px-3 py-2 border-b shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Discounted Price (AED)</label>
                    <input
                        type="text"
                        value={formData.discountedPrice}
                        readOnly
                        className="block w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="mb-6">
                    <div className="flex space-x-4 items-center">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">VAT (5%)</label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={formData.vatIncluded}
                                onChange={() => handleChange('vatIncluded', true)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Included</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={!formData.vatIncluded}
                                onChange={() => handleChange('vatIncluded', false)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Excluded</span>
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.vatIncluded
                            ? "5% VAT is included in the displayed prices"
                            : "5% VAT will be added at checkout"}
                    </p>
                </div>

            </div>

            {/* Rental Benefits Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">Rental Benefits</h4>
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
                            className="flex-1 px-3 py-2 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0 focus:border-blue-500 shadow-sm"
                        />
                        {formData.benefits.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Service Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {Object.entries(selectedServices).map(([key, isSelected]) => (
                    <label key={key} className="relative flex items-start cursor-pointer group">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleServiceToggle(key)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                            {getServiceLabel(key)}
                        </span>
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

    const removeBenefit = (index) => {
        const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
        handleChange('benefits', updatedBenefits);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-200">
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-4 text-lg">{label}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {priceLabel}
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">AED</span>
                        </div>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            className="block w-full pl-12 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Benefits
                    </label>
                    <div className="space-y-3">
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                                    placeholder={`Benefit ${index + 1}`}
                                    className="flex-1 px-4 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                />
                                {formData.benefits.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeBenefit(index)}
                                        className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-gray-600 transition-colors"
                                        aria-label="Remove benefit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addBenefit}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Inventory Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SKU Field */}
                <div className="space-y-2">

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product SKU
                    </label>
                    <div className="relative">


                        <input
                            type="text"
                            value={inventory.sku}
                            onChange={(e) => onChange('inventory', 'sku', e.target.value)}
                            placeholder="SKU-12345"
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />

                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">UNIQUE</span>
                        </div>
                    </div>
                </div>

                {/* Quantity Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Available Quantity
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={inventory.quantity}
                            onChange={(e) => onChange('inventory', 'quantity', parseInt(e.target.value))}
                            placeholder="0"
                            min="0"
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">QTY</span>
                        </div>
                    </div>
                </div>

                {/* Stock Status Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stock Status
                    </label>
                    <div className="relative">
                        <select
                            value={inventory.stockStatus}
                            onChange={(e) => onChange('inventory', 'stockStatus', e.target.value)}
                            className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500"
                        >
                            <option value="IN_STOCK" className="text-gray-900 dark:text-gray-100">In Stock</option>
                            <option value="OUT_OF_STOCK" className="text-gray-900 dark:text-gray-100">Out of Stock</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${inventory.stockStatus === 'IN_STOCK' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    In Stock
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${inventory.stockStatus === 'OUT_OF_STOCK' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    Out of Stock
                </div>

            </div>
        </div>
    );
};





const KeyFeaturesFields = ({ features = [], onChange }) => {
    const [keyFeatures, setKeyFeatures] = useState(features.length > 0 ? features : ['']);

    useEffect(() => {
        if (keyFeatures.length === 0) {
            setKeyFeatures(['']);
        }
    }, []);

    useEffect(() => {
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Key Features</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {keyFeatures.filter(f => f.trim() !== '').length} added
                </span>
            </div>

            <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                        <div className="flex-1 relative">
                            {/* <div className="absolute top-3 left-4 flex items-center">
                                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-700 px-1 rounded">
                                    {index + 1}
                                </span>
                            </div> */}
                            <InputTextarea
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder={`Describe feature #${index + 1}...`}
                                rows={2}

                                className="w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500  resize-y"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="mt-3 px-2 py-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Remove feature"
                            aria-label="Remove feature"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center px-4 py-2.5 border border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg shadow-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Feature
                </button>
            </div>
        </div>
    );
};




const ImageUploader = ({ images, onChange }) => {
    const { uploadFiles, isLoading } = useImageUploadStore();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleChooseFiles = async (e) => {
        const files = Array.from(e.target.files || e.dataTransfer.files);
        await validateAndSetFiles(files);
    };

    const validateAndSetFiles = async (files) => {
        const validImages = [];

        for (const file of files) {
            const image = new Image();
            const objectUrl = URL.createObjectURL(file);

            const isValid = await new Promise((resolve) => {
                image.onload = () => {
                    const is500x500 = image.width === 500 && image.height === 500;
                    const isUnder500KB = file.size <= 500 * 1024;
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

        setSelectedFiles(prev => [...prev, ...validImages]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleChooseFiles(e);
    };

    const resetImage = () => {
        setSelectedFiles([]);
    };

    const removeImage = (name) => {
        setSelectedFiles(prev => prev.filter((e) => e.name !== name));
    };

    const removeUploadedImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    const handleUpload = async () => {
        console.log("++++++++")
        if (selectedFiles.length === 0) return;
        const uploaded = await uploadFiles(selectedFiles);
        if (uploaded) {
            onChange([...images, ...uploaded]);
            setSelectedFiles([]);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md dark:shadow-gray-700/50 space-y-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">
                Product Images
            </h2>

            <div className="space-y-4">
                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <FiUploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                    Click to upload
                                </span>{' '}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Only 500×500px images (max 500KB)
                            </p>
                        </div>
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            <FiUpload className="h-4 w-4 mr-2" />
                            Select Files
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChooseFiles}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleUpload}
                        disabled={isLoading || selectedFiles.length === 0}
                        className={`flex items-center px-4 py-2 rounded-md text-white transition ${selectedFiles.length === 0 || isLoading
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <FiSend className="h-4 w-4 mr-2" />
                                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                            </>
                        )}
                    </button>

                    <button
                        onClick={resetImage}
                        disabled={isLoading || selectedFiles.length === 0}
                        className={`flex items-center px-4 py-2 rounded-md transition ${selectedFiles.length === 0 || isLoading
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        <FiTrash2 className="h-4 w-4 mr-2" />
                        Clear Selection
                    </button>
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Selected Images ({selectedFiles.length})
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative group aspect-square rounded-lg overflow-hidden shadow-sm border dark:border-gray-700"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow">
                                            Main
                                        </span>
                                    )}
                                    <button
                                        onClick={() => removeImage(file.name)}
                                        className="absolute top-2 right-2 p-1 bg-white/90 dark:bg-gray-800/90 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
                                    >
                                        <FiX className="h-4 w-4 text-red-500" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                        <p className="text-xs text-white truncate">{file.name}</p>
                                        <p className="text-xs text-white/80">{(file.size / 1024).toFixed(1)}KB</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Uploaded Images */}
                {images.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Uploaded Images ({images.length})
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative group aspect-square rounded-lg overflow-hidden shadow-sm border dark:border-gray-700"
                                >
                                    <img
                                        src={img?.url?.fileUrl}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md shadow">
                                            Main
                                        </span>
                                    )}
                                    <button
                                        onClick={() => removeUploadedImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-white/90 dark:bg-gray-800/90 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
                                    >
                                        <FiX className="h-4 w-4 text-red-500" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                        <p className="text-xs text-white truncate">Uploaded {index + 1}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

