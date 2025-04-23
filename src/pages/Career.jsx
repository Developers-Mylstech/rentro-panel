

// import React, { useState, useEffect } from 'react';
// import { FaFilePdf, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
// import useCareerStore from '../Context/CareerContext';

// const Career = () => {
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const { careersPosts, getAllCareer, getJobApplicants, jobApplicants } = useCareerStore();

//   useEffect(() => {
//     getAllCareer();
//   }, []);


//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Job Openings</h2>
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
//                 key={job?.jobPostId}
//                 className={`flex-shrink-0 w-72 bg-white rounded-xl m-4 border overflow-hidden transition-all duration-300 ${selectedRole === job.jobPostId ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
//                 onClick={() => {
//                   setSelectedRole(job.jobPostId);
//                   getJobApplicants(job.jobPostId);
//                 }}
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
//                   <div className="flex justify-end text-sm text-gray-600 mb-2">
//                     {/* <span>Posted: {job?.posted}</span> */}
//                     <span className={`px-2 py-1 rounded-full text-xs ${job?.isActive === true? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                       {job?.isActive==true? "Active":"Closed"}
//                     </span>
//                   </div>
//                   <div className="bg-blue-50 text-blue-800 text-center py-2 rounded-lg">
//                     {job?.candidates} {job?.candidates === 1 ? 'Applicant ' : '0 Applicants '}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {selectedRole && jobApplicants && (
//           <div className="bg-white rounded-xl border overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   Candidates for {careersPosts.find(job => job.jobPostId === selectedRole)?.jobTitle}
//                 </h3>
//                 <button
//                   onClick={() => setSelectedRole(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>

//               <div className="grid gap-4">
//                 {jobApplicants.map(candidate => (
//                   <div key={candidate?.id} className="border rounded-lg p-4 hover:bg-gray-50">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-lg">{candidate?.name}</h4>
//                         <p className="text-gray-600 text-sm">{candidate?.details}</p>
//                         <p className="text-sm text-gray-500 mt-1">Email: {candidate?.email}</p>
//                         <p className="text-sm text-gray-500">Contact: {candidate?.contact}</p>
//                       </div>
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         candidate?.status === 'new' ? 'bg-blue-100 text-blue-800' :
//                         candidate?.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
//                         'bg-green-100 text-green-800'
//                       }`}>
//                         {candidate.status}
//                       </span>
//                     </div>
//                     <div className="mt-3 flex justify-between items-center">
//                       <span className="text-sm text-gray-500">Applied on: {candidate?.applied}</span>
//                       <a href={candidate?.resumeFile} className="text-red-600 hover:text-red-800 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
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



import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import useCareerStore from '../Context/CareerContext';

const Career = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { careersPosts, getAllCareer, getJobApplicants, jobApplicants } = useCareerStore();

  useEffect(() => {
    getAllCareer();
  }, []);

  const scrollJobs = (direction) => {
    const container = document.getElementById('jobs-container');
    const scrollAmount = 300;

    if (container) {
      const newScroll = direction === 'left'
        ? Math.max(0, container.scrollLeft - scrollAmount)
        : container.scrollLeft + scrollAmount;

      container.scrollTo({ left: newScroll, behavior: 'smooth' });
      setScrollPosition(newScroll);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Job Openings</h2>
        </div>

        <div className="relative mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Current Openings</h3>
            <div className="flex gap-2">
              <button
                onClick={() => scrollJobs('left')}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600"
                disabled={scrollPosition <= 0}
              >
                <FaChevronLeft className={scrollPosition <= 0 ? 'text-gray-300' : 'text-gray-600 dark:text-gray-200'} />
              </button>
              <button
                onClick={() => scrollJobs('right')}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FaChevronRight className="text-gray-600 dark:text-gray-200" />
              </button>
            </div>
          </div>

          <div
            id="jobs-container"
            className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide mx-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {careersPosts.map(job => (
              <div
                key={job?.jobPostId}
                className={`flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-xl m-4 border dark:border-gray-700 overflow-hidden transition-all duration-300 ${selectedRole === job.jobPostId ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                onClick={() => {
                  setSelectedRole(job.jobPostId);
                  getJobApplicants(job.jobPostId);
                }}
              >
                {job?.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={job?.image} alt={job?.jobTitle} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{job?.jobTitle}</h3>
                  </div>
                  <div className="flex justify-end text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job?.isActive === true
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {job?.isActive === true ? "Active" : "Closed"}
                    </span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center py-2 rounded-lg">
                    {job?.candidates} {job?.candidates === 1 ? 'Applicant ' : 'Applicants'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRole && jobApplicants && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Candidates for {careersPosts.find(job => job.jobPostId === selectedRole)?.jobTitle}
                </h3>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid gap-4">
                {jobApplicants.map(candidate => (
                  <div key={candidate?.id} className="border dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg text-gray-800 dark:text-white">{candidate?.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{candidate?.details}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Email: {candidate?.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Contact: {candidate?.contact}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        candidate?.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                        candidate?.status === 'reviewed' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' :
                        'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Applied on: {candidate?.applied}</span>
                      <a href={candidate?.resumeFile} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        <FaFilePdf /> Resume
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
