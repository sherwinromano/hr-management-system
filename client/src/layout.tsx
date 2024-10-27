import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-white p-4 h-screen flex">
      <Outlet />
    </div>
  );
};

export default Layout;
