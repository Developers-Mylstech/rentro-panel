import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function CustomSidebar({ isDarkMode }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const generalMenus = [
    { name: "products", icon: "pi pi-box" },
    { name: "categories", icon: "pi pi-tags" },
    { name: "brands", icon: "pi pi-bookmark" },
    { name: "orders", icon: "pi pi-shopping-cart" },
    { name: "clients", icon: "pi pi-users" },
  ];

  const websiteMenus = [
    { name: "banner", icon: "pi pi-image" },
    { name: "rent", icon: "pi pi-money-bill" },
    { name: "sale", icon: "pi pi-gift" },
    { name: "service", icon: "pi pi-cog" },
    { name: "about", icon: "pi pi-info-circle" },
    { name: "career", icon: "pi pi-briefcase" },
  ];

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-5 left-4 z-40 text-gray-700 dark:text-gray-100 text-3xl rounded-full lg:hidden ${
          isSidebarOpen ? "hidden" : ""
        }`}
        style={{ transition: "all 0.3s ease" }}
      >
        <i className="pi pi-align-left"></i>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          style={{ transition: "opacity 0.3s ease" }}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full overflow-y-auto pl-2 z-50 w-64 
          bg-white dark:bg-gray-800 dark:text-gray-100 shadow-xl
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64`}
        style={{ 
          transition: "transform 0.3s ease, background-color 0.3s ease",
          scrollbarWidth: "thin",
          scrollbarColor: "#3B82F6 #F3F4F6"
        }}
      >
        <div 
          className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
          style={{ transition: "border-color 0.3s ease" }}
        >
          <img 
            src="https://demo.rentro.ae/assets/renroLogo-p3-PWqCh.png" 
            alt="Logo" 
            className="w-24 h-auto" 
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl lg:hidden"
            style={{ transition: "color 0.2s ease" }}
          >
            <i className="pi pi-times"></i>
          </button>
        </div>

        <div 
          className="p-4 overflow-y-auto h-[calc(100vh-80px)]"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="mb-8">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === "/"
                  ? "bg-blue-600 text-white dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              style={{ transition: "all 0.2s ease" }}
            >
              <i className="pi pi-home text-lg"></i>
              <span className="text-lg font-medium">Dashboard</span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="px-3 mb-4">
              <h6 className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                General
              </h6>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Dashboard Options
              </p>
            </div>

            <ul className="space-y-1">
              {generalMenus.map((menu) => {
                const isActive = location.pathname.includes(menu.name);
                return (
                  <li key={menu.name}>
                    <button
                      onClick={() => toggleMenu(menu.name)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg ${
                        activeMenu === menu.name || isActive
                          ? "bg-blue-600 text-white dark:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${menu.icon} text-lg`}></i>
                        <span className="font-medium">
                          {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                        </span>
                      </div>
                      <i
                        className={`pi ${
                          activeMenu === menu.name ? "pi-chevron-down" : "pi-chevron-right"
                        }`}
                        style={{ transition: "transform 0.2s ease" }}
                      ></i>
                    </button>

                    {activeMenu === menu.name && (
                      <ul 
                        className="pl-5 mt-1 space-y-1"
                        style={{ 
                          animation: "fadeIn 0.2s ease-out forwards",
                          opacity: 0,
                          transform: "translateY(-10px)"
                        }}
                      >
                        <li>
                          <Link
                            to={`/${menu.name}`}
                            onClick={handleLinkClick}
                            className={`block p-2 text-sm rounded ${
                              location.pathname === `/${menu.name}`
                                ? "text-blue-600  font-medium dark:text-blue-400"
                                : "text-gray-600 text-sm hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            }`}
                            style={{ transition: "color 0.2s ease" }}
                          >
                            All {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${menu.name}/${menu.name === "orders" ? "quotation" : "add"}`}
                            onClick={handleLinkClick}
                            className={`block p-2 text-sm rounded ${
                              location.pathname === `/${menu.name}/add` ||
                              location.pathname === `/${menu.name}/quotation`
                                ? "text-secondary font-medium dark:text-blue-400"
                                : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            }`}
                            style={{ transition: "color 0.2s ease" }}
                          >
                            {menu.name === "orders" 
                              ? "Quotation List" 
                              : `Add New ${menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}`}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-8">
            <div className="px-3 mb-4">
              <h6 className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                Website
              </h6>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Pages Options
              </p>
            </div>

            <ul className="space-y-1">
              {websiteMenus.map((menu) => {
                const isActive = location.pathname.includes(menu.name);
                return (
                  <li key={menu.name}>
                    <button
                      onClick={() => toggleMenu(menu.name)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg ${
                        activeMenu === menu.name || isActive
                          ? "bg-blue-600 text-white dark:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${menu.icon} text-lg`}></i>
                        <span className="font-medium">
                          {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                        </span>
                      </div>
                      <i
                        className={`pi ${
                          activeMenu === menu.name ? "pi-chevron-down" : "pi-chevron-right"
                        }`}
                        style={{ transition: "transform 0.2s ease" }}
                      ></i>
                    </button>

                    {activeMenu === menu.name && (
                      <ul 
                        className="pl-12 mt-1 space-y-1"
                        style={{ 
                          animation: "fadeIn 0.2s ease-out forwards",
                          opacity: 0,
                          transform: "translateY(-10px)"
                        }}
                      >
                        <li>
                          <Link
                            to={`/${menu.name}`}
                            onClick={handleLinkClick}
                            className={`block p-2 rounded ${
                              location.pathname === `/${menu.name}`
                                ? "text-blue-600 font-medium dark:text-blue-400"
                                : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            }`}
                            style={{ transition: "color 0.2s ease" }}
                          >
                            All {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${menu.name}/add`}
                            onClick={handleLinkClick}
                            className={`block p-2 rounded ${
                              location.pathname === `/${menu.name}/add`
                                ? "text-blue-600 font-medium dark:text-blue-400"
                                : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            }`}
                            style={{ transition: "color 0.2s ease" }}
                          >
                            Add New {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default CustomSidebar;