import { Outlet, useNavigate } from "react-router-dom";
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
  return (
    <div className="flex h-[4000px]">
      <div className="fixed shadow-[4px_0px_10px_rgba(0,0,0,0.1)] w-[300px] h-[100vh] p-[20px] s">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-[150px] rounded-lg" />
        </div>
        <div className=" mt-[30px] flex flex-col gap-[10px] cursor-pointer">
          <div className="flex items-center gap-[10px] bg-violet-300 px-[2px] py-[8px] rounded-md">
            <AiOutlineDashboard className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("")}>
              Trang tổng quan
            </span>
          </div>
          <div className="flex items-center gap-[10px]  px-[2px] py-[8px] rounded-md">
            <RiProductHuntLine className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("products")}>
              Quản lý sản phẩm
            </span>
          </div>
          <div className="flex items-center gap-[10px]  px-[2px] py-[8px] rounded-md">
            <HiOutlineShoppingCart className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("orders")}>
              Quản lý đơn hàng
            </span>
          </div>
          <div className="flex items-center gap-[10px]  px-[2px] py-[8px] rounded-md">
            <PiNewspaperClippingBold className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("news")}>
              Quản lý bài viết
            </span>
          </div>
          <div className="flex items-center gap-[10px]  px-[2px] py-[8px] rounded-md">
            <PiUserCircle className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("user")}>
              Quản lý người dùng
            </span>
          </div>
          <div className="flex items-center gap-[10px]  px-[2px] py-[8px] rounded-md">
            <FaRegStar className="text-[30px]" />
            <span className="text-[20px]" onClick={() => navigate("reviews")}>
              Quản lý bình luận
            </span>
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
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefaultAdmin;
