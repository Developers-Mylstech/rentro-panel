

// import React, { useState } from 'react';
// import { FaFilePdf, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
// import { FiPlus } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';

// const jobRoles = [
//   {
//     id: 1,
//     jobTitle: 'Manager',
//     candidates: 1,
//     posted: '2023-05-15',
//     status: 'active',
//     jobDescription: 'We are looking for an experienced Manager to lead our team...',
//     requirements: '5+ years experience, leadership skills, project management',
//     image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
//   },
//   {    id: 2,
//     title: 'React Developer',
//     candidates: 1,
//     posted: '2023-06-20',
//     status: 'active',
//     description: 'Join our frontend team to build amazing user experiences...',
//     requirements: '3+ years React experience, JavaScript, Redux',
//     image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
//   },
// ];

// const candidateData = {
//   1: [
//     {
//       id: 1,
//       name: 'Ayesha Khan',
//       resumeFile: '#',
//       email: 'ayesha.khan@example.com',
//       contact: '+91-9876543210',
//       details: '5+ years of management experience in tech companies.',
//       applied: '2023-05-20',
//       status: 'reviewed'
//     }
//   ],
//   2: [
//     {
//       id: 3,
//       name: 'Priya Patel',
//       resumeFile: '#',
//       email: 'priya.patel@example.com',
//       contact: '+91-9988776655',
//       details: 'React specialist with 3 years experience at FAANG companies.',
//       applied: '2023-06-22',
//       status: 'new'
//     }
//   ]
// };

// const Career = () => {
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [editingJob, setEditingJob] = useState(null);
//   const [jobData, setJobData] = useState({
//     title: '',
//     description: '',
//     requirements: '',
//     status: 'active',
//     image: ''
//   });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
// const navigate = useNavigate()
//   const scrollJobs = (direction) => {
//     const container = document.getElementById('jobs-container');
//     const scrollAmount = direction === 'left' ? -300 : 300;
//     container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     setScrollPosition(container.scrollLeft);
//   };

//   const {careersPosts,getAllCareer} = useCareerStore()

//   useEffect(()=>{
//     getAllCareer()

//     console.log(careersPosts, "these are career post")

//   },[])

//   const scrollJobs = (direction) => {
//     const container = document.getElementById('jobs-container');
//     const scrollAmount = direction === 'left' ? -300 : 300;
//     container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     setScrollPosition(container.scrollLeft);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Job Openings</h2>
//           <button 
//             onClick={() => navigate('/career/add')}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//           >
//             <FiPlus /> Add New Job
//           </button>
//         </div>

//         <div className="relative mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-700">Current Openings</h3>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => scrollJobs('left')}
//                 className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
//                 disabled={scrollPosition <= 0}
//               >
//                 <FaChevronLeft className={scrollPosition <= 0 ? 'text-gray-300' : 'text-gray-600'} />
//               </button>
//               <button
//                 onClick={() => scrollJobs('right')}
//                 className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
//               >
//                 <FaChevronRight className="text-gray-600" />
//               </button>
//             </div>
//           </div>

//           <div
//             id="jobs-container"
//             className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide mx-4"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             {careersPosts.map(job => (
//               <div
//                 key={job?.id}
//                 className={`flex-shrink-0 w-72 bg-white rounded-xl m-4 border overflow-hidden transition-all duration-300 ${selectedRole === job.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
//                 onClick={() => setSelectedRole(job.jobPostId)}
//               >
//                 {job?.image && (
//                   <div className="h-40 overflow-hidden">
//                     <img src={job?.image} alt={job?.jobTitle} className="w-full h-full object-cover" />
//                   </div>
//                 )}
//                 <div className="p-5">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-lg font-bold text-gray-800">{job?.jobTitle}</h3>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Posted: {job?.posted}</span>
//                     <span className={`px-2 py-1 rounded-full text-xs ${job?.isActive === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                       {job?.isActive}
//                     </span>
//                   </div>
//                   <div className="bg-blue-50 text-blue-800 text-center py-2 rounded-lg">
//                     {job?.candidates} {job?.candidates === 1 ? 'Applicant' : 'Applicants'}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {selectedRole && (
//           <div className="bg-white rounded-xl border overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   Candidates for {jobRoles.find(job => job.id === selectedRole)?.title}
//                 </h3>
//                 <button
//                   onClick={() => setSelectedRole(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>

//               <div className="grid gap-4">
//                 {candidateData[selectedRole]?.map(candidate => (
//                   <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-lg">{candidate.name}</h4>
//                         <p className="text-gray-600 text-sm">{candidate.details}</p>
//                         <p className="text-sm text-gray-500 mt-1">Email: {candidate.email}</p>
//                         <p className="text-sm text-gray-500">Contact: {candidate.contact}</p>
//                       </div>
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         candidate.status === 'new' ? 'bg-blue-100 text-blue-800' :
//                         candidate.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
//                         'bg-green-100 text-green-800'
//                       }`}>
//                         {candidate.status}
//                       </span>
//                     </div>
//                     <div className="mt-3 flex justify-between items-center">
//                       <span className="text-sm text-gray-500">Applied on: {candidate.applied}</span>
//                       <a href={candidate.resumeFile} className="text-red-600 hover:text-red-800 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
//                         <FaFilePdf /> Resume
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Career;

import React from 'react'

export default function Career() {
  return (
    <div>
      
    </div>
  )
}
