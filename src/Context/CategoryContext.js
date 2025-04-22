import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCategoryStore = create((set, get) => ({
  categoryList: [],
  flatCategoryList: [], // Stores all categories in a flat structure
  selectedCategory: null,
  subCategories: [], // Stores filtered subcategories

  // Add a new category
  addCategory: (category) =>
    set((state) => ({
      flatCategoryList: [...state.flatCategoryList, { categoryId: Date.now(), ...category }],
    })),

  // Fetch all categories and organize them
  getAllCategories: async () => {
    try {
      const res = await axios.get('https://proud-expression-production-6ebc.up.railway.app/api/v1/categories');
      const allCategories = res?.data || [];
      
      set({ 
        flatCategoryList: allCategories,
        categoryList: allCategories.filter(cat => !cat.parentCategoryId), // Main categories only
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  // Set the selected category and filter its subcategories
  setSelectedCategory: (categoryId) => {
    const { flatCategoryList } = get();
    const filteredSubCategories = flatCategoryList.filter(
      (cat) => cat.parentCategoryId === categoryId
    );
    
    set({ 
      selectedCategory: categoryId,
      subCategories: filteredSubCategories,
    });
  },

  // Remove a category
  removeCategory: async (id) => {
    try {
      await axios.delete(`https://proud-expression-production-6ebc.up.railway.app/api/v1/categories/${id}`);
      set((state) => ({
        flatCategoryList: state.flatCategoryList.filter((cat) => cat.categoryId !== id),
        categoryList: state.categoryList.filter((cat) => cat.categoryId !== id),
        subCategories: state.subCategories.filter((cat) => cat.categoryId !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },

  // Edit a category
  editCategory: (id, updatedCategory) =>
    set((state) => ({
      flatCategoryList: state.flatCategoryList.map((cat) =>
        cat.categoryId === id ? { ...cat, ...updatedCategory } : cat
      ),
      categoryList: state.categoryList.map((cat) =>
        cat.categoryId === id ? { ...cat, ...updatedCategory } : cat
      ),
      subCategories: state.subCategories.map((cat) =>
        cat.categoryId === id ? { ...cat, ...updatedCategory } : cat
      ),
    })),
}));

export default useCategoryStore;