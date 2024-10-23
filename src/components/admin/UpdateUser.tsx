import { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { updateUser } from "../../Services/modules/auth";
interface MyComponentProps {
  item: {
    name: string;
    email: string;
    role: string;
    _id: string;
  };
  fetchApi: () => void;
}
const UpdateUser: React.FC<MyComponentProps> = ({ item, fetchApi }) => {
  const { name, email, role, _id } = item;
  const [nameUp, setNameUp] = useState<string>(name);
  const [emailUp, setEmailUp] = useState<string>(email);
  const [roleUp, setRoleUp] = useState<string>(role);
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      name: nameUp,
      email: emailUp,
      role: roleUp,
    };
    try {
      await updateUser(_id, data);
      const modal = document.getElementById(
        `modal_auth_${_id}`
      ) as HTMLDialogElement;
      modal.close();
      setNameUp(name);
      setNameUp(email);
      setRoleUp(role);
      fetchApi();
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };
  return (
    <span
      className="p-[10px] bg-blue-500 rounded-lg"
      onClick={() => {
        const modal = document.getElementById(
          `modal_auth_${item._id}`
        ) as HTMLDialogElement;
        modal?.showModal();
      }}
    >
      <RiPencilFill className=" text-white text-[25px] " />
      <dialog id={`modal_auth_${item._id}`} className="modal ">
        <div className="modal-box dark:bg-gray-500 ">
          <div className=" py-[10px] ">
            <div className="text-[20px] pb-[20px] text-center font-medium">
              Cập nhật người dùng
            </div>
          </div>
          <form onSubmit={handleUpdate} className="space-y-6 ">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Tên người dùng:
              </label>
              <div className="mt-2">
                <input
                  type="name"
                  name="name"
                  placeholder="Tên người dùng"
                  required
                  value={nameUp}
                  autoComplete="name"
                  onChange={(e) => setNameUp(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                email:
              </label>
              <div className="mt-2">
                <input
                  type="slug"
                  name="slug"
                  placeholder="email"
                  required
                  value={emailUp}
                  autoComplete="slug"
                  onChange={(e) => setEmailUp(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Quyền
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  autoComplete="role-name"
                  value={roleUp}
                  onChange={(e) => setRoleUp(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="admin">Quản trị viên</option>
                  <option value="user">Người dùng</option>
                  <option value="look">Khóa tài khoản</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </span>
  );
};

export default UpdateUser;
