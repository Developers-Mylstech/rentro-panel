import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="flex bg-white text-black dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />

      <div className="flex-1 lg:ml-[17%]">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Layout;
