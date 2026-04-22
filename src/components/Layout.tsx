import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
