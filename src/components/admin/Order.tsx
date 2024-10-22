import { FaRegTrashCan } from "react-icons/fa6";
import { RiPencilFill, RiSearchLine } from "react-icons/ri";

const Order = () => {
  return (
    <>
      {" "}
      <div>
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white">
          Quản lý đơn hàng
        </h1>
        {/* <button className="primary-btn mt-[30px]">Thêm sản phẩm mới</button> */}

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
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng còn lại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover:bg-violet-100 cursor-pointer">
                <th>1</th>
                <td>671222f5ee39e946b821f23e</td>
                <td>1</td>
                <td>10.000 VNĐ</td>
                <td>32</td>
                <td className="flex gap-[10px] items-center">
                  <span className="p-[10px] bg-blue-500 rounded-lg">
                    <RiPencilFill className=" text-white text-[25px] " />
                  </span>
                  <span className="p-[10px] bg-red-500 rounded-lg">
                    <FaRegTrashCan className=" text-white text-[25px]" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
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

export default Order;
