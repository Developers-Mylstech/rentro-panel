

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css"

function CustomSidebar({ isDarkMode }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  useEffect(() => {
    // const darkMode = window.localStorage.getItem('theme');
    if (isDarkMode == true) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

  }, [isDarkMode]);



  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}

        className={`fixed top-5 left-4 z-[51] text-secondary  dark:text-gray-100 text-3xl rounded-full lg:hidden ${isSidebarOpen ? "hidden" : ""
          }`}
      >
        <i className="pi pi-align-left"></i>
      </button>

      <div
        className={`fixed top-0 left-0 h-full overflow-y-auto  pl-2 z-50 w-[70%] 
    bg-secondary dark:bg-gray-800 dark:text-gray-100
    transition-transform duration-1000 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:w-1/6 lg:block`}
      >


        <div className="flex justify-between">
          <img src="https://demo.rentro.ae/assets/renroLogo-p3-PWqCh.png" alt="" className="w-24" />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-primary text-xl lg:hidden"
          >
            <i className="pi pi-times text-primary"></i>
          </button>
        </div>

        <ul className="space-y-10 mt-10">
          <li className="pb-2 px-2 border-b">
            <h6 className="text-primary">General</h6>
            <p className="text text-sm text-white/50 ">Dashboard Options</p>
          </li>

          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 p-2 mx-auto w-[95%] h-auto rounded-xl py-4 pl-4 transition-all
      ${location.pathname === "/"
                  ? "bg-[#f8f8f8] text-secondary  "
                  : "text-secondary bg-white  "}`
              }
            >
              <i className="pi pi-home text-lg font-semibold dark:text-gray-800"></i>
              <span className="text-lg font-semibold dark:text-gray-800">Dashboard</span>
            </Link>
          </li>


          {[
            { name: "products", icon: "pi pi-box" },
            { name: "categories", icon: "pi pi-tags" },
            { name: "brands", icon: "pi pi-bookmark" },
            { name: "orders", icon: "pi pi-shopping-cart" },
            { name: "clients", icon: "pi pi-users" },
          ].map((menu) => {
            const isActive = location.pathname.includes(menu.name);
            return (
              <li className={`w-[100%] block relative  duration-[200ms] my-10  ${activeMenu === menu.name ? "open" : ""
                }`} key={menu.name}>
                <div className={isDark == true ? "right-container" : "right-container"}></div>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className={`flex items-center justify-between w-full p-2 dark:hover:bg-gray-900  rounded-l-full py-4 ${activeMenu === menu.name || isActive
                    ? "bg-primary text-secondary dark:bg-gray-900 "
                    : "text-primary  bg-secondary   hover:bg-primary hover:text-secondary dark:bg-gray-800"
                    }`}
                >
                  <div className="flex items-center gap-3  dark:text-gray-100">
                    <i className={`${menu.icon} text-lg `}></i>
                    <span>
                      {menu.name.charAt(0).toUpperCase() +
                        menu.name.slice(1)}
                    </span>
                  </div>
                  <i
                    className={`pi z-20 dark:text-gray-100 ${activeMenu === menu.name
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
                        className={`block p-2 rounded ${location.pathname === `/${menu.name}`
                          ? "text-primary font-semibold"
                          : "text-white/50 hover:text-primary"
                          }`}
                      >
                        - All{" "}
                        {menu.name.charAt(0).toUpperCase() +
                          menu.name.slice(1)}
                      </Link>
                    </li>
                    {menu.name && (
                      <li>
                        <Link
                          to={`/${menu.name}/${menu.name === "orders" ? "quotation" : "add"}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block p-2 rounded ${location.pathname === `/${menu.name}/add` ||
                            location.pathname === `/${menu.name}/quotation`
                            ? "text-primary font-semibold"
                            : "text-white/50 hover:text-primary"
                            }`}
                        >
                          - {menu.name === "orders" ? "Quotation List" : `Add New ${menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}`}
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="space-y-5 mt-10">
          <li className="pb-2 px-2 border-b">
            <h6 className="text-primary">Website</h6>
            <p className="text text-white/50 text-sm">Pages Options</p>
          </li>

          {[
            { name: "banner", icon: "pi pi-home" },
            { name: "rent", icon: "pi pi-shopping-cart" },
            { name: "sale", icon: "pi pi-gift" },
            { name: "service", icon: "pi pi-cog" },
            { name: "about", icon: "pi pi-user-edit" },
            { name: "career", icon: "pi pi-user" },
      

          ].map((menu) => {
            const isActive = location.pathname.includes(menu.name);
            return (
              <li className={`w-[100%]  block relative my-10 ${activeMenu === menu.name ? "open" : ""
                }`} key={menu.name}>
                <div className="right-container"></div>

                <button
                  onClick={() => toggleMenu(menu.name)}
                  className={`flex items-center justify-between w-full p-2 dark:hover:bg-gray-900  rounded-l-full py-4 ${activeMenu === menu.name || isActive
                    ? "bg-primary text-secondary dark:bg-gray-900 "
                    : "text-primary bg-secondary hover:bg-primary hover:text-secondary dark:bg-gray-800"
                    }`}
                >
                  <div className="flex items-center gap-3 dark:text-gray-100">
                    <i className={`${menu.icon} text-lg`}></i>
                    <span>
                      {menu.name.charAt(0).toUpperCase() +
                        menu.name.slice(1)}
                    </span>
                  </div>
                  <i
                    className={`pi z-20 dark:text-gray-100 ${activeMenu === menu.name
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
                        className={`block p-2 rounded ${location.pathname === `/${menu.name}`
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
                          className={`block p-2 rounded ${location.pathname === `/${menu.name}/add`
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
