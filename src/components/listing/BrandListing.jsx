// // import React, { useState } from "react";
// // import { Button } from "primereact/button";
// // import { IconField } from "primereact/iconfield";
// // import { InputIcon } from "primereact/inputicon";
// // import { InputText } from "primereact/inputtext";
// // import { Dialog } from "primereact/dialog";
// // import CustomButton from "../../systemdesign/CustomeButton";
// // import { useNavigate } from "react-router-dom";
// // import useBrandStore from "../../Context/BrandContext";

// // export default function BrandListing({ brands }) {
// //   const [search, setSearch] = useState("");
// //   const [visible, setVisible] = useState(false);
// //   const { removeBrand, getAllBrands } = useBrandStore()
// //   const navigate = useNavigate();

// //   const handleDelete = (brandId) => {
// //     removeBrand(brandId)
// //     setVisible(false);
// //     getAllBrands()
// //   };

// //   return (
// //     <div className="p-4">
// //       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 text-white">
// //         <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-0 dark:text-gray-200 text-black">Brand List</h1>
// //         <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
// //           <IconField iconPosition="right" className="w-full sm:w-60 border border-gray-400 dark:bg-gray-800 p-2 rounded">
// //             <InputIcon className="pi pi-search text-gray-400" />
// //             <InputText
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search..."
// //               className="p-inputtext-sm focus:ring-0 focus:outline-none w-full dark:bg-gray-800 text-white placeholder-gray-400 "
// //             />
// //           </IconField>

// //           <CustomButton
// //             title="Add"
// //             icon="pi pi-plus"
// //             onClick={() => navigate("/brands/add")}
// //             className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
// //           />
// //         </div>
// //       </div>

// //       <div className="hidden md:block">
// //         <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
// //           <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
// //             <tr>
// //               <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Image</th>
// //               <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Name</th>
// //               <th className="p-2">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {brands.map((brand) => (
// //               <tr
// //                 key={brand.id}
// //                 className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
// //               >
// //                 <td className="p-2 text-center">
// //                   <img
// //                     src={brand.images}
// //                     alt={brand.name}
// //                     className="w-16 h-12 object-contain mx-auto text-sm"
// //                   />
// //                 </td>
// //                 <td className="p-2 text-center font-semibold text-sm">{brand.name}</td>
// //                 <td className="p-2 text-center">
// //                   <div className="flex justify-center gap-2">
// //                     <Button
// //                       icon="pi pi-pencil"
// //                       className="p-button-text rounded-lg text-white bg-blue-500 p-2 "
// //                     />
// //                     <Button
// //                       icon="pi pi-trash"
// //                       onClick={() => handleDelete(brand.brandId)}
// //                       className="p-button-text rounded-lg text-white bg-red-500 p-2 "
// //                     />
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>



// //       {/* <div className="block md:hidden px-4">
// //         {filteredBrands.map((brand) => (
// //           <div
// //             key={brand.id}
// //             className="border border-gray-300 rounded-md shadow-sm p-3 mb-3"
// //           >
// //             <div className="flex items-center gap-4">
// //               <img
// //                 src={brand.image}
// //                 alt={brand.name}
// //                 className="w-10 h-6 object-contain"
// //               />
// //               <div className="flex justify-between items-center w-full">
// //                 <h3 className="text-lg font-semibold">{brand.name}</h3>
// //                 <div className="flex gap-2 ">
// //                   <Button
// //                     icon="pi pi-pencil"
// //                     className="p-button-text text-blue-500 hover:text-blue-700"
// //                   />
// //                   <Button
// //                     icon="pi pi-trash"
// //                     onClick={() => setVisible(true)}
// //                     className="p-button-text text-red-500 hover:text-red-700"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div> */}

