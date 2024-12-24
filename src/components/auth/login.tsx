import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo1.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFailed, loginStart, loginSuccess } from "../../redux/authSlice";
import { loginAuthApi } from "../../Services/modules/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../Interface/user";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [showPass, setShowPass] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    dispatch(loginStart());
    try {
      const res = await loginAuthApi(data);
      dispatch(loginSuccess(res));

      Cookies.set("token", res.token, {
        expires: 7, // Token expires in 7 days
        secure: true,
        sameSite: "strict",
      });

      toast.success("🦄 Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
      toast.error("🦄 Tài khoản mật khẩu không chính xác!");
    }
  };

  return (
    <div className="container ">
      <div className="flex items-center justify-center ">
        <div className="my-[70px] sm:w-[80%] w-full h-auto sm:border border-violet-200 rounded-lg sm:shadow-xl dark:bg-gray-800">
          <div className="lg:flex ">
            <div className="lg:flex-1 lg:m-auto flex items-center justify-center">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="mx-auto w-[120px] rounded-xl"
                  />
                  <h2 className="mt-[15px] text-center text-2xl font-bold leading-9 dark:text-white tracking-tight text-violet-800">
                    Đăng nhập
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Email address:
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          {...register("email", {
                            required: "Vui lòng nhập email",
                            pattern: {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Email không hợp lệ",
                            },
                          })}
                          placeholder="Email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Password:
                      </label>
                      <div className="mt-2 relative">
                        <input
                          type={showPass ? "text" : "password"}
                          {...register("password", {
                            required: "Vui lòng nhập mật khẩu",
                            minLength: {
                              value: 6,
                              message: "Mật khẩu phải có ít nhất 6 ký tự",
                            },
                          })}
                          placeholder="Password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
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
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="primary-btn w-[100%]">
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                  <div className="mt-[20px] flex items-center justify-center ">
                    <GoogleLogin
                      onSuccess={async (credentialResponse: any) => {
                        const decoded = jwtDecode(
                          credentialResponse?.credential
                        );
                        const { name, email, picture, jti }: any = decoded;
                        const res = await loginAuthApi({
                          email: "khanhshopfood@gmail.com",
                          password: "123456",
                        });
                        const user: IUser = {
                          avatar: {
                            public_id: "",
                            url: picture,
                          },
                          role:
                            email === "trungmkzxc12345@gmail.com"
                              ? "admin"
                              : "user",
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

                        navigate("/");
                        toast.success("🦄 Đăng nhập thành công!");
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                  <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
                    Bạn cần tạo tài khoản?{" "}
                    <Link
                      to={"/register"}
                      className="font-semibold leading-6 text-violet-600 hover:text-indigo-500"
                    >
                      Đăng ký
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
