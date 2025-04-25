// import React, { useEffect, useState } from 'react';
// import useCategoryStore from '../../Context/CategoryContext';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function AddCategory() {
//   const [mainCategory, setMainCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');
//   const [mainCategoryID, setMainCategoryID] = useState('');
//   const { getAllCategories, addCategory, flatCategoryList } = useCategoryStore();
//     const [isEditMode, setIsEditMode] = useState(false);
//       const [currentCatId, setCurrentCatId] = useState(null);

//        const location = useLocation();
//       const navigate = useNavigate();



//           useEffect(() => {
//               if (location.state?.category) {
//                   const { categoryId, name, images } = location.state.brand;
//                   setIsEditMode(true);
//                   setCurrentCatId(categoryId);
//                   setMainCategory(name);
                 
//               }
//           }, [location.state, ]);
      

//   useEffect(() => {
//     getAllCategories();
//   }, []);
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!mainCategory.trim() && !subCategory.trim()) {
//       alert("Please enter either a main or sub category name.");
//       return;
//     }

//     let payload;

//     if (subCategory.trim()) {
//       if (!mainCategoryID) {
//         alert("Please select a parent category for the subcategory.");
//         return;
//       }

//       payload = {
//         name: subCategory,
//         parentCategoryId: mainCategoryID,
//       };
//     } else {
//       payload = {
//         name: mainCategory,
//         parentCategoryId: null,
//       };
//     }

//     try {
//       await addCategory(payload);
//       alert('Category added successfully!');
//       await getAllCategories();

//       setMainCategory('');
//       setSubCategory('');
//       setMainCategoryID('');
//     } catch (error) {
//       console.error("Error adding category:", error);
//       alert("Failed to add category. Please try again.");
//     }
//   };

//   const isParentSelected = mainCategoryID !== '';
//   const isMainCategoryEntered = mainCategory.trim() !== '';

//   return (
//     <div className="mx-auto max-w-md p-8 h-auto dark:h-screen bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 transform transition-all hover:shadow-md">
//     <div className="mb-8 text-center ">
//       <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//         </svg>
//       </div>
//       <h2 className="text-2xl font-light text-gray-800 dark:text-gray-200 mb-1 tracking-tight">Create New Category</h2>
//       <p className="text-gray-500 dark:text-gray-300 font-light">Organize your inventory systematically</p>
//     </div>
  
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <div className={`transition-all duration-200 ease-in-out ${isParentSelected ? 'opacity-60' : ''}`}>
//         <label htmlFor="mainCategory" className="block text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">
//           Main Category
//         </label>
//         <input
//           id="mainCategory"
//           type="text"
//           value={mainCategory}
//           onChange={(e) => setMainCategory(e.target.value)}
//           placeholder="e.g. Filters"
//           className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-t transition-all duration-200"
//           disabled={isParentSelected}
//         />
//         {!isParentSelected && (
//           <p className="mt-1 text-xs text-gray-400 dark:text-gray-300">Leave empty if creating subcategory</p>
//         )}
//       </div>
  
//       <div className={`transition-all duration-200 ease-in-out ${isMainCategoryEntered ? 'opacity-60' : ''}`}>
//         <div className="flex items-center justify-between">
//           <label htmlFor="parentCategory" className="block text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">
//             Parent Category
//           </label>
//           {!isMainCategoryEntered && subCategory && (
//             <span className="text-xs text-blue-500 animate-pulse">Required for subcategory</span>
//           )}
//         </div>
//         <select
//           id="parentCategory"
//           value={mainCategoryID}
//           onChange={(e) => setMainCategoryID(e.target.value)}
//           className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-t transition-all duration-200 appearance-none"
//           disabled={isMainCategoryEntered}
//         >
//           <option value="">Select parent category</option>
//           {flatCategoryList?.map((e) => (
//             <option key={e.categoryId} value={e.categoryId}>
//               {e.name}
//             </option>
//           ))}
//         </select>
//       </div>
  
//       <div className={`transition-all duration-200 ease-in-out ${isMainCategoryEntered ? 'opacity-60' : ''}`}>
//         <label htmlFor="subCategory" className="block text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">
//           Subcategory Name
//         </label>
//         <input
//           id="subCategory"
//           type="text"
//           value={subCategory}
//           onChange={(e) => setSubCategory(e.target.value)}
//           placeholder="e.g. RO"
//           className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-0 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-t transition-all duration-200"
//           disabled={isMainCategoryEntered}
//         />
//       </div>
  
//       <div className="pt-2">
//         <button
//           type="submit"
//           className="w-full bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 py-3 px-4 rounded-lg font-medium border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-1 transition-all duration-200 flex items-center justify-center space-x-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           <span>Add Category</span>
//         </button>
//       </div>
//     </form>
  
//     <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-700 text-center">
//       <p className="text-xs text-gray-400 dark:text-gray-300">Categories help customers find products faster</p>
//     </div>
//   </div>
  
//   );
// }



import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../Context/CategoryContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export default function AddCategory() {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [mainCategoryID, setMainCategoryID] = useState('');
  const { 
    getAllCategories, 
    addCategory, 
    handleEditCategory,
    flatCategoryList 
  } = useCategoryStore();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCatId, setCurrentCatId] = useState(null);
  const [isSubcategory, setIsSubcategory] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.category) {
      const { categoryId, name, parentCategoryId } = location.state.category;
      setIsEditMode(true);
      setCurrentCatId(categoryId);
      
      if (parentCategoryId) {
        // Editing a subcategory
        setIsSubcategory(true);
        setSubCategory(name);
        setMainCategoryID(parentCategoryId);
      } else {
        // Editing a main category
        setMainCategory(name);
      }
    }
    getAllCategories();
  }, [location.state, getAllCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainCategory.trim() && !subCategory.trim()) {
      alert("Please enter either a main or sub category name.");
      return;
    }

    let payload;

    if (isSubcategory || subCategory.trim()) {
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
      if (isEditMode) {
        await handleEditCategory(currentCatId, payload);
        alert('Category updated successfully!');
        navigate(-1); // Go back after edit
      } else {
        await addCategory(payload);
        alert('Category added successfully!');
        resetForm();
      }
      await getAllCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} category. Please try again.`);
    }
  };

  const resetForm = () => {
    setMainCategory('');
    setSubCategory('');
    setMainCategoryID('');
    setIsSubcategory(false);
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(-1); // Go back if in edit mode
    } else {
      resetForm();
    }
  };

  const isParentSelected = mainCategoryID !== '';
  const isMainCategoryEntered = mainCategory.trim() !== '';

  return (
    <div className="mx-auto max-w-xl p-8 h-auto dark:h-screen bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 transform transition-all hover:shadow-md">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl font-light text-secondary dark:text-gray-200 mb-1 tracking-tight">
          {isEditMode ? 'Edit Category' : 'Create New Category'}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 font-light">
          {isEditMode ? 'Update category details' : 'Organize your inventory systematically'}
        </p>
      </div>
    
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className={`transition-all relative duration-200 ease-in-out ${isParentSelected ? 'opacity-60' : ''}`}>
        {/* <FloatLabel> */}
          <label htmlFor="mainCategory"    className={`absolute top-0  text-xs font-medium uppercase tracking-wider mb-1 ${
      mainCategory  ? 'text-blue-500 -top-4' : 'text-gray-500 dark:text-gray-300'
    } peer-focus:text-blue-500`}>
            Main Category
          </label>

          <input
            id="mainCategory"
            type="text"
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            // placeholder="e.g. Filters"
            className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
            disabled={isParentSelected}
          />

          {/* </FloatLabel> */}
          {!isParentSelected && (
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-300">Leave empty if creating subcategory</p>
          )}
        </div>
    
        <div className={`transition-all duration-200  ease-in-out ${isMainCategoryEntered ? 'opacity-60' : ''}`}>
          <div className="flex items-center justify-between">
            <label htmlFor="parentCategory" className="block text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">
              Parent Category
            </label>
            {!isMainCategoryEntered && (subCategory || isSubcategory) && (
              <span className="text-xs text-blue-500 animate-pulse">Required for subcategory</span>
            )}
          </div>
          <select
            id="parentCategory"
            value={mainCategoryID}
            onChange={(e) => setMainCategoryID(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
            disabled={isMainCategoryEntered || (isEditMode && !isSubcategory)}
          >
            <option value="">Select parent category</option>
            {flatCategoryList?.map((e) => (
              <option key={e.categoryId} value={e.categoryId}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
    
        <div className={`transition-all duration-200 ease-in-out ${isMainCategoryEntered ? 'opacity-60' : ''}`}>
          <FloatLabel>
          <InputText
            id="subCategory"
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            // placeholder="e.g. RO"
            className="w-full px-4 py-2.5 text-sm border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-500 "
            disabled={isMainCategoryEntered || (isEditMode && !isSubcategory)}
          />
          <label htmlFor="subCategory" className="block text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Subcategory Name
          </label>
          </FloatLabel>
        </div>
        
        
    
        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditMode ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
            </svg>
            <span>{isEditMode ? 'Update' : 'Add'} Category</span>
          </button>
        </div>
      </form>
    
      <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-300">Categories help customers find products faster</p>
      </div>
    </div>
  );
}