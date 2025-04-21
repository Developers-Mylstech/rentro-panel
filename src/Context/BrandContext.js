import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useBrandStore = create((set) => ({
    brands: [],
    image: "",

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
            const res = await axiosInstance.get('/brands', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            set({ brands: res?.data || [] });
        } catch (error) {
            alert("Fetching data failed due to backend issue");
        }
    },

    addBrandImage: async (file) => {
        console.log(file, '))))')
        try {
            const formData = new FormData();
            formData.append('file', file); // Key must match the backend's expected key

            const response = await axiosInstance.post(
                'product-images/product-images/upload?quality=80&fallbackToJpeg=true',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const formattedFiles = response.data.map((path) => ({ url: path }));
            set({ image: formattedFiles });

            return formattedFiles;
        } catch (error) {
            console.error('Upload error:', error);
            set({ error: error.message });
            throw error;
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