import { create } from 'zustand';
import axios from 'axios';

const useImageUploadStore = create((set) => ({
    uploadedFiles: [], 
    isLoading: false,
    error: null,

    uploadFiles: async (files) => {
        set({ isLoading: true, error: null });

        try {
            const formData = new FormData();
            if (Array.isArray(files)) {
                files.forEach((file) => formData.append('files', file));
            } else {
                formData.append('files', files);
            }

            const response = await axios.post(
                'https://proud-expression-production-6ebc.up.railway.app/api/v1/product-images/batch-upload?quality=80&fallbackToJpeg=true',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Transform API response to [{ url: "path" }, ...]
            const formattedFiles = response.data.map((path) => ({ url: path }));
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
