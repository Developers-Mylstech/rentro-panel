import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../Context/CategoryContext';

export default function AddCategory() {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [mainCategoryID, setMainCategoryID] = useState('');
  const { getAllCategories, addCategory, flatCategoryList } = useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainCategory.trim() && !subCategory.trim()) {
      alert("Please enter either a main or sub category name.");
      return;
    }

    let payload;

    if (subCategory.trim()) {
      if (!mainCategoryID) {
        alert("Please select a parent category for the subcategory.");
        return;
      }

      payload = {
        name: subCategory,
        parentCategoryId: mainCategoryID,
      };
    } else {
      payload = {
        name: mainCategory,
        parentCategoryId: null,
      };
    }

    try {
      await addCategory(payload);
      await getAllCategories();
      alert('Added Category')

      setMainCategory('');
      setSubCategory('');
      setMainCategoryID('');
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const isParentSelected = mainCategoryID !== '';
  const isMainCategoryEntered = mainCategory.trim() !== '';

  return (
    <div className="mx-auto max-w-lg p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mainCategory" className="block text-gray-700 mb-2">
          Main Category:
        </label>
        <input
          id="mainCategory"
          type="text"
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          placeholder="Enter main category (leave empty if adding subcategory)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          disabled={isParentSelected}
        />

        <label htmlFor="parentCategory" className="block text-gray-700 mb-2">
          Select Parent Category (for Subcategory):
        </label>
        <select
          id="parentCategory"
          value={mainCategoryID}
          onChange={(e) => setMainCategoryID(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          disabled={isMainCategoryEntered}
        >
          <option value="">Select Category</option>
          {flatCategoryList?.map((e) => (
            <option key={e.categoryId} value={e.categoryId}>
              {e.name}
            </option>
          ))}
        </select>

        <label htmlFor="subCategory" className="block text-gray-700 mb-2">
          Subcategory:
        </label>
        <input
          id="subCategory"
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          placeholder="Enter subcategory name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          disabled={isMainCategoryEntered}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
