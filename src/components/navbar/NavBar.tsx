import { useEffect, useState } from "react";
import { BsCloudSun } from "react-icons/bs";
import { BsCloudSunFill } from "react-icons/bs";
import { RiShoppingBagLine } from "react-icons/ri";
import { RiShoppingBagFill } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { FaAngleDown } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { categories } from "../Interface/product";
const NavBar = () => {
  const [showProFile, setShowProFile] = useState<boolean>(false);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
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
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-white  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setShowNavBar(!showNavBar)}
              >
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* home */}
              <div
                className="flex flex-shrink-0 items-center"
                onClick={() => navigate("/")}
              >
                <img
                  className="h-8 w-auto text-black rounded-xl cursor-pointer"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to="/introduce"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md px-3 py-2 text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md px-3 py-2 text-lg font-bold text-black dark:text-white "
                    }
                    aria-current="page"
                  >
                    Giới thiệu
                  </NavLink>
                  <div className="relative group">
                    {/* Nút danh mục */}
                    <div className="flex items-center rounded-md px-3 py-2 text-lg font-bold text-black dark:text-white cursor-pointer">
                      <span>Danh mục</span>
                      <FaAngleDown className="ml-2" />
                    </div>

                    {/* Dropdown hiển thị khi hover */}
                    <div className="absolute left-0 mt-0.5 hidden w-48 rounded-md bg-white shadow-lg dark:bg-gray-800 group-hover:block z-10">
                      <ul className="py-2">
                        {categories &&
                          categories.map((item) => {
                            return (
                              <>
                                <li
                                  className="px-4 py-2 hover:bg-violet-300 dark:hover:bg-gray-400 cursor-pointer dark:text-white "
                                  key={item.id}
                                >
                                  {item.name}
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  <NavLink
                    to="/news"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md px-3 py-2 text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md px-3 py-2 text-lg font-bold text-black dark:text-white"
                    }
                  >
                    Tin tức
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md px-3 py-2 text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md px-3 py-2 text-lg font-bold text-black dark:text-white"
                    }
                  >
                    Liên hệ
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="w-[30%] relative">
              <input
                type="text"
                className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
                placeholder="Nhập món ăn"
              />
              <button
                type="button"
                className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300 bg-violet-200 text-black dark:bg-white  dark:text-black absolute top-0 right-[44px] dark:border-0 ring-1 ring-inset ring-gray-300"
              >
                {darkMode ? <RiSearchFill /> : <RiSearchLine />}
              </button>
            </div>

            {/* dark */}
            <button
              onClick={toggleDarkMode}
              className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300  bg-violet-200 text-black dark:bg-white  dark:text-black"
            >
              {darkMode ? <BsCloudSunFill /> : <BsCloudSun />}
            </button>

            {/* Giỏ hàng */}
            <div className="absolute inset-y-0 right-0 flex items-center gap-[10px] pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300  bg-violet-200 text-black dark:bg-white  dark:text-black"
              >
                {darkMode ? <RiShoppingBagFill /> : <RiShoppingBagLine />}
              </button>
            </div>
            {isLogin ? (
              <button
                className="primary-btn font-bold ml-[10px]"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            ) : (
              <div className="relative ml-3 ">
                <div
                  className="flex relative  items-center gap-[10px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setShowProFile(!showProFile)}
                >
                  <button
                    type="button"
                    className="  bg-violet-200 dark:bg-white rounded-full "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img className="h-8 w-8 rounded-full" src={logo} alt="" />
                  </button>
                  <div className="text-black dark:text-white font-bold">
                    Bá trung
                  </div>
                </div>

                {showProFile && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <a
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Trang quản trị
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-1"
                    >
                      Thông tin cá nhân
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-1"
                    >
                      Thông tin cá nhân
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-2"
                    >
                      Đăng xuất
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {showNavBar && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Team
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Projects
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;