import { create } from 'zustand';
import axios from 'axios';

const useImageUploadStore = create((set) => ({
  uploadedFiles: [], // Format: [{ file: "path1" }, { file: "path2" }]
  isLoading: false,
  error: null,

  // Upload single/multiple files
  uploadFiles: async (files) => {
    console.log(files,'9999')
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append('files', file)); // For multiple files
      } else {
        formData.append('files', files); // For single file
      }

      const response = await axios.post('/product-images/batch-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Transform API response to [{ file: "path" }, ...]
      const formattedFiles = response.data.map((path) => ({ file: path }));
      set({ uploadedFiles: formattedFiles, isLoading: false });

      return formattedFiles;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  reset: () => set({ uploadedFiles: [], error: null, isLoading: false }),
}));

export default useImageUploadStore;