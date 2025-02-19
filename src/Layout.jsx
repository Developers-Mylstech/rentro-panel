import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function Layout() {
  return (
    <div className="flex">
      {/* Sidebar (Fixed) */}
      <Sidebar  />

      {/* Main Content (Push Content Right) */}
      <div className="flex-1 ml-64">
        {/* Sticky Header */}
        <Header />

        {/* Page Content (Prevent Overlapping with Header) */}
        <div className="p-4 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
