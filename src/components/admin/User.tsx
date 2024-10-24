import {  RiSearchLine } from "react-icons/ri";
import { MdOutlineKey } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAllUser } from "../../Services/modules/auth";
import UpdateUser from "./UpdateUser";

const User = () => {
  const [data, setData] = useState<any>("");

  const fetchApi = async () => {
    try {
      const res = await getAllUser();
      setData(res.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  
  return (
    <>
      {" "}
      <div>
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white">
          Quản lý người dùng
        </h1>
        {/* <button className="primary-btn mt-[30px]">Thêm bài viết mới</button> */}

        <div className="mt-[20px] flex justify-between">
          <div className="sm:col-span-3 ">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Show entries
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>
          </div>
          <div className="w-[30%] relative">
            <input
              type="text"
              className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
              placeholder="Tìm kiếm"
            />
            <button
              type="button"
              className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300 bg-violet-200 text-black dark:bg-white  dark:text-black absolute top-0 right-[44px] dark:border-0 ring-1 ring-inset ring-gray-300"
            >
              <RiSearchLine />
            </button>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-[40px]">
        <div className="overflow-x-auto w-[1500px]">
          <table className="table text-[16px]">
            {/* head */}
            <thead>
              <tr className="text-[18px] dark:text-gray-300">
                <th></th>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Quyền</th>
                <th>Trạng thái tài khoản</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: any, index: number) => {
                  return (
                    <tr
                      className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-300 "
                      key={item._id}
                    >
                      <th>{index + 1}</th>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.role === "admin" ? (
                          <>Quản trị viên</>
                        ) : item.role === "user" ? (
                          <>Người dùng</>
                        ) : item.role === "look" ? (
                          <span className="text-red-500">Đã bị khóa</span>
                        ) : null}
                      </td>
                      <td className="">
                        {item.role === "user" || item.role === "admin" ? (
                          <div className="text-green-600 font-semibold">
                            Đang hoạt động
                          </div>
                        ) : item.role === "look" ? (
                          <div className="text-red-500 font-semibold flex items-center gap-[5px]">
                            <MdOutlineKey className=" text-red-500 text-[25px]" />
                            Đã bị khóa
                          </div>
                        ) : null}
                      </td>
                      <td className="flex gap-[10px] items-center">
                        <UpdateUser item={item} fetchApi={fetchApi} />
                      </td>
                    </tr>
                  );
                })}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
      {/* paginaton */}
      <div className="flex items-center justify-center mt-[30px]">
        <div className="join">
          <button className="join-item btn btn-md">1</button>
          <button className="join-item btn btn-md btn-active">2</button>
          <button className="join-item btn btn-md">3</button>
          <button className="join-item btn btn-md">4</button>
        </div>
      </div>
    </>
  );
};

export default User;
