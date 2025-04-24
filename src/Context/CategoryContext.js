import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCategoryStore = create((set, get) => ({
  categoryList: [],
  flatCategoryList: [],
  selectedCategory: null,
  subCategories: [],

  addCategory: async (category) => {
    try {
      const response = await axiosInstance.post('/categories', category);
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
      const res = await axiosInstance.get(' /categories',{
        headers: {
          'skip_zrok_interstitial': 'true'
      },
      });
      const allCategories = res?.data || [];

      const mainCats = allCategories.filter(cat => !cat.parentCategoryId);

      set({
        flatCategoryList: allCategories,
        categoryList: mainCats,
      });

      return mainCats; 
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  removeCategory: async (id) => {
    try {
      const res = await axios.delete(`https://proud-expression-production-6ebc.up.railway.app/api/v1/categories/${id}`);

      if(res.status==204){
        alert(`Category  Deleted with Id ${id}`)
      }

    
      set((state) => ({
        flatCategoryList: state.flatCategoryList.filter(cat => cat._id !== id),
        categoryList: state.categoryList.filter(cat => cat._id !== id),
        subCategories: state.subCategories.filter(cat => cat._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },

  handleEditCategory : async (id, updatedCategory) => {
    try {
      const response = await axios.put(
        `https://proud-expression-production-6ebc.up.railway.app/api/v1/categories/${id}`,
        updatedCategory
      );
  
      const updatedData = response.data;
  
      set((state) => ({
        flatCategoryList: state.flatCategoryList.map(cat =>
          cat._id === id ? { ...cat, ...updatedData } : cat
        ),
        categoryList: state.categoryList.map(cat =>
          cat._id === id ? { ...cat, ...updatedData } : cat
        ),
        subCategories: state.subCategories.map(cat =>
          cat._id === id ? { ...cat, ...updatedData } : cat
        ),
      }));
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  }
} ))

;

export default useCategoryStore;
