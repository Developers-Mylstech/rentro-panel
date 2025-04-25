import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCareerStore = create((set, get) => ({
  careersPosts: [],
  jobApplicants: [],
  ploadedFiles: [], 

 

  getAllCareer: async () => {
    try {
      const res = await axiosInstance.get('job-posts');
     
      
      set({ 
       
        careersPosts:res.data, 
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },





  createJobPost : async (job) =>{

      try{

        const res = await axiosInstance.post('/job-posts',job);

        set((state) => ({
          careersPosts: [...state.careersPosts, {  ...job }],
        }));
      }catch{
        console.error("Failed to add jobpost:", error);
      }
  },

  editJobPost : async (job,id) =>{

    try{

      const res = await axiosInstance.put(`/job-posts/${id}`,job);

      set((state) => ({
        careersPosts: [...state.careersPosts, {  ...job }],
      }));
    }catch(error){
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

  


  removeCareerPost: async (id) => {
    try {
     const res = await axiosInstance.delete(`/job-posts/${id}`);

     if(res.status === 204){
      alert("Job Post Deleted")
     }
      set((state) => ({
        careersPosts: state.careersPosts.filter((job) => job.jobPostId !== id),
       
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },


 
}));

export default useCareerStore;