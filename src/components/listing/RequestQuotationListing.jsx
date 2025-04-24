import React, { useEffect, useRef, useState } from "react";

import { FaFileImage } from "react-icons/fa6";
import { Toast } from 'primereact/toast';
import { useRequestQuotationStore } from "../../Context/RequestQoutation";
import { Menu } from "primereact/menu";
import AlertBox from "../widget/AlertBox";
export default function RequestQuotationListing() {
  const { quotations, loading, fetchQuotations, updateQuotation } = useRequestQuotationStore();
  const [search, setSearch] = useState("");

  const toast = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    isSuccess : true
  });
  useEffect(() => {
    fetchQuotations();
  }, []);


  const StatusDropdown = ({ rowData }) => {
    const [status, setStatus] = useState(rowData.status || 'SENT_QUOTATION');
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const menuRef = useRef(null);


    const statusOptions = [
      { value: 'SENT_QUOTATION', label: 'Sent Quotation', color: 'bg-blue-400' },
      { value: 'NEGOTIATION', label: 'Negotiation', color: 'bg-purple-400' },
      { value: 'WAITING_FOR_APPROVAL', label: 'Waiting Approval', color: 'bg-yellow-400' },
      { value: 'CLOSE_WON', label: 'Close Won', color: 'bg-green-400' },
      { value: ' CLOSE_LOST', label: 'Close Lost', color: 'bg-red-400' },
    ];

    const handleStatusChange = async (newStatus) => {
      setLoading(true);
      try {
        const res = await updateQuotation(rowData?.requestQuotationId, { status: newStatus });
        setStatus(newStatus);

        setAlertData({
          title: 'Status Updated',
          message: `Changed to: ${newStatus}`,
          isSuccess : true
        });
        setShowAlert(true);

        setTimeout(() => setShowAlert(false), 5000);
      } catch (error) {
        setAlertData({
          title: 'Update Failed',
          message: 'Could not update status',
          isSuccess : false

        });
        setShowAlert(true);
      } finally {
        setLoading(false);
        fetchQuotations()
      }
    };

    const currentStatus = statusOptions.find(opt => opt.value === status);

    return (
      <div className="relative">
        <Toast ref={toast} position="top-right" />
        <Menu
          model={statusOptions.map(option => ({
            label: (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${option.color}`}></span>
                {option.label}
              </div>
            ),
            command: () => handleStatusChange(option.value),
            className: status === option.value ? 'bg-gray-100' : '',
          }))}
          popup
          ref={menuRef}
          id="status_menu"
        />

        <button
          onClick={(e) => menuRef.current.toggle(e)}
          aria-controls="status_menu"
          aria-haspopup
          className={`flex items-center gap-2 px-3 py-1 rounded-md border text-sm ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span className={`w-2 h-2 rounded-full animate-pulse ${currentStatus?.color || 'bg-blue-400'}`}></span>
              <span>{currentStatus?.label.slice(0,10) || 'Sent Quotation'}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </>
          )}
        </button>
      </div>
    );
  };

  const actionsTemplate = (rowData) => {
    return (
      <div className="flex">
        <StatusDropdown rowData={rowData} />
      </div>
    )
  };


  const filteredQuotations = quotations?.filter(quotation => {
    const searchTerm = search.toLowerCase();
    return (
      (quotation.name?.toLowerCase().includes(searchTerm)) ||
      (quotation.mobile?.includes(searchTerm)) ||
      (quotation.companyName?.toLowerCase().includes(searchTerm)) ||
      (quotation.location?.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="">
      <Toast ref={toast} position="top-right" />

      <h5 className="heading w-full dark:text-gray-100 mb-3">Request Quotation List</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-gray-700 dark:text-white text-sm font-semibold">Total Requests</h6>
            <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-purple-100 text-purple-700 rounded-md">
              All
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="md:text-2xl text-base font-bold text-purple-700 dark:text-white">{quotations?.length}</p>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Requests</p>
            </div>
          </div>
        </div>


      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Image', 'Name', 'Mobile', 'Company', 'Location', 'Actions'].map((e, index) => <th key={index} scope="col" className="font-semibold px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
                  {e}
                </th>)}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No quotations found
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((quotation) => (
                  <tr
                    key={quotation.requestQuotationId}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    // onClick={() => setSelectedQuotation(quotation)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quotation.requestQuotationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {imageTemplate(quotation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quotation.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quotation.mobile || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quotation.companyName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quotation.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {actionsTemplate(quotation)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredQuotations.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredQuotations.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>



      {showAlert && (
        <AlertBox
          title={alertData?.title}
          message={alertData?.message}
          isSuccess={alertData?.isSuccess}
          onClose={() => setShowAlert(false)}
        />
      )}

    </div>
  );
}

const imageTemplate = (rowData) => {
  if (!rowData.productImages || rowData.productImages.length === 0) {
    return (
      <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center mx-auto">
        <FaFileImage className="text-gray-400 text-xl" />
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 rounded-md overflow-hidden mx-auto group">
      <img
        src={rowData.productImages[0]}
        alt="Product"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.parentElement.innerHTML = `
          <div class="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg class="text-gray-400 text-xl" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        `;
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <FaFileImage className="text-white text-lg" />
      </div>
    </div>
  );
};