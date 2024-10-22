import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BsCloudSun, BsCloudSunFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logOutFailed, logOutStart, logOutSuccess } from "../redux/authSlice";
import { logoutAuthApi } from "../Services/modules/auth";

const LayoutDefaultAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  console.log(darkMode);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const isActive = (path: string) => {
    if (path === "") {
      return location.pathname === "admin";
    }
    return location.pathname.includes(path);
  };

  const handleLogOut = async (): Promise<void> => {
    dispatch(logOutStart());
    try {
      await logoutAuthApi();
      dispatch(logOutSuccess());
      localStorage.removeItem("token");
      // toast.success("🦄 Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      dispatch(logOutFailed());
    }
  };
  return (
    <div className="flex pb-[50px] dark:bg-gray-700 dark:text-white min-h-[100vh]">
      <div className="fixed shadow-[4px_0px_10px_rgba(0,0,0,0.1)] w-[300px] h-[100vh] p-[20px] dark:bg-gray-800 dark:text-white bg-white">
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

        <div
          className="relative"
          onMouseEnter={() => setShowDiv(true)}
          onMouseLeave={() => setShowDiv(false)}
        >
          <div className="mt-[400px] flex items-center gap-[15px] border border-violet-400 px-[10px] py-[6px] rounded-lg cursor-pointer">
            <img
              src={logo}
              alt=""
              className="w-[40px] h-[40px] object-cover border border-violet-300 rounded-full"
            />
            Bá Trung <FaAngleUp />
          </div>
          {showDiv && (
            <div className="absolute cursor-pointer bottom-[55px] left-0 bg-white w-[258px] ring-1 ring-violet-100 shadow-md rounded-lg dark:bg-gray-700 ">
              <div
                className="px-[20px] py-[10px] border-b border-b-violet-100"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <div className="flex items-center gap-[10px] ">
                    <BsCloudSunFill className="text-[25px]" />
                    Chế độ tối
                  </div>
                ) : (
                  <div className="flex items-center gap-[10px]">
                    <BsCloudSun className="text-[25px]" />
                    Chế độ sáng
                  </div>
                )}
              </div>
              <div className="px-[20px] py-[10px]" onClick={handleLogOut}>
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-[300px] ">
        <div className="p-[20px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutDefaultAdmin;
