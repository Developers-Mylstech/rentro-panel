import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import useJobStore from '../../Context/JobContext';
import axios from 'axios';

function AddCareer() {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    notes: '',
    image: null,
  });
  const { createJob } = useJobStore();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Step 1: Upload the image
      if (formData.image) {
        const imageData = new FormData();
        imageData.append('file', formData.image);

        const uploadRes = await axios.post('https://demo.rentro.ae/api/v1/product-images/upload', imageData);
        imageUrl = uploadRes?.data?.fileUrl;
      }

      // Step 2: Post job data
      const payload = {
        jobTitle: formData.heading,
        jobDescription: formData.description,
        requirements: formData.notes,
        isActive: true,
        image: imageUrl,
      };

      await createJob(payload);

      alert('Career page data saved!');
      setFormData({
        heading: '',
        description: '',
        notes: '',
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error('Error submitting career data:', error);
      alert('Failed to save career page data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Career Page</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Job Title</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter Job Title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
            placeholder="Enter career page description"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Job Requirements</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            className="w-full border p-2 rounded"
            placeholder="Job Details "
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Career Page Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Preview Image:</p>
            <img src={preview} alt="Preview" className="w-full max-w-md rounded shadow" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default AddCareer;
