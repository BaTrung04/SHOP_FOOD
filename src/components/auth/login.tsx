import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo1.svg";
import { useState } from "react";
import { ILogin, IUser } from "../Interface/user";
import { loginFailed, loginStart, loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAuthApi } from "../../Services/modules/auth";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassWord] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const user: ILogin = {
      email: email,
      password: password,
    };
    dispatch(loginStart());
    try {
      const res = await loginAuthApi(user);
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
    }
  };
  return (
    <>
      <div className="container ">
        <div className="flex items-center justify-center ">
          <div className="my-[70px] w-[80%] h-auto border border-violet-200 rounded-lg shadow-xl dark:bg-gray-800">
            <div className="lg:flex ">
              <div className="lg:flex-1 lg:m-auto flex items-center justify-center  ">
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
                    <form onSubmit={handleSubmitLogin} className="space-y-6">
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
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
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
                          <div className="text-sm">
                            <a className="font-semibold text-violet-600 hover:text-indigo-500">
                              Quên mật khẩu?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2 relative">
                          <input
                            type={showPass ? "text" : "password"}
                            placeholder="password"
                            required
                            value={password}
                            onChange={(e) => setPassWord(e.target.value)}
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

                      <div>
                        <button type="submit" className="primary-btn w-[100%]">
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                    <div className="mt-[20px] flex items-center justify-center ">
                      <GoogleLogin
                        onSuccess={(credentialResponse: any) => {
                          const decoded = jwtDecode(
                            credentialResponse?.credential
                          );
                          const { name, email, picture, jti }: any = decoded;
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
                              token: credentialResponse.credential,
                              user,
                            })
                          );

                          // Save token in cookie
                          Cookies.set("token", credentialResponse.credential, {
                            expires: 7, // Token expires in 7 days
                            secure: true,
                            sameSite: "strict",
                          });

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
    </>
  );
};

export default Login;
