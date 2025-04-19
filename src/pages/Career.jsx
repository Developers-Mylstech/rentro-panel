// import React from 'react';
// import { FaFilePdf } from "react-icons/fa6";

// const careerData = [
//   {
//     id: 1,
//     name: 'Ayesha Khan',
//     resumeFile: 'https://cdn.create.microsoft.com/catalog-assets/en-us/4a338a41-94b9-4793-9854-c3ae1b34923f/thumbnails/616/modern-hospitality-resume-brown-modern-simple-1-1-a8a2b9b17cad.webp',
//     email: 'ayesha.khan@example.com',
//     contact: '+91-9876543210',
//     details: 'Referred for React Native Developer role. 2+ years experience in mobile app development.',
//   },
//   {
//     id: 2,
//     name: 'Rahul Mehta',
//     resumeFile: 'https://i.etsystatic.com/21042415/r/il/75cfac/2140916029/il_570xN.2140916029_2s0x.jpg',
//     email: 'rahul.mehta@example.com',
//     contact: '+91-9123456780',
//     details: 'Applied for Backend Developer. Node.js and MongoDB expertise.',
//   },
//   {
//     id: 3,
//     name: 'Neha Sharma',
//     resumeFile: 'https://masterbundles.com/wp-content/uploads/2023/03/01_modern-resume-template-cv-template-cover-letter-professional-teacher-resume_main-thumbnail-image--963.jpg',
//     email: 'neha.sharma@example.com',
//     contact: '+91-9988776655',
//     details: 'Frontend Developer with strong UI/UX skills. Shared via LinkedIn.',
//   },
// ];

// const Career = () => {
//   return (
//     <div className="overflow-x-auto mt-4">
//       <table className="min-w-full divide-y divide-gray-200 border rounded shadow">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Candidate Name</th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Resume</th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email / Contact</th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Details</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100 bg-white">
//           {careerData.map((item, index) => (
//             <tr key={item.id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 text-sm">{index + 1}</td>
//               <td className="px-4 py-2 text-sm">{item.name}</td>
//               <td className="px-4 py-2 text-secondary text-2xl">
//                 <a
//                   href={item.resumeFile}
//                   download={`${item.name.replace(/\s/g, '_')}_Resume`}
//                   className="hover:text-red-700"
//                   target='_blank'
//                 >
//                   <FaFilePdf />
//                 </a>
//               </td>
//               <td className="px-4 py-2 text-sm">
//                 <div>{item.email}</div>
//                 <div className="text-xs text-gray-500">{item.contact}</div>
//               </td>
//               <td className="px-4 py-2 text-sm">{item.details}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Career;

import React, { useState } from 'react';
import { FaFilePdf, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';

const jobRoles = [
  { 
    id: 1, 
    title: 'Manager', 
    candidates: 1, 
    posted: '2023-05-15', 
    status: 'active',
    description: 'We are looking for an experienced Manager to lead our team...',
    requirements: '5+ years experience, leadership skills, project management',
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: 2, 
    title: 'React Developer', 
    candidates: 1, 
    posted: '2023-06-20', 
    status: 'active',
    description: 'Join our frontend team to build amazing user experiences...',
    requirements: '3+ years React experience, JavaScript, Redux',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

const candidateData = {
  1: [
    {
      id: 1,
      name: 'Ayesha Khan',
      resumeFile: '#',
      email: 'ayesha.khan@example.com',
      contact: '+91-9876543210',
      details: '5+ years of management experience in tech companies.',
      applied: '2023-05-20',
      status: 'reviewed'
    }
  ],
  2: [
    {
      id: 3,
      name: 'Priya Patel',
      resumeFile: '#',
      email: 'priya.patel@example.com',
      contact: '+91-9988776655',
      details: 'React specialist with 3 years experience at FAANG companies.',
      applied: '2023-06-22',
      status: 'new'
    }
  ]
};

// const navigate = useNavigate()

const Career = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [editingJob, setEditingJob] = useState(null);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    status: 'active',
    image: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const scrollJobs = (direction) => {
    const container = document.getElementById('jobs-container');
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft);
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setJobData({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      status: job.status,
      image: job.image
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // In a real app, you would update the job in your database here
    console.log('Saving job:', jobData);
    setShowEditModal(false);
  };

  const handleDelete = (jobId) => {
    // In a real app, you would delete the job from your database here
    console.log('Deleting job:', jobId);
  };

  const handleAddJob = () => {
    // In a real app, you would add the new job to your database here
    console.log('Adding new job:', jobData);
    setShowAddForm(false);
    setJobData({
      title: '',
      description: '',
      requirements: '',
      status: 'active',
      image: ''
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobData({...jobData, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Job Openings</h2>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Add New Job
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Add New Job Posting</h3>
            <div className="grid gap-4">
              <input
                type="text"
                value={jobData.title}
                onChange={(e) => setJobData({...jobData, title: e.target.value})}
                placeholder="Job Title"
                className="p-2 border rounded-md"
              />
              <textarea
                value={jobData.description}
                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                placeholder="Job Description"
                className="p-2 border rounded-md"
                rows="3"
              />
              <button
                onClick={handleAddJob}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="relative mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Current Openings</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollJobs('left')} 
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
                disabled={scrollPosition <= 0}
              >
                <FaChevronLeft className={scrollPosition <= 0 ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <button 
                onClick={() => scrollJobs('right')} 
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>

          <div 
            id="jobs-container"
            className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide mx-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {jobRoles.map(job => (
              <div 
                key={job.id} 
                className={`flex-shrink-0 w-72 bg-white rounded-xl m-4 border overflow-hidden transition-all duration-300 ${selectedRole === job.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                onClick={() => setSelectedRole(job.id)}
              >
                {job.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditClick(job); }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Posted: {job.posted}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="bg-blue-50 text-blue-800 text-center py-2 rounded-lg">
                    {job.candidates} {job.candidates === 1 ? 'Applicant' : 'Applicants'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRole && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Candidates for {jobRoles.find(job => job.id === selectedRole)?.title}
                </h3>
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-4">
                {candidateData[selectedRole]?.map(candidate => (
                  <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{candidate.name}</h4>
                        <p className="text-gray-600 text-sm">{candidate.details}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        candidate.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        candidate.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-700">{candidate.email}</p>
                        <p className="text-sm text-gray-500">{candidate.contact}</p>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href={candidate.resumeFile}
                          download
                          className="text-red-600 hover:text-red-800 text-xl"
                          title="Download Resume"
                        >
                          <FaFilePdf />
                        </a>
                        <span className="text-xs text-gray-500">Applied: {candidate.applied}</span>
                      </div>
                    </div>
                  </div>
                )) || <p className="text-gray-500">No candidates found for this position.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Edit Job Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-semibold">Edit Job Posting</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={jobData.title}
                        onChange={(e) => setJobData({...jobData, title: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea
                        value={jobData.description}
                        onChange={(e) => setJobData({...jobData, description: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        rows="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                      <textarea
                        value={jobData.requirements}
                        onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={jobData.status}
                        onChange={(e) => setJobData({...jobData, status: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Image</label>
                      {jobData.image && (
                        <div className="mb-2">
                          <img src={jobData.image} alt="Current job" className="w-full h-48 object-cover rounded-md" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;



