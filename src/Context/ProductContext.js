import { create } from 'zustand';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // Create product
  createProduct: async (newProduct) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post('https://proud-expression-production-6ebc.up.railway.app/api/v1/products', newProduct);
      set((state) => ({
        products: [...state.products, response.data],
      }));

    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Get products
  getProducts: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get('https://proud-expression-production-6ebc.up.railway.app/pi/v1/products');
      set({ products: response.data });

    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Update product
  updateProduct: async (id, updatedProduct) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.put(`https://proud-expression-production-6ebc.up.railway.app/api/v1/products/${id}`, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...response.data } : product
        ),
      }));

    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });

      await axios.delete(`https://proud-expression-production-6ebc.up.railway.app/api/v1/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));

    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