// //       <Dialog
// //         header="Confirmation"
// //         position="top"
// //         draggable={false}
// //         visible={visible}
// //         onHide={() => setVisible(false)}
// //         className="max-w-md"
// //       >
// //         <p className="mb-6 text-center text-gray-700">
// //           Do you want to delete this field?
// //         </p>
// //         <div className="flex justify-between">
// //           <CustomButton title="Yes" icon="pi pi-check" onClick={handleDelete} />
// //           <CustomButton title="No" icon="pi pi-times" onClick={() => setVisible(false)} />
// //         </div>
// //       </Dialog>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Button } from "primereact/button";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { InputText } from "primereact/inputtext";
// import { Dialog } from "primereact/dialog";
// import { Paginator } from "primereact/paginator";
// import CustomButton from "../../systemdesign/CustomeButton";
// import { useNavigate } from "react-router-dom";
// import useBrandStore from "../../Context/BrandContext";

// export default function BrandListing({ brands }) {
//   const [search, setSearch] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [first, setFirst] = useState(0);
//   const [rows, setRows] = useState(5);

//   const { removeBrand, getAllBrands } = useBrandStore();
//   const navigate = useNavigate();

//   const filteredBrands = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const paginatedBrands = filteredBrands.slice(first, first + rows);

//   const handleDelete = () => {
//     if (deleteId) {
//       removeBrand(deleteId);
//       getAllBrands();
//     }
//     setVisible(false);
//   };

//   const onPageChange = (e) => {
//     setFirst(e.first);
//     setRows(e.rows);
//   };

//   const editBrand = (brand) => {
//     navigate("/brands/add", { state: { brand } });
//   };

//   return (
//     <div className="p-4">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 text-white">
//         <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-0 dark:text-gray-200 text-black">
//           Brand List
//         </h1>
//         <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
//           <IconField iconPosition="right" className="w-full sm:w-60 border border-gray-400 dark:bg-gray-800 p-2 rounded">
//             <InputIcon className="pi pi-search text-gray-400" />
//             <InputText
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setFirst(0); // Reset to first page on search
//               }}
//               placeholder="Search..."
//               className="p-inputtext-sm focus:ring-0 focus:outline-none w-full dark:bg-gray-800 text-white placeholder-gray-400"
//             />
//           </IconField>

//           <CustomButton
//             title="Add"
//             icon="pi pi-plus"
//             onClick={() => navigate("/brands/add")}
//             className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="hidden md:block">
//         <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//           <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
//             <tr>
//               <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Image</th>
//               <th className="p-2 border-r border-gray-300 dark:border-gray-700">Brand Name</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedBrands.length > 0 ? (
//               paginatedBrands.map((brand) => (
//                 <tr
//                   key={brand.id}
//                   className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   <td className="p-2 text-center">
//                     <img
//                       src={brand.images}
//                       alt={brand.name}
//                       className="w-16 h-12 object-contain mx-auto text-sm"
//                     />
//                   </td>
//                   <td className="p-2 text-center font-semibold text-sm">{brand.name}</td>
//                   <td className="p-2 text-center">
//                     <div className="flex justify-center gap-2">
//                       <Button
//                         icon="pi pi-pencil"
//                         className="p-button-text rounded-lg text-white bg-blue-500 p-2"
//                         onClick={() => navigate(`/brands/edit/${brand.brandId}`)}
//                       />
//                       <Button
//                         icon="pi pi-trash"
//                         onClick={() => {
//                           setDeleteId(brand.brandId);
//                           setVisible(true);
//                         }}
//                         className="p-button-text rounded-lg text-white bg-red-500 p-2"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-gray-400">
//                   No brands found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Paginator */}
//       {filteredBrands.length > 0 && (
//         <Paginator
//           first={first}
//           rows={rows}
//           totalRecords={filteredBrands.length}
//           rowsPerPageOptions={[5,10]}
//           onPageChange={onPageChange}
//           className="mt-4 md:block hidden w-full text-center"
//         />
//       )}


