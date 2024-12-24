import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo1.svg";
import chef from "../../assets/dau-bep.svg";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginFailed, loginStart, loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAuthApi } from "../../Services/modules/auth";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../Interface/user";

interface IFormInput {
  email: string;
  password: string;
}

const LoginAdmin = () => {
  const [showPass, setShowPass] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(loginStart());
    try {
      const res = await loginAuthApi(data);
      dispatch(loginSuccess(res));
      localStorage.setItem("token", res.token);
      if (res.user.role === "admin") {
        navigate("/admin");
        toast.success("🦄 Đăng nhập Admin thành công!");
      } else {
        navigate("/");
        toast.success("🦄 Đăng nhập thành công!");
      }
    } catch (err) {
      dispatch(loginFailed());
      toast.error("🦄 Tài khoản mật khẩu Admin không đúng!");
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:flex-1 hidden lg:block">
        <img src={chef} alt="" className="h-[100vh] object-cover" />
      </div>
      <div className="lg:flex-1 lg:m-auto flex items-center justify-center h-[100vh]">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={logo} className="mx-auto w-[120px]" />
            <h2 className="mt-[15px] text-center text-2xl font-bold leading-9 tracking-tight text-violet-800">
              Đăng nhập ADMIN
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address:
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    className="block w-full px-[5px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password", {
                      required: "Password không được để trống",
                      minLength: {
                        value: 6,
                        message: "Password phải có ít nhất 6 kí tự",
                      },
                    })}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="mt-[20px] flex items-center justify-center ">
              <GoogleLogin
                onSuccess={async (credentialResponse: any) => {
                  const decoded = jwtDecode(credentialResponse?.credential);
                  const { name, email, picture, jti }: any = decoded;
                  const res = await loginAuthApi({
                    email: "trungmkzxc12345@gmail.com",
                    password: "123456",
                  });
                  const user: IUser = {
                    avatar: {
                      public_id: "",
                      url: picture,
                    },
                    role:
                      email === "trungmkzxc12345@gmail.com" ? "admin" : "user",
                    _id: jti,
                    name,
                    email,
                    password: "",
                  };

                  dispatch(
                    loginSuccess({
                      token: res.token,
                      user,
                    })
                  );
                  if (user.role === "admin") {
                    navigate("/admin/categories");
                    toast.success("🦄 Đăng nhập Admin thành công!");
                  } else {
                    navigate("/");
                    toast.success("🦄 Đăng nhập thành công!");
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("🦄 Tài khoản mật khẩu Admin không đúng!");
                }}
              />
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Bạn không có quyền truy cập? Vui lòng:{" "}
              <a
                className="font-semibold leading-6 text-violet-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Quay lại
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
