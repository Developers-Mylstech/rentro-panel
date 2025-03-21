

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css"

function CustomSidebar() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
       
        className={`fixed top-4 left-4 z-[51] text-secondary bg-primary text-lg rounded-full lg:hidden ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <i className="pi pi-align-left"></i>
      </button>

      {/* Sidebar */}
      <div
       
        className={`fixed top-0 left-0 h-[100%] bg-secondary  p-5 overflow-y-auto z-[55] w-[70%]  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-1/6 lg:block`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-primary text-xl lg:hidden"
          >
            <i className="pi pi-times text-primary"></i>
          </button>
        </div>

        {/* General Section */}
        <ul className="space-y-10 mt-10">
          <li className="pb-2 px-2 border-b">
            <h6 className="text-primary">General</h6>
            <p className="text text-sm text-white/50">Dashboard Options</p>
          </li>

          {/* Dashboard Link */}
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 p-2 w-[100%] rounded-xl py-4 pl-4 ${
                location.pathname === "/"
                  ? "bg-[#f8f8f8] text-secondary"
                  : "text-secondary bg-white/100 "
              }`}
            >
              <i className="pi pi-home text-lg font-semibold"></i>
              <span className="text-lg font-semibold">Dashboard</span>
            
             
            </Link>
          </li>

          {/* Dynamic Menu Items */}
          {[
            { name: "products", icon: "pi pi-box" },
            { name: "categories", icon: "pi pi-tags" },
            { name: "brands", icon: "pi pi-bookmark" },
            { name: "orders", icon: "pi pi-shopping-cart" },
            { name: "clients", icon: "pi pi-users" },
          ].map((menu) => {
            const isActive = location.pathname.includes(menu.name);
            return (
              <li   className={`w-[110%] block relative  duration-[200ms] my-10 ${
                activeMenu  === menu.name ? "open" : ""
              }` }key={menu.name}>
                 <div className="right-container duration-[200ms]"></div>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className={`flex items-center justify-between w-full p-2 rounded-l-full py-4 ${
                    activeMenu === menu.name || isActive
                      ? "bg-primary text-secondary"
                      : "text-primary bg-secondary hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${menu.icon} text-lg `}></i>
                    <span>
                      {menu.name.charAt(0).toUpperCase() +
                        menu.name.slice(1)}
                    </span>
                  </div>
                  <i
                    className={`pi z-20 ${
                      activeMenu === menu.name
                        ? "pi-chevron-down"
                        : "pi-chevron-right"
                    }`}
                  ></i>
                </button>

                {activeMenu === menu.name && (
                  <ul className="pl-8 mt-2 space-y-1">
                    <li>
                      <Link
                        to={`/${menu.name}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`block p-2 rounded ${
                          location.pathname === `/${menu.name}`
                            ? "text-primary font-semibold"
                            : "text-white/50 hover:text-primary"
                        }`}
                      >
                        - All{" "}
                        {menu.name.charAt(0).toUpperCase() +
                          menu.name.slice(1)}
                      </Link>
                    </li>
                    {menu.name !== "orders" && (
                      <li>
                        <Link
                          to={`/${menu.name}/add`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block p-2 rounded ${
                            location.pathname === `/${menu.name}/add`
                              ? "text-primary font-semibold"
                              : "text-white/50 hover:text-primary"
                          }`}
                        >
                          - Add New{" "}
                          {menu.name.charAt(0).toUpperCase() +
                            menu.name.slice(1)}
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Website Section */}
        <ul className="space-y-5 mt-10">
          <li className="pb-2 px-2 border-b">
            <h6 className="text-primary">Website</h6>
            <p className="text text-white/50 text-sm">Pages Options</p>
          </li>

          {/* Dynamic Website Links */}
          {[
            { name: "banner", icon: "pi pi-home" },
            { name: "rent", icon: "pi pi-shopping-cart" },
            { name: "sale", icon: "pi pi-gift" },
            { name: "service", icon: "pi pi-cog" },
            { name: "about", icon: "pi pi-user-edit" },
          ].map((menu) => {
            const isActive = location.pathname.includes(menu.name);
            return (
              <li className={`w-[110%] block relative my-10 ${
                activeMenu === menu.name ? "open" : ""
              }`} key={menu.name}>
                 <div className="right-container"></div>
              
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className={`flex items-center justify-between w-full p-2 rounded-l-full py-4 ${
                    activeMenu === menu.name || isActive
                    ? "bg-primary text-secondary "
                    : "text-primary bg-secondary hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${menu.icon} text-lg`}></i>
                    <span>
                      {menu.name.charAt(0).toUpperCase() +
                        menu.name.slice(1)}
                    </span>
                  </div>
                  <i
                    className={`pi z-20 ${
                      activeMenu === menu.name
                        ? "pi-chevron-down"
                        : "pi-chevron-right"
                    }`}
                  ></i>
                </button>

                {activeMenu === menu.name && (
                  <ul className="pl-8 mt-2 space-y-1">
                    <li>
                      <Link
                        to={`/${menu.name}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`block p-2 rounded ${
                          location.pathname === `/${menu.name}`
                            ? "text-primary font-semibold"
                            : "text-white/50 hover:text-primary"
                        }`}
                      >
                        - All{" "}
                        {menu.name.charAt(0).toUpperCase() +
                          menu.name.slice(1)}
                      </Link>
                    </li>
                    {menu.name !== "orders" && (
                      <li>
                        <Link
                          to={`/${menu.name}/add`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block p-2 rounded ${
                            location.pathname === `/${menu.name}/add`
                              ? "text-primary font-semibold"
                              : "text-white/50 hover:text-primary"
                          }`}
                        >
                          - Add New{" "}
                          {menu.name.charAt(0).toUpperCase() +
                            menu.name.slice(1)}
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CustomSidebar;
