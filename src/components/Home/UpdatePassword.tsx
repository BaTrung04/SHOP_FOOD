import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const [password, setPassWord] = useState<string>("");
  const [newPassWord, setNewPassWord] = useState<string>("");
  const [showPass, setShowPass] = useState<Boolean>(false);

  const isFormValid = password && newPassWord;
  return (
    <>
      {" "}
      <div className="border-b border-b-violet-300 pb-[10px]">
        <h1 className="text-[20px] font-medium dark:text-white">
          Cập nhật mật khẩu{" "}
        </h1>
        <div className="text-[14px] text-gray-600 dark:text-gray-300">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <div className="flex justify-center mt-[50px]">
        <form className="space-y-6 mt-[20px] ring-1 ring-violet-300 px-[30px] py-[50px] w-[50%] rounded-lg shadow-lg dark:bg-gray-800">
          <div className="w">
            <div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Mật khẩu mới:
                  </label>
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
              <div className="mt-[15px]">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Nhập lại mật khẩu mới:
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    required
                    value={newPassWord}
                    onChange={(e) => setNewPassWord(e.target.value)}
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
            </div>
          </div>

          <div className="">
            <button
              type="submit"
              className={`primary-btn w-[100%] ${
                !isFormValid
                  ? "opacity-50 cursor-not-allowed bg-violet-300"
                  : ""
              }`}
              disabled={!isFormValid}
            >
              Cập nhật tài khoản
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