// <div className="md:hidden grid gap-4">
//   {paginatedBrands.length > 0 ? (
//     paginatedBrands.map((brand) => (
//       <div
//         key={brand.id}
//         className="rounded-xl bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between"
//       >
//         <div className="flex items-center gap-4">
//           <img
//             src={brand.images}
//             alt={brand.name}
//             className="w-16 h-12 object-contain rounded-md border border-gray-200 dark:border-gray-700"
//           />
//           <div>
//             <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">
//               {brand.name}
//             </h2>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             icon="pi pi-pencil"
//             className="p-button-rounded p-button-sm text-blue-500 border border-blue-500 "
//             onClick={() => editBrand(brand)}
//           />
//           <Button
//             icon="pi pi-trash"
//             className="p-button-rounded p-button-sm border border-red-500 text-red-500"
//             onClick={() => {
//               setDeleteId(brand.brandId);
//               setVisible(true);
//             }}
//           />
//         </div>
//       </div>
//     ))
//   ) : (
//     <p className="text-center text-gray-500 dark:text-gray-400">No brands found.</p>
//   )}
// </div>



//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         header="Confirmation"
//         position="top"
//         draggable={false}
//         visible={visible}
//         onHide={() => setVisible(false)}
//         className="max-w-md"
//       >
//         <p className="mb-6 text-center text-gray-700">
//           Do you want to delete this brand?
//         </p>
//         <div className="flex justify-between">
//           <CustomButton title="Yes" icon="pi pi-check" onClick={handleDelete} />
//           <CustomButton title="No" icon="pi pi-times" onClick={() => setVisible(false)} />
//         </div>
//       </Dialog>
//     </div>
//   );
// }




import React, { useState } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Paginator } from "primereact/paginator";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import useBrandStore from "../../Context/BrandContext";
import CustomButton from "../../systemdesign/CustomeButton";
import { Badge } from "primereact/badge";
import { Tooltip } from "primereact/tooltip";

export default function BrandListing({ brands }) {
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [loading, setLoading] = useState(false);

  const { removeBrand, getAllBrands } = useBrandStore();
  const navigate = useNavigate();

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedBrands = filteredBrands.slice(first, first + rows);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await removeBrand(id);
      await getAllBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this brand?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger p-1 mx-4 bg-red-400 text-white",
      accept: () => handleDelete(id),
      rejectClassName: "   p-1  bg-blue-400 text-white "
    });
  };

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  const editBrand = (brand) => {
    navigate("/brands/add", { state: { brand } });
  };

  return (
    <div className="p-4">
      <ConfirmDialog className="m-4" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Brand List
        </h1>
         
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <IconField className="w-full sm:w-60">
            <InputIcon className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFirst(0);
              }}
              placeholder="Search brands..."
              className="w-full pl-8"
            />
          </IconField>

          <CustomButton
            title="Add Brand"
            icon="pi pi-plus"
            onClick={() => navigate("/brands/add")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedBrands.length > 0 ? (
                paginatedBrands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-contain"
                            src={brand.images?.[0] || "/default-brand.png"}
                            alt={brand.name}
                            onError={(e) => {
                              e.target.src = "/default-brand.png";
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {brand.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Tooltip target=".edit-btn" content="Edit Brand" position="top" />
                        <Button
                          icon="pi pi-pencil"
                          className="edit-btn p-button-rounded p-button-text p-button-sm text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
                          onClick={() => editBrand(brand)}
                          aria-label="Edit"
                        />
                        
                        <Tooltip target=".delete-btn" content="Delete Brand" position="top" />
                        <Button
                          icon="pi pi-trash"
                          className="delete-btn p-button-rounded p-button-text p-button-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                          onClick={() => confirmDelete(brand.brandId)}
                          aria-label="Delete"
                          loading={loading}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      {search ? "No matching brands found" : "No brands available"}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-3">
        {paginatedBrands.length > 0 ? (
          paginatedBrands.map((brand) => (
            <div
              key={brand._id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  src={brand.images?.[0] || "/default-brand.png"}
                  alt={brand.name}
                  onError={(e) => {
                    e.target.src = "/default-brand.png";
                  }}
                />
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {brand.name}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text p-button-sm text-blue-500"
                  onClick={() => editBrand(brand)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-text p-button-sm text-red-500"
                  onClick={() => confirmDelete(brand.brandId)}
                  loading={loading}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow">
            {search ? "No matching brands found" : "No brands available"}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBrands.length > rows && (
        <div className="mt-4">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredBrands.length}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={onPageChange}
            className="border-0"
            template={{
              layout: "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown",
            }}
          />
        </div>
      )}
    </div>
  );
}