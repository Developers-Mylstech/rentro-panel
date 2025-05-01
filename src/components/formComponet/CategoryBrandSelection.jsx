import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import useBrandStore from '../../Context/BrandContext';
import useCategoryStore from '../../Context/CategoryContext';


const CategoryBrandSelection = ({ control, errors, singleProduct }) => {
    const {
        flatCategoryList,
        subCategories,
        getAllCategories,
        setSelectedCategory,
    } = useCategoryStore();
    const { brands, getAllBrands } = useBrandStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [brandSearchTerm, setBrandSearchTerm] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

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

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6 bg-secondary bg-opacity-10 rounded-lg px-5">
                <h2 className="md:text-lg text-base font-semibold text-secondary rounded-lg p-3 dark:text-gray-100">Category & Brand</h2>
                <span className="text-xs bg-blue-50 dark:bg-blue-900 text-secondary px-1 py-1 rounded max-w-28">Required fields*</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Main Category</label>
                        <span className="text-xs text-red-500">*required</span>
                    </div>

                    <Controller
                        name="category.main"
                        control={control}
                        rules={{ required: 'Please select a main category' }}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                id="mainCategory"
                                options={filteredCategories}
                                optionLabel="name"
                                optionValue="categoryId"
                                placeholder="Select Category"
                                filter
                                filterBy="name"
                                className={classNames('w-full border dark:border-gray-600 focus:outline-none focus:ring-0 bg-white dark:bg-gray-900', {
                                    'p-invalid': errors.category?.main
                                })}
                                filterPlaceholder="Search categories..."
                                emptyFilterMessage="No categories found"
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    setSelectedCategory(e.value?.categoryId);
                                    setIsTouched(true);
                                }}
                                value={field.value}
                                valueTemplate={(option) => console.log(option, "option")}
                                itemTemplate={(option) => {
                                    return (
                                        <div className="flex items-center text-gray-800 dark:text-gray-100">
                                            <span>{option.name}</span>
                                        </div>
                                    );
                                }}
                            />
                        )}
                    />
                    {errors.category?.main && (
                        <small className="p-error">{errors.category.main.message}</small>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub Category</label>
                    <Controller
                        name="category.sub"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                id="subCategory"
                                options={subCategories}
                                optionLabel="name"
                                placeholder="Select Sub Category"
                                className="w-full border dark:border-gray-600 p-dropdown:focus-none bg-white dark:bg-gray-900"
                                onChange={(e) => field.onChange(e.value)}
                                value={field.value}
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
                        <span className="text-xs text-red-500">*required</span>
                    </div>

                    <Controller
                        name="brand"
                        control={control}
                        rules={{ required: 'Please select a brand' }}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                id="brand"
                                options={filteredBrands}
                                optionLabel="name"
                                placeholder="Select Brand"
                                filter
                                filterBy="name"
                                className={classNames('w-full border bg-white dark:bg-gray-900 dark:border-gray-600 outline-none p-dropdown:focus-none', {
                                    'p-invalid': errors.brand
                                })}
                                filterPlaceholder="Search brands..."
                                emptyFilterMessage="No brands found"
                                onChange={(e) => {
                                    field.onChange(e.value);
                                    setIsTouched(true);
                                }}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.brand && (
                        <small className="p-error">{errors.brand.message}</small>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryBrandSelection;