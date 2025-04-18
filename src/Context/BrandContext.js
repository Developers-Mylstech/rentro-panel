import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useBrandStore = create((set) => ({
    brands: [],

    addBrand: async (brand) => {
        try {
            const res = await axiosInstance.post('/brands', brand); 
            set((state) => ({
                brands: [...state.brands, res.data] 
            }));
            alert('Brand added successfully');
            return res.data;
        } catch (error) {
            alert("Adding brand failed due to backend issue");
            throw error; 
        }
    },

    getAllBrands: async () => {
        try {
            const res = await axiosInstance.get('/brands');
            set({ brands: res?.data || [] });
        } catch (error) {
            alert("Fetching data failed due to backend issue");
        }
    },

    removeBrand: async (id) => {
        try {
            await axiosInstance.delete(`/brands/${id}`);
            set((state) => ({
                brands: state.brands.filter(brand => brand.id !== id)
            }));
            alert('Brand deleted successfully');
        } catch (error) {
            alert("Deletion failed due to backend issue");
        }
    },

    editBrand: async (id, updatedBrand) => {
        try {
            await axiosInstance.put(`/brands/${id}`, updatedBrand);
            set((state) => ({
                brands: state.brands.map((b) =>
                    b.id === id ? { ...b, ...updatedBrand } : b
                ),
            }));
            alert('Brand updated successfully');
        } catch (error) {
            alert("Update failed due to backend issue");
        }
    }
}));

export default useBrandStore;