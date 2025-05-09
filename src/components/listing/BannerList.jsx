import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBannerStore from '../../Context/BannerContext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Skeleton } from 'primereact/skeleton';
import { classNames } from 'primereact/utils';

export default function BannerList() {
  const { loading, banners, fetchBanners, deleteBanner } = useBannerStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEditBanner = (banner) => {
    navigate('/banner/add', { state: { banner } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 dark:bg-gray-800">
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-700">
              <div className="flex items-center gap-4">
                <Skeleton width="80px" height="80px" className="rounded-lg dark:bg-gray-600" />
                <Skeleton width="30%" height="1.5rem" className="dark:bg-gray-600" />
                <div className="ml-auto flex gap-2">
                  <Skeleton width="2.5rem" height="2.5rem" shape="circle" className="dark:bg-gray-600" />
                  <Skeleton width="2.5rem" height="2.5rem" shape="circle" className="dark:bg-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light text-gray-800 dark:text-gray-200">Banner Management</h2>
        <Button
          label="Add New Banner"
          icon="pi pi-plus"
          className="p-button-sm mt-4 p-2 rounded-md text-white bg-secondary"
          onClick={() => navigate('/banner/add')}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border dark:bg-gray-700 dark:border-gray-600">
        {banners.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-300">
            <i className="pi pi-image text-4xl mb-2" />
            <p className="text-lg">No banners found</p>
            <Button
              label="Create First Banner"
              icon="pi pi-plus"
              className="p-button-text mt-4 p-2 rounded-md text-white bg-secondary"
              onClick={() => navigate('/banner/add')}
            />
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-600">
            {banners.map((banner) => (
              <div key={banner.bannerId} className="p-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-600">
                <div className="flex items-center">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-24 h-24 object-cover rounded-lg shadow-xs border dark:border-gray-600"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{banner.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Tooltip target=".edit-btn" position="top" />
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-text edit-btn dark:text-gray-200 dark:hover:bg-gray-500"
                      data-pr-tooltip="Edit"
                      onClick={() => handleEditBanner(banner)}
                    />
                    <Tooltip target=".delete-btn" position="top" />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-text p-button-danger delete-btn dark:hover:bg-gray-500"
                      data-pr-tooltip="Delete"
                      onClick={() => handleDelete(banner.bannerId)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}