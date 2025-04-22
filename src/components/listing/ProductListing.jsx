import { useEffect, useState } from "react";
import useProductStore from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

export default function ProductListing() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { getProducts, products , deleteProduct} = useProductStore();
  
  useEffect(() => {
    getProducts();
  }, []);

  // Transform product data for table display
  const tableData = products.map(product => ({
    id: product.productId,
    image: product.imageUrls?.[0] || '',
    name: product.name,
    sku: product.inventory?.sku || 'N/A',
    category: product.category?.name || 'N/A',
    quantity: product.inventory?.quantity || 0,
    monthlyPrice: product.productFor?.rent?.monthlyPrice || 0,
    yearlyPrice: product.productFor?.rent?.discountPrice || 0
  }));

  // Filter products based on search
  const filteredProducts = tableData.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setVisible(true); // Show dialog
  };
  
  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const res = await deleteProduct(selectedProduct.id);
  console.log(res)
      if (res?.data) {
        alert("Item Deleted");
        setVisible(false);
        setSelectedProduct(null);
        getProducts(); // Refresh the list
      } else {
        alert("Failed to delete item");
      }
    }
  };
  

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
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

      {/* HTML Table */}
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700 shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monthly Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Yearly Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.quantity < 10 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  AED {product.monthlyPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  AED {product.yearlyPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Edit"
                    >
                      <i className="pi pi-pencil"></i>
                    </button>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
}