import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { getAllOrders } from "../../Services/modules/auth";
import moment from "moment";
import UpdateOrder from "./UpdateOrder";

const Order = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchApiOrder = async () => {
    try {
      const res: any = await getAllOrders();
      setData(res.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiOrder();
  }, []);

  const formattedDate = (data: string | Date): string => {
    return moment(data).format("HH:mm:ss - DD/MM/YYYY ");
  };
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
                <th>số lượng</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Ngào tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: any, index: number) => (
                  <tr className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400">
                    <th>{index + 1}</th>
                    <td>{item._id}</td>
                    <td>{item.orderItems.length}</td>
                    <td>{item.totalPrice}</td>
                    <td>
                      <span
                        className={`font-semibold ${
                          item.orderStatus === "Đã đặt hàng"
                            ? "text-red-500"
                            : item.orderStatus === "Đã giao hàng"
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {item.orderStatus}
                      </span>
                    </td>
                    <td>{formattedDate(item.createdAt)}</td>

                    <td className="flex gap-[10px] items-center">
                      <UpdateOrder item={item} fetchApiOrder={fetchApiOrder} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-center mt-[30px]">
        <div className="join">
          {page > 1 && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page - 1)}
            >
              &lt;
            </button>
          )}
          {page > 1 && (
            <button className="join-item btn btn-md" onClick={() => setPage(1)}>
              1
            </button>
          )}
          <button className="join-item btn btn-md btn-active">{page}</button>
          {page < totalPage && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          )}
          {page < totalPage && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page + 1)}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
