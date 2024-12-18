import { useEffect, useState } from "react";
import { BsCloudSun } from "react-icons/bs";
import { BsCloudSunFill } from "react-icons/bs";
import logo from "../../assets/logo1.svg";
import { FaAngleDown } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ICategory } from "../Interface/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
} from "../../redux/authSlice";
import { getCategories, logoutAuthApi } from "../../Services/modules/auth";
import { toast } from "react-toastify";
import ShowCart from "../cart/ShowCart";
const NavBar = () => {
  const [showProFile, setShowProFile] = useState<boolean>(false);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.auth.login.isLogin);
  const user: any = useSelector(
    (state: RootState) => state.auth.login.currentUser?.user
  );
  const isRole = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user?.role
  );

  useEffect(() => {
    const fetchApiCategory = async () => {
      try {
        const res = await getCategories(1, 10, "");
        setCategory(res.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiCategory();
  }, []);

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

  const handleLogOut = async (): Promise<void> => {
    dispatch(logOutStart());
    try {
      await logoutAuthApi();
      dispatch(logOutSuccess());
      localStorage.removeItem("token");
      toast.success("🦄 Đăng xuất thành công!");
      navigate("/");
    } catch (err) {
      dispatch(logOutFailed());
    }
  };
  const handleSearch = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    navigate("/categories/search", { state: { keyword } });
    setKeyword("");
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 block lg:flex items-center justify-center ">
        <div className="container px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between gap-[10px] sm:gap-0">
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                  className="lg:h-12 w-auto h-6 text-black rounded-xl cursor-pointer"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              {/* navbar  */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to="/introduce"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white "
                    }
                    aria-current="page"
                  >
                    Giới thiệu
                  </NavLink>
                  <div className="relative group">
                    {/* Nút danh mục */}
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `flex items-center rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold cursor-pointer ${
                          isActive
                            ? "text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                            : "text-black dark:text-white"
                        }`
                      }
                    >
                      <span>Danh mục</span>
                      <FaAngleDown className="ml-2" />
                    </NavLink>

                    {/* Dropdown hiển thị khi hover */}
                    <div className="absolute left-0 mt-0.5 hidden w-48 rounded-md bg-white shadow-lg dark:bg-gray-800 group-hover:block z-10">
                      <ul className="xl:px-3 xl:py-2">
                        {category &&
                          category.map((item) => (
                            <li
                              className="xl:px-3 xl:py-2 hover:bg-violet-300 dark:hover:bg-gray-400 cursor-pointer dark:text-white "
                              key={item._id}
                              onClick={() =>
                                navigate(`categories/${item.slug}/${item._id}`)
                              }
                            >
                              {item.categoryName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <NavLink
                    to="/news"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white"
                    }
                  >
                    Tin tức
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                        : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white"
                    }
                  >
                    Liên hệ
                  </NavLink>
                </div>
              </div>
            </div>
            {/* search */}
            <div className="xl:w-[30%] relative lg:block hidden">
              <div className="relative">
                <input
                  type="text"
                  className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
                  placeholder="Nhập món ăn"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  onClick={(e) => handleSearch(e)}
                  className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300 bg-violet-200 text-black dark:bg-white  dark:text-black absolute top-0  2xl:right-[44px] xl:right-[30px]  dark:border-0 ring-1 ring-inset ring-gray-300"
                >
                  {darkMode ? <RiSearchFill /> : <RiSearchLine />}
                </button>
              </div>
            </div>

            {/* dark */}
            <button
              onClick={toggleDarkMode}
              className="p-[11px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300  bg-violet-200 text-black dark:bg-white  dark:text-black"
            >
              {darkMode ? (
                <BsCloudSunFill className="2xl:text-[25px] xl:text-[20px]" />
              ) : (
                <BsCloudSun className="2xl:text-[25px] xl:text-[20px]" />
              )}
            </button>

            {/* Giỏ hàng */}
            <ShowCart darkMode={darkMode} />

            {!isLogin ? (
              <button
                className="primary-btn font-bold ml-[10px] sm:block hidden"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            ) : (
              <div
                className="relative ml-3 cursor-pointer"
                onMouseEnter={() => setShowProFile(true)}
                onMouseLeave={() => setShowProFile(false)}
              >
                <div className="flex relative  items-center gap-[10px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="h-[45px] w-[45px] rounded-full ml-[10px]"
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                  />
                  <div className="text-black dark:text-white font-bold text-[18px]">
                    {user.name}
                  </div>
                </div>

                {showProFile && (
                  <div
                    className="absolute left-0 z-10 dark:bg-gray-700  w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    {isRole === "admin" && (
                      <Link
                        to={"/admin"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-300 cursor-pointer dark:text-white"
                        role="menuitem"
                        id="user-menu-item-0"
                        onClick={() => setShowProFile(false)}
                      >
                        Trang quản trị
                      </Link>
                    )}

                    <Link
                      to={"/info"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-300 cursor-pointer dark:text-white"
                      role="menuitem"
                      id="user-menu-item-1"
                      onClick={() => setShowProFile(false)}
                    >
                      Thông tin cá nhân
                    </Link>

                    <Link
                      to={"/wishlist"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-300 cursor-pointer dark:text-white"
                      role="menuitem"
                      id="user-menu-item-1"
                      onClick={() => setShowProFile(false)}
                    >
                      Sản phẩm yêu thích
                    </Link>
                    {isRole === "user" && ( 
                      <Link
                        to={"/history-order"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-300 cursor-pointer dark:text-white"
                        role="menuitem"
                        id="user-menu-item-1"
                        onClick={() => setShowProFile(false)}
                      >
                        Lịch sử mua hàng
                      </Link>
                    )}

                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-300 cursor-pointer dark:text-white"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={() => {
                        handleLogOut();
                        setShowProFile(false);
                      }}
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
              <NavLink
                to="/introduce"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                    : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white "
                }
                aria-current="page"
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `flex items-center rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold cursor-pointer ${
                    isActive
                      ? "text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                      : "text-black dark:text-white"
                  }`
                }
              >
                <span>Danh mục</span>
                <FaAngleDown className="ml-2" />
              </NavLink>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                    : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white"
                }
              >
                Tin tức
              </NavLink>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </a>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-violet-500 dark:text-violet-300 ring-2 ring-violet-300"
                    : "rounded-md xl:px-3 xl:py-2 xl:text-lg font-bold text-black dark:text-white"
                }
              >
                Liên hệ
              </NavLink>
            </div>
            <div className="flex space-x-4">
              <div className="relative group">
                {/* Nút danh mục */}

                {/* Dropdown hiển thị khi hover */}
                <div className="absolute left-0 mt-0.5 hidden w-48 rounded-md bg-white shadow-lg dark:bg-gray-800 group-hover:block z-10">
                  <ul className="xl:px-3 xl:py-2">
                    {category &&
                      category.map((item) => (
                        <li
                          className="xl:px-3 xl:py-2 hover:bg-violet-300 dark:hover:bg-gray-400 cursor-pointer dark:text-white "
                          key={item._id}
                          onClick={() =>
                            navigate(`categories/${item.slug}/${item._id}`)
                          }
                        >
                          {item.categoryName}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
