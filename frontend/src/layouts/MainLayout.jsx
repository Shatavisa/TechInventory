import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
   <div className="flex">
    <Navbar />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
  );
};

export default MainLayout;
