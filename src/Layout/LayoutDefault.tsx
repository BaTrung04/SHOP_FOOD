import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const LayoutDefault = () => {
  return (
    <>
      <div className="h-[5000px]">
        <NavBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutDefault;
