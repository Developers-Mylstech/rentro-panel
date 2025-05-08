import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    bannerId: null,
    title: '',
    imageUrl: ''
  });

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosInstance.get('/banners');
        setBanners(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/banners/${id}`);
      setBanners(banners.filter(banner => banner.bannerId !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleEdit = (banner) => {
    setEditForm({
      bannerId: banner.bannerId,
      title: banner.title,
      imageUrl: banner.imageUrl
    });
    setVisible(true);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/banners/${editForm.bannerId}`, editForm);
      setBanners(banners.map(banner =>
        banner.bannerId === editForm.bannerId ? { ...banner, ...editForm } : banner
      ));
      setVisible(false);
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Banner Management</h2>

      <div className="bg-white shadow-md rounded-lg min-w-[800px] overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banners.map(banner => (
              <tr key={banner.bannerId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={banner.imageUrl} alt={banner.title} className='w-20 h-20 object-cover' />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="border grid grid-cols-2 p-[2px] rounded gap-1">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="w-full h-full text-black hover:text-blue-500 flex justify-center items-center bg-gray-100 rounded px-3 py-1"
                      title="Edit"
                    >
                      <i className="pi pi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(banner.bannerId)}
                      className="w-full h-full text-red-500 rounded px-3 py-1"
                      title="Delete"
                    >
                      <i className="pi pi-trash"></i>
                    </button>

                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Dialog
        header="Edit Banner"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <InputText
              id="title"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <InputText
              id="imageUrl"
              name="imageUrl"
              value={editForm.imageUrl}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setVisible(false)}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={handleSave}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}