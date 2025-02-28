import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import CustomButton from "../../systemdesign/CustomeButton";
import { FileUpload } from "primereact/fileupload";
// import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";

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
  const { register } = useForm();

  const [imagePaths, setImagePaths] = useState({
    firstImage: "",
    secondImage: "",
    thirdImage: "",
  });

  const [errors, setErrors] = useState({
    firstImage: "",
    secondImage: "",
    thirdImage: "",
  });

  // File Validation Logic
  const validateFile = (file, name) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (!allowedTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only JPEG and PNG files are allowed.",
      }));
      setImagePaths((prevPaths) => ({ ...prevPaths, [name]: "" }));
      return false;
    }

    if (file.size > maxSize) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "File size should be less than 1 MB.",
      }));
      setImagePaths((prevPaths) => ({ ...prevPaths, [name]: "" }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    return true;
  };

  const handleFileSelect = (e, name) => {
    const file = e.files[0];
    if (file && validateFile(file, name)) {
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      setImagePaths((prevPaths) => ({ ...prevPaths, [name]: file.name }));
    }
  };

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

        <div className="mb-4 flex justify-between">
          <label className="text mb-2">Service Short Description</label>
          <div className="w-[70%]">
            <Editor
              value={formData.serviceShortDescription}
              onTextChange={(e) =>
                setFormData({
                  ...formData,
                  serviceShortDescription: e.htmlValue,
                })
              }
              style={{ height: "200px" }}
            />
          </div>
        </div>

        <div className="mb-4  flex justify-between md:items-start">
          <div className=" mb-4">
            <h4 className="font-semibold subheading">Service Image</h4>
            <p className="text-yellow-500 opacity-70 text-sm mt-1">
              **Image should be below 1 MB and should have dimentions of 500X600
              and type of .png / .jpeg / .webp**
            </p>
          </div>
        
          <FileUpload
            mode="basic"
            name="serviceImage"
            chooseOptions={{ className: "bg-secondary" }}
            url="/api/upload"
            className=""
            contentStyle="bg-red-300"
            chooseLabel="Choose File"
            accept="image/*"
            {...register("serviceImage", { required: "Image is required" })}
            customUpload
          />
     
        </div>
      </div>

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
              onTextChange={(e) =>
                setFormData({ ...formData, description: e.htmlValue })
              }
              style={{ height: "200px" }}
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="border p-6 rounded-lg shadow bg-white mb-6">
        <div className=" mb-4">
          <h4 className="font-semibold subheading">Images</h4>
          <p className="text-yellow-500 opacity-70 text-sm mt-1">
            **Image should be below 1 MB and should have dimentions of 500X600
            and type of .png / .jpeg / .webp**
          </p>
        </div>

        {["firstImage", "secondImage", "thirdImage"].map((imageName, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <label className="block text mb-2">{`Image ${index + 1}`}</label>
            <FileUpload
              name={imageName}
              mode="basic"
              customUpload
              accept="image/jpeg, image/png"
              maxFileSize={1 * 1024 * 1024}
              chooseLabel={
                imagePaths[imageName] ? imagePaths[imageName] : `Choose File`
              }
              chooseOptions={{ className: "bg-secondary" }}
              auto
              onSelect={(e) => handleFileSelect(e, imageName)}
            />

            {errors[imageName] && (
              <p className="mt-2 text-sm text-red-600">{errors[imageName]}</p>
            )}
          </div>
        ))}
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
                  onTextChange={(e) =>
                    setFormData({
                      ...formData,
                      [`feature${num}Description`]: e.htmlValue,
                    })
                  }
                  style={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <CustomButton
          title="Submit"
          onClick={handleSubmit}
          icon={"pi pi-save"}
        />
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { InputText } from "primereact/inputtext";
// import { Editor } from "primereact/editor";
// import CustomButton from "../../systemdesign/CustomeButton";
// import { FileUpload } from "primereact/fileupload";

// export default function AddService() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     serviceShortDescription: "",
//     firstImage: null,
//     secondImage: null,
//     thirdImage: null,
//     serviceImage:null
//   });

//   const [imagePaths, setImagePaths] = useState({
//     firstImage: "",
//     secondImage: "",
//     thirdImage: "",
//   });

//   const [errors, setErrors] = useState({
//     firstImage: "",
//     secondImage: "",
//     thirdImage: "",
//   });

//   // File Validation Logic
//   const validateFile = (file, name) => {
//     const allowedTypes = ["image/jpeg", "image/png"];
//     const maxSize = 1 * 1024 * 1024; // 1 MB

//     if (!allowedTypes.includes(file.type)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "Only JPEG and PNG files are allowed.",
//       }));
//       setImagePaths((prevPaths) => ({ ...prevPaths, [name]: "" }));
//       return false;
//     }

//     if (file.size > maxSize) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "File size should be less than 1 MB.",
//       }));
//       setImagePaths((prevPaths) => ({ ...prevPaths, [name]: "" }));
//       return false;
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     return true;
//   };

//   const handleFileSelect = (e, name) => {
//     const file = e.files[0];
//     if (file && validateFile(file, name)) {
//       setFormData((prevData) => ({ ...prevData, [name]: file }));
//       setImagePaths((prevPaths) => ({ ...prevPaths, [name]: file.name }));
//     } else {
//       // Reset the file input if validation fails
//       setFormData((prevData) => ({ ...prevData, [name]: null }));
//       setImagePaths((prevPaths) => ({ ...prevPaths, [name]: "" }));
//       e.options.clear();
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     console.log("New Service Added:", formData);
//     navigate("/service-list");
//   };

//   return (
//     <div className="w-full">
//       <h3 className="heading mb-6">Add New Services</h3>

//       {/* Service Information Section */}
//       <div className="border p-6 rounded-lg shadow bg-white mb-6">
//         <h2 className="subheading mb-4">Service Information</h2>

//         <div className="mb-4 flex justify-between">
//           <label className="text mb-2">Service Title</label>
//           <InputText
//             className="w-[70%] p-2 border rounded"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Service Title"
//           />
//         </div>

//         <div className="mb-4 flex justify-between">
//           <label className="text mb-2">Service Short Description</label>
//           <div className="w-[70%]">
//             <Editor
//               value={formData.serviceShortDescription}
//               onTextChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   serviceShortDescription: e.htmlValue,
//                 })
//               }
//               style={{ height: "200px" }}
//             />
//           </div>
//         </div>

//         <div className="mb-4 flex justify-between md:items-start">
//           <label className="text mb-2">Service Image</label>
//           <div className="w-[70%]">
//             <FileUpload
//               mode="basic"
//               name="serviceImage"
//               customUpload
//               accept="image/jpeg, image/png"
//               // chooseLabel={serviceImage?serviceImage:`Choose File`}
//               chooseOptions={{ className: "bg-secondary" }}
//               auto
//               onSelect={(e) => handleFileSelect(e, "serviceImage")}
//             />

//             {errors.firstImage && (
//               <p className="mt-2 text-sm text-red-600">{errors.firstImage}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Images Section */}
//       <div className="border p-6 rounded-lg shadow bg-white mb-6">
//         <h2 className="subheading mb-4">Images</h2>

//         {["firstImage", "secondImage", "thirdImage"].map((imageName, index) => (
//           <div key={index} className="mb-4 flex justify-between">
//             <label className="block text mb-2">{`Image ${index + 1}`}</label>
//             <FileUpload
//               mode="basic"
//               name={imageName}
//               customUpload
//               accept="image/jpeg, image/png"
//               chooseLabel={imagePaths[imageName]?imagePaths[imageName]:`Choose File`}
//               chooseOptions={{ className: "bg-secondary" }}
//               auto
//               onSelect={(e) => handleFileSelect(e, imageName)}
//             />

//             {errors[imageName] && (
//               <p className="mt-2 text-sm text-red-600">{errors[imageName]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center mt-6">
//         <CustomButton title="Submit" onClick={handleSubmit} icon={"pi pi-save"} />
//       </div>
//     </div>
//   );
// }
