import React, { useState } from 'react';

function AddCareer() {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    notes: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Career Page Data:', formData);

    // Here you could send the formData to a server using fetch or axios
    alert('Career page data saved!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Career Page</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Heading */}
        <div>
          <label className="block text-gray-600 font-medium">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter career page heading"
            required
          />
        </div>

        {/* Description */}
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

        {/* Notes */}
        <div>
          <label className="block text-gray-600 font-medium">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            className="w-full border p-2 rounded"
            placeholder="Any other information (optional)"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 font-medium">Career Page Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Preview Image:</p>
            <img src={preview} alt="Preview" className="w-full max-w-md rounded shadow" />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AddCareer;
