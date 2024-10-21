import { useState } from "react";
import logo from "../../assets/logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { registerSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAuthApi } from "../../Services/modules/auth";
const Register = () => {
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<any>("");
  const [avatarPreview, setAvatarPreview] = useState<any>(
    "/images/default_avatar.jpg"
  );
  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    };
    const res = await registerAuthApi(data);
    dispatch(registerSuccess(res));
    navigate("/login");
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar") {
      const files = e.target.files; // Lấy danh sách files

      if (files && files.length > 0) {
        // Kiểm tra nếu có files
        const file = files[0]; // Lấy file đầu tiên
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result as string); // Đảm bảo kiểu là string
            setAvatar(file); // Lưu trữ file
          }
        };

        reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      {" "}
      <div className="container ">
        <div className="flex items-center justify-center">
          <div className="mb-[70px] mt-[50px] w-[80%] h-auto border border-violet-200 rounded-lg shadow-xl dark:bg-gray-800">
            <div className="lg:flex ">
              <div className="lg:flex-1 lg:m-auto flex items-center justify-center  ">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                      alt="Your Company"
                      src={logo}
                      className="mx-auto w-[120px] rounded-xl"
                    />
                    <h2 className="mt-[15px] text-center text-2xl font-bold dark:text-white leading-9 tracking-tight text-violet-800">
                      Đăng ký tài khoản
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmitLogin} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Tên của bạn:
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Tên của bạn"
                            required
                            onChange={onChange}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                            tabIndex={1}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Email:
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={onChange}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                            tabIndex={1}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                          >
                            Password:
                          </label>
                        </div>
                        <div className="mt-2 relative">
                          <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            required
                            onChange={onChange}
                            autoComplete="current-password"
                            className="block w-full px-[5px] rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            tabIndex={2}
                          />
                          {showPass ? (
                            <FaRegEye
                              className="absolute right-[10px] top-[10px]"
                              onClick={() => setShowPass(false)}
                            />
                          ) : (
                            <FaRegEyeSlash
                              className="absolute right-[10px] top-[10px]"
                              onClick={() => setShowPass(true)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                          Ảnh đại diện
                        </label>
                        <div className="flex justify-between items-center gap-[10px]">
                          <img
                            src={avatarPreview}
                            alt=""
                            className=" h-[100px] w-[100px] border border-violet-300 rounded-full"
                          />
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 flex-1 dark:border-white">
                            <div className="text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-300 dark:text-white"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 px-[5px] ">
                                  <span>Chọn ảnh</span>
                                  <input
                                    name="avatar"
                                    type="file"
                                    className="sr-only"
                                    accept="iamges/*"
                                    onChange={onChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs leading-5 text-gray-600 dark:text-white">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="primary-btn w-[100%]">
                          Đăng ký
                        </button>
                      </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
                      Đăng nhập ngay?{" "}
                      <a
                        className="font-semibold leading-6 text-violet-600 hover:text-indigo-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                      >
                        Đăng Nhập
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
