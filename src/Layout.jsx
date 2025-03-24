import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState();
  return (
    <div className="flex bg-white text-black dark:bg-gray-900 h-[100%] dark:text-gray-100">
    <Sidebar isDarkMode={isDarkMode} />

      <div className="flex-1 lg:ml-[17%]">
        <Header setIsDarkMode={setIsDarkMode} />
        <div className="p-2">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Layout;
