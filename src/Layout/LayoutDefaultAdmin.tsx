import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";

const LayoutDefaultAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "") {
      return location.pathname === "admin";
    }
    return location.pathname.includes(path);
  };
  return (
    <div className="flex pb-[50px]">
      <div className="fixed shadow-[4px_0px_10px_rgba(0,0,0,0.1)] w-[300px] h-[100vh] p-[20px]">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-[150px] rounded-lg" />
        </div>
        <div className="mt-[30px] flex flex-col gap-[10px] cursor-pointer">
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("")}
          >
            <AiOutlineDashboard className="text-[30px]" />
            <span className="text-[18px]">Trang tổng quan</span>
          </div>
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("products") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("products")}
          >
            <RiProductHuntLine className="text-[30px]" />
            <span className="text-[18px]">Quản lý sản phẩm</span>
          </div>
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("orders") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("orders")}
          >
            <HiOutlineShoppingCart className="text-[30px]" />
            <span className="text-[18px]">Quản lý đơn hàng</span>
          </div>
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("news") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("news")}
          >
            <PiNewspaperClippingBold className="text-[30px]" />
            <span className="text-[18px]">Quản lý bài viết</span>
          </div>
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("user") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("user")}
          >
            <PiUserCircle className="text-[30px]" />
            <span className="text-[18px]">Quản lý người dùng</span>
          </div>
          <div
            className={`flex items-center gap-[10px] px-[2px] py-[8px] rounded-md ${
              isActive("reviews") ? "bg-violet-300" : ""
            }`}
            onClick={() => navigate("reviews")}
          >
            <FaRegStar className="text-[30px]" />
            <span className="text-[18px]">Quản lý bình luận</span>
          </div>
        </div>
        <div className="mt-[400px] flex items-center gap-[15px] border border-violet-400 px-[10px] py-[6px] rounded-lg cursor-pointer">
          <img
            src={logo}
            alt=""
            className="w-[40px] h-[40px] object-cover border border-violet-300 rounded-full"
          />
          Bá Trung <FaAngleUp />
        </div>
      </div>
      <div className="ml-[300px]">
        <div className="p-[20px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutDefaultAdmin;
