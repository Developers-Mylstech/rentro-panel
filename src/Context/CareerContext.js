import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCareerStore = create((set, get) => ({
  careersPosts: [],
  jobApplicants: [],
  ploadedFiles: [], 

 

  getAllCareer: async () => {
    try {
      const res = await axios.get('https://proud-expression-production-6ebc.up.railway.app/api/v1/job-posts');
     
      
      set({ 
       
        careersPosts:res.data, 
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },





  createJobPost : async (job) =>{

      try{

        const res = await axios.post('https://proud-expression-production-6ebc.up.railway.app/api/v1/job-posts',job);

        set((state) => ({
          careersPosts: [...state.careersPosts, {  ...job }],
        }));
      }catch{
        console.error("Failed to add jobpost:", error);
      }
  },

  getJobApplicants: async (id) => {
    try {
      const res = await axios.get(`https://proud-expression-production-6ebc.up.railway.app/api/v1/job-applicants/job-post/${id}`);
     
      
      set({ 
       
        jobApplicants: res.data, // Main categories only
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  

  // Set the selected category and filter its subcategories
//   setSelectedCategory: (categoryId) => {
//     const { flatCategoryList } = get();
//     const filteredSubCategories = flatCategoryList.filter(
//       (cat) => cat.parentCategoryId === categoryId
//     );
    
//     set({ 
//       selectedCategory: categoryId,
//       subCategories: filteredSubCategories,
//     });
//   },

  // Remove a category
//   removeCategory: async (id) => {
//     try {
//       await axiosInstance.delete(`/categories/${id}`);
//       set((state) => ({
//         flatCategoryList: state.flatCategoryList.filter((cat) => cat.categoryId !== id),
//         categoryList: state.categoryList.filter((cat) => cat.categoryId !== id),
//         subCategories: state.subCategories.filter((cat) => cat.categoryId !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   },


 
}));

export default useCareerStore;