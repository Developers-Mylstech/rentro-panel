import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function ImageUploader({ setImage }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(previews);
        setResponseData([]);
        setMessage("");
    };

    const handleUpload = async () => {
        if (!selectedFiles.length) {
            setMessage("Please select at least one image.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            setUploading(true);
            setMessage("");

            const response = await axiosInstance.post(
                'product-images/batch-upload?quality=80&fallbackToJpeg=true',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setMessage("Upload successful!");
            setResponseData(response.data);

            const urls = response.data.map(file => file.fileUrl);
            setImage(urls);

            setSelectedFiles([]);
            setPreviewUrls([]);
        } catch (error) {
            console.error(error);
            setMessage("Upload failed.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className=" mx-auto bg-white rounded-xl space-y-4">
            <h2 className="text-xl font-bold">Product Images</h2>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
            />

            {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {previewUrls.map((src, idx) => (
                        <div key={idx} className="relative">
                            <img
                                src={src}
                                alt={`preview-${idx}`}
                                className="w-full h-28 object-cover rounded border"
                            />
                            {idx === 0 && (
                                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                                    Main
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}


            <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                {uploading ? 'Uploading...' : 'Upload Images'}
            </button>

            {message && (
                <p className={`text-center text-sm ${message.includes("failed") ? 'text-red-500' : 'text-green-600'}`}>
                    {message}
                </p>
            )}

            {responseData.length > 0 && (
                <div className="pt-4">
                    <h3 className="font-semibold">Uploaded Files:</h3>
                    <ul className="text-sm flex gap-2 text-gray-700 space-y-1">
                        {responseData.map((file, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <img src={file.fileUrl} alt="" className='w-20 h-20 rounded-lg object-cover'/>
                                {/* ✅ <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{file.fileName}</a> ({file.size} bytes) */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
