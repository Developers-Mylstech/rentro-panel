import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor"; // Import PrimeReact Editor
import CustomButton from "../../systemdesign/CustomeButton";

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
    <div className="w-full">
      <h3 className="heading mb-6">Add New Services</h3>

      {/* Service Information Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className=" subheading mb-4">Service Information</h2>

        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Title</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Service Title"
          />
        </div>

        {/* PrimeReact Editor for Service Short Description */}
        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Short Description</label>
          <div className="w-[70%]">
            <Editor
              value={formData.serviceShortDescription}
              onTextChange={(e) => setFormData({ ...formData, serviceShortDescription: e.htmlValue })}
              style={{ height: "200px" }}
            />
          </div>
        </div>

        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Image</label>
          <input
            type="file"
            className="border p-2 rounded w-[70%]"
            name="firstImage"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Service Detail Information */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className="subheading mb-4">Service Detail Information</h2>

        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Heading</label>
          <InputText
            className="w-[70%] p-2 border rounded"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Service Heading"
          />
        </div>

        {/* PrimeReact Editor for Long Description */}
        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Long Description</label>
          <div className="w-[70%]">
            <Editor
              value={formData.description}
              onTextChange={(e) => setFormData({ ...formData, description: e.htmlValue })}
              style={{ height: "200px" }}
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className="subheading mb-4">Images</h2>

        <div className="mb-4 flex justify-between">
          <label className="block text mb-2">First Image</label>
          <input
            type="file"
            className="border p-2 rounded w-[70%]"
            name="firstImage"
            onChange={handleFileChange}
          />
        </div>

        {formData.firstImage && (
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Second Image</label>
            <input
              type="file"
              className="border p-2 rounded w-[70%]"
              name="secondImage"
              onChange={handleFileChange}
            />
          </div>
        )}

        {formData.secondImage && (
          <div className="mb-4 flex justify-between">
            <label className="block text mb-2">Third Image</label>
            <input
              type="file"
              className="border p-2 rounded w-[70%]"
              name="thirdImage"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <h2 className="subheading mb-4">Features</h2>

        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="mb-4">
            <div className="mb-4 flex justify-between">
              <label className="text mb-2">{`Feature ${num} Title`}</label>
              <InputText
                className="w-[70%] p-2 border rounded"
                name={`feature${num}Title`}
                value={formData[`feature${num}Title`] || ""}
                onChange={handleChange}
                placeholder={`Feature ${num} Title`}
              />
            </div>

            <div className="mb-4 flex justify-between">
              <label className="text mb-2">{`Feature ${num} Description`}</label>
              <div className="w-[70%]">
                <Editor
                  value={formData[`feature${num}Description`] || ""}
                  onTextChange={(e) => setFormData({ ...formData, [`feature${num}Description`]: e.htmlValue })}
                  style={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <CustomButton title="Submit" onClick={handleSubmit} icon={'pi pi-save'} />
      </div>
    </div>
  );
}
