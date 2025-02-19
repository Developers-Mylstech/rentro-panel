import { useState } from "react";
import { Link } from "react-router-dom";

function CustomSidebar() {
  const [activeMenu, setActiveMenu] = useState(null); // Store only one active menu

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu); // Close if already open
  };

  return (
    <div className="w-64 h-screen bg-primary shadow-md fixed p-5">
      <h2 className="text-xl font-bold mb-5 text-secondary">Admin Panel</h2>
      <ul className="space-y-2">
        
        <li>
          <Link to="/" className="flex items-center gap-3 p-2 text-secondary bg-primary hover:bg-secondary hover:text-primary rounded">
            <i className="pi pi-home text-lg"></i>
            <span>Dashboard</span>
          </Link>
        </li>


        <li>
          <button
            onClick={() => toggleMenu("product")}
            className={`flex items-center justify-between w-full p-2 rounded ${
              activeMenu === "product" ? "bg-secondary text-primary" : "text-secondary bg-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="pi pi-box text-lg"></i>
              <span>Product</span>
            </div>
            <i className={`pi ${activeMenu === "product" ? "pi-chevron-down" : "pi-chevron-right"}`}></i>
          </button>
          {activeMenu === "product" && (
            <ul className="pl-8 mt-2 space-y-1">
              <li>
                <Link to="/products" className="block p-2 text-gray-400 hover:text-secondary">
                  - Products
                </Link>
              </li>
              <li>
                <Link to="/products/add" className="block p-2 text-gray-400 hover:text-secondary">
                  - Add New Products
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Category Dropdown */}
        <li>
          <button
            onClick={() => toggleMenu("category")}
            className={`flex items-center justify-between w-full p-2 rounded ${
              activeMenu === "category" ? "bg-secondary text-primary" : "text-secondary bg-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="pi pi-tags text-lg"></i>
              <span>Category</span>
            </div>
            <i className={`pi ${activeMenu === "category" ? "pi-chevron-down" : "pi-chevron-right"}`}></i>
          </button>
          {activeMenu === "category" && (
            <ul className="pl-8 mt-2 space-y-1">
              <li>
                <Link to="/categories" className="block p-2 text-gray-400 hover:text-secondary">
                  - All Categories
                </Link>
              </li>
              <li>
                <Link to="/categories/add" className="block p-2 text-gray-400 hover:text-secondary">
                  - Add New Category
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Brand Dropdown */}
        <li>
          <button
            onClick={() => toggleMenu("brand")}
            className={`flex items-center justify-between w-full p-2 rounded ${
              activeMenu === "brand" ? "bg-secondary text-primary" : "text-secondary bg-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="pi pi-bookmark text-lg"></i>
              <span>Brand</span>
            </div>
            <i className={`pi ${activeMenu === "brand" ? "pi-chevron-down" : "pi-chevron-right"}`}></i>
          </button>
          {activeMenu === "brand" && (
            <ul className="pl-8 mt-2 space-y-1">
              <li>
                <Link to="/brands" className="block p-2 text-gray-400 hover:text-secondary">
                  - All Brands
                </Link>
              </li>
              <li>
                <Link to="/brands/add" className="block p-2 text-gray-400 hover:text-secondary">
                  - Add New Brand
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Orders Dropdown */}
        <li>
          <button
            onClick={() => toggleMenu("orders")}
            className={`flex items-center justify-between w-full p-2 rounded ${
              activeMenu === "orders" ? "bg-secondary text-primary" : "text-secondary bg-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="pi pi-shopping-cart text-lg"></i>
              <span>Orders</span>
            </div>
            <i className={`pi ${activeMenu === "orders" ? "pi-chevron-down" : "pi-chevron-right"}`}></i>
          </button>
          {activeMenu === "orders" && (
            <ul className="pl-8 mt-2 space-y-1">
              <li>
                <Link to="/orders" className="block p-2 text-gray-400 hover:text-secondary">
                  - All Orders
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Clients Dropdown */}
        <li>
          <button
            onClick={() => toggleMenu("clients")}
            className={`flex items-center justify-between w-full p-2 rounded ${
              activeMenu === "clients" ? "bg-secondary text-primary" : "text-secondary bg-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="pi pi-users text-lg"></i>
              <span>Clients</span>
            </div>
            <i className={`pi ${activeMenu === "clients" ? "pi-chevron-down" : "pi-chevron-right"}`}></i>
          </button>
          {activeMenu === "clients" && (
            <ul className="pl-8 mt-2 space-y-1">
              <li>
                <Link to="/clients" className="block p-2 text-gray-400 hover:text-secondary">
                  - All Clients
                </Link>
              </li>
              <li>
                <Link to="/clients/add" className={`block p-2 ${activeMenu === "clients/add" ? " text-secondary" : "text-gray-400"} hover:text-secondary`}>
                  - Add New Client
                </Link>
              </li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
}

export default CustomSidebar;
