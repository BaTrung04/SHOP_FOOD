import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const LayoutDefault = () => {
  return (
    <>
      <div className="h-auto">
        <NavBar />
        <div className="dark:bg-gray-700">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutDefault;
