import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCategoryStore = create((set, get) => ({
  categoryList: [],
  flatCategoryList: [],
  selectedCategory: null,
  subCategories: [],

  addCategory: async (category) => {
  console.log(category,'OOOO')
    try {
      const response = await axios.post('https://proud-expression-production-6ebc.up.railway.app/api/v1/categories', category);
      const newCategory = response.data;

      set((state) => ({
        flatCategoryList: [...state.flatCategoryList, newCategory],
        categoryList: !newCategory.parentCategoryId
          ? [...state.categoryList, newCategory]
          : state.categoryList,
      }));
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  },

  setSelectedCategory: (mainCatId) => {
    const allCategories = get().flatCategoryList;
    const subCategories = allCategories.filter(
      (cat) => cat.parentCategoryId === mainCatId
    );
    set({
      selectedMainCatId: mainCatId,
      subCategories: subCategories
    });
  },

  getAllCategories: async () => {
    try {
      const res = await axios.get('https://proud-expression-production-6ebc.up.railway.app/api/v1/categories');
      const allCategories = res?.data || [];

      const mainCats = allCategories.filter(cat => !cat.parentCategoryId);

      set({
        flatCategoryList: allCategories,
        categoryList: mainCats,
      });

      return mainCats; // ✅ return for use in components
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  removeCategory: async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      set((state) => ({
        flatCategoryList: state.flatCategoryList.filter(cat => cat._id !== id),
        categoryList: state.categoryList.filter(cat => cat._id !== id),
        subCategories: state.subCategories.filter(cat => cat._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },

  editCategory: (id, updatedCategory) =>
    set((state) => ({
      flatCategoryList: state.flatCategoryList.map(cat =>
        cat._id === id ? { ...cat, ...updatedCategory } : cat
      ),
      categoryList: state.categoryList.map(cat =>
        cat._id === id ? { ...cat, ...updatedCategory } : cat
      ),
      subCategories: state.subCategories.map(cat =>
        cat._id === id ? { ...cat, ...updatedCategory } : cat
      ),
    })),
}));

export default useCategoryStore;
