import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useCategoryStore = create((set) => ({
    categoryList: [],
  
  addCategory: (category) =>
    set((state) => ({
        categoryList: [...state.categoryList, { id: Date.now(), ...category }],
    })),

   getAllCategories: async () => {
    try {
      const res = await axiosInstance.get('/categories');
      set({ categoryList: res?.data || [] });
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  },

  removeCategory: async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`); // Make sure the endpoint is correct
      set((state) => ({
        categoryList: state.categoryList.filter((b) => b.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },
  editCategory: (id, updatedCategory) =>
    set((state) => ({
        categoryList: state.categoryList.map((b) =>
        b.id === id ? { ...b, ...updatedCategory } : b
      ),
    })),
}));

export default useCategoryStore;