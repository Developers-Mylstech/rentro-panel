import { useEffect, useRef, useState } from "react";
import useProductStore from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Skeleton } from 'primereact/skeleton';
import { Toast } from "primereact/toast";
import PdfUploader from "../widget/PdfUploader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function ProductListing() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);

  const { getProducts, products, deleteProduct, loading } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000
    });
  };

  const tableData = products.map(product => ({
    id: product.productId,
    image: product?.images[0]?.imageUrl || '',
    name: product.name,
    sku: product.inventory?.sku || 'N/A',
    category: product.category?.name || 'N/A',
    quantity: product.inventory?.quantity || 0,
    monthlyPrice: product.productFor?.rent?.monthlyPrice || 0,
    yearlyPrice: product.productFor?.rent?.discountPrice || 0
  }));

  const filteredProducts = tableData.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      setDeleting(true);
      try {
        const res = await deleteProduct(selectedProduct.id);
        if (res?.success) {
          showToast('success', 'Success', 'Product deleted successfully');
          getProducts();
        } else {
          showToast('error', 'Error', 'Failed to delete product');
        }
      } catch (error) {
        showToast('error', 'Error', 'An error occurred while deleting');
        console.error('Delete error:', error);
      } finally {
        setDeleting(false);
        setVisible(false);
        setSelectedProduct(null);
      }
    }
  };


  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <Toast ref={toast} position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 ">
        <h2 className="text-2xl font-bold">Products List</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            onClick={() => navigate('/products/add')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          >
            <i className="pi pi-plus"></i>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
        </div>) : (<div className="overflow-x-auto rounded-lg border dark:border-gray-700 shadow">
          <DataTable
            value={loading ? [] : filteredProducts}
            stripedRows
            sortMode="multiple"
            className="p-datatable-sm"
            responsiveLayout="scroll"
            emptyMessage="No products found"
            
          >
            <Column
              header="SNO"
              headerClassName="text-xs p-4 uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(data, options) => options.rowIndex + 1}
              sortable
            />
            <Column
              field="id"
              header="ID"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => `#PRO-${product?.id}-05`}
              bodyClassName="font-semibold text-xs"
              sortable
            />
            <Column
              header="Image"
              headerClassName="text-xs  uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => (
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            />
            <Column
              field="sku"
              header="SKU"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              bodyClassName="text-sm font-medium text-gray-900 dark:text-white"
            />
            <Column
              field="name"
              header="Name"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              bodyClassName="text-sm text-gray-500 dark:text-gray-300"
              sortable
            />
            <Column
              field="category"
              header="Category"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              bodyClassName="text-sm text-gray-500 dark:text-gray-300"
              sortable
            />
            <Column
              field="quantity"
              header="Quantity"
              sortable
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product?.quantity < 10
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
                  }`}>
                  {product.quantity}
                </span>
              )}
            />
            <Column
              field="monthlyPrice"
              header="Monthly Price"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => `AED ${product.monthlyPrice.toFixed(2)}`}
              bodyClassName="text-sm text-gray-500 dark:text-gray-300"
            />
            <Column
              field="yearlyPrice"
              header="Yearly Price"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => `AED ${product.yearlyPrice.toFixed(2)}`}
              bodyClassName="text-sm text-gray-500 dark:text-gray-300"
            />
            <Column
              header="Actions"
              headerClassName="text-xs uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              body={(product) => (
                <div className="border grid grid-cols-2 p-[2px] rounded gap-1">
                  <button
                    onClick={() => navigate(`/products/edit/${product?.id}`)}
                    className="w-full h-full text-black hover:text-blue-500 flex justify-center items-center bg-gray-100 rounded px-3 py-1"
                    title="Edit"
                  >
                    <i className="pi pi-pencil"></i>
                  </button>
                  <button
                    onClick={() => confirmDelete(product)}
                    className="w-full h-full text-red-500 rounded px-3 py-1"
                    title="Delete"
                  >
                    <i className="pi pi-trash"></i>
                  </button>
                </div>
              )}
            />
          </DataTable>
          {filteredProducts.length === 0 && !loading && <p className="text-center p-5 font-semibold uppercase w-full text-xs">No Product</p>}
        </div>)
      }

      <Dialog
        header="Confirmation"
        visible={visible}
        draggable={false}
        position="top"
        onHide={() => setVisible(false)}
        className="dark:bg-gray-900 dark:text-gray-100"
      >
        <p className="mb-6">Do you want to delete this product?</p>
        <div className="flex justify-between">
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={deleting}
            className={`px-4 py-2 text-white rounded-md ${deleting ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {deleting ? (
              <i className="pi pi-spin pi-spinner mr-2"></i>
            ) : null}
            {deleting ? 'Deleting...' : 'Delete'}
          </button>

        </div>
      </Dialog>
      {/* <PdfUploader/> */}
    </div>
  );
}