import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import CustomButton from "../../systemdesign/CustomeButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    serviceShortDescription: "",
    firstImage: null,
    secondImage: null,
    thirdImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("New Service Added:", formData);
    navigate("/service-list");
  };

  return (
    <>
      <div className=" w-full">
        <h3 className="text-2xl heading font-bold mb-6">Add New Services</h3>

        {/* Service Information Section */}
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <h2 className="subheading mb-4">Service Information</h2>

          <div className="mb-4 flex justify-between ">
            <label className="block text-gray-600 mb-2 text">
              Service Title
            </label>
            <InputText
              className="w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between ">
            <label className="block text text-gray-600 mb-2">
              Service Short Description
            </label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text text-gray-600 mb-2">
              Service Image
            </label>
            <input
              type="file"
              className="border text p-2 rounded w-[70%] "
              name="firstImage"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Service Detail Information */}
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <h2 className="font-semibold subheading mb-4">Service Detail Information</h2>

          <div className="mb-4 flex justify-between">
            <label className="block text text-gray-600 mb-2">
              Service Heading
            </label>
            <InputText
              className="w-[70%]  text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Heading"
            />
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text text-gray-600 mb-2">
              Service Sub Heading
            </label>
            <InputText
              className="w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Sub Heading"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text text-gray-600 mb-2">
              Service Long Description
            </label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit text"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <h2 className="font-semibold subheading mb-4  ">Images</h2>

          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">First Image</label>
            <input
              type="file"
              className="border text p-2 rounded w-[70%] "
              name="firstImage"
              onChange={handleFileChange}
            />
          </div>

          {/* Conditionally render second image input based on first image selection */}
          {formData.firstImage && (
            <div className="mb-4 flex justify-between">
              <label className="block text mb-2">Second Image</label>
              <input
                type="file"
                className="border p-2 text rounded w-[70%] "
                name="secondImage"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Conditionally render third image input based on second image selection */}
          {formData.secondImage && (
            <div className="mb-4 flex justify-between">
              <label className="block text mb-2">Third Image</label>
              <input
                type="file"
                className="border text p-2 rounded w-[70%] "
                name="thirdImage"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Why Choose Information */}
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <h2 className=" subheading mb-4">Why Choose Information</h2>

          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Section Title</label>
            <InputText
              className="w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Service Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit text"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>
        </div>

        {/* Features Information */}
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <h2 className="font-semibold mb-4 subheading">Features Information</h2>

          <div className="mb-4 flex  justify-between">
            <label className="block text   mb-2">Feature 1 Title</label>
            <InputText
              className=" w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 1 Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text  mb-2">Feature 1 Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature 2 Title</label>
            <InputText
              className="w-[70%]  text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 2 Title"
            />
          </div>

          {/* Add CKEditor for  Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature 2 Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>
        </div>
        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <div className="mb-4 flex justify-between">
            <label className="block text  mb-2">Feature 3 Title</label>
            <InputText
              className=" w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 3 Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature 3 Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text   mb-2">Feature 4 Title</label>
            <InputText
              className="w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 4 Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature 4 Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg shadow bg-white mb-6">
          <div className="mb-4 flex justify-between">
            <label className="block text    mb-2">Feature 5 Title</label>

            <InputText
              className=" w-[70%]  text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 5 Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature 5 Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <label className="block text   mb-2">Feature 6 Title</label>
            <InputText
              className="w-[70%] text p-2 border rounded"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Feature 6 Title"
            />
          </div>

          {/* Add CKEditor for Service Short Description */}
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Feature Description</label>
            <div className="w-[70%]">
              <CKEditor
                className="w-fit"
                editor={ClassicEditor}
                data={formData.serviceShortDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData({ ...formData, serviceShortDescription: data });
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <CustomButton title={"Submit"} />
        </div>
      </div>
    </>
  );
}
