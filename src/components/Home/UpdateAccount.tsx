import { useState } from "react";
import { updateProfile } from "../../Services/modules/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileSuccess } from "../../redux/authSlice";
import { toast } from "react-toastify";

const UpdateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFormValid = name && email && avatar;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      name: name,
      email: email,
    };
    if (avatar) {
      data.avatar = avatar;
    }
    try {
      const res: any = await updateProfile(data);
      dispatch(updateProfileSuccess(res.user));
      toast.success("🦄Cập nhật thông tin thành công!");
      navigate("/info");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="border-b border-b-violet-300 pb-[10px]">
        <h1 className="text-[20px] font-medium dark:text-white">
          Cập nhật thông tin{" "}
        </h1>
        <div className="text-[14px] text-gray-600 dark:text-gray-300">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        onSubmit={handleSubmitUpdateProfile}
        className="space-y-6 mt-[20px]"
      >
        <div className="grid grid-cols-2 gap-[30px]">
          <div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Họ và tên:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Nhập tên mới bạn muốn cập nhật"
                  required
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-[15px]">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Email :
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="border-l border-l-violet-300 border-dashed ">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-center leading-6 text-gray-900 dark:text-white mb-[10px]">
                Ảnh đại diện
              </label>
              <div className="flex flex-col items-center gap-[10px]">
                <img
                  alt="Avatar"
                  className="h-[100px] w-[100px] border border-violet-300 rounded-full"
                  src={`${avatar}`}
                />
                <div className="mt-2 w-[70%] flex justify-center rounded-lg border border-dashed border-gray-900/25 flex-1 dark:border-white">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300 dark:text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 px-[5px] ">
                        <span>Chọn ảnh</span>
                        <input
                          name="avatar"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleAvatarChange} // Lưu ảnh vào state
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
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`primary-btn w-[47%] ${
              !isFormValid ? "opacity-50 cursor-not-allowed bg-violet-300" : ""
            }`}
            disabled={!isFormValid}
          >
            Cập nhật tài khoản
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateAccount;
