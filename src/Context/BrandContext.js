import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useBrandStore = create((set) => ({
  brands: [],
  
  addBrand: (brand) =>
    set((state) => ({
      brands: [...state.brands, { id: Date.now(), ...brand }],
    })),

  getAllBrands: async () => {
    try {
      const res = await axiosInstance.get('/brands');
      set({ brands: res?.data || [] });
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  },

  removeBrand: (id) =>
    set((state) => ({
      brands: state.brands.filter((b) => b.id !== id),
    })),

  editBrand: (id, updatedBrand) =>
    set((state) => ({
      brands: state.brands.map((b) =>
        b.id === id ? { ...b, ...updatedBrand } : b
      ),
    })),
}));

export default useBrandStore;