import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { deleteOrder, getAllOrders } from "../../Services/modules/auth";
import moment from "moment";
import UpdateOrder from "./UpdateOrder";
import { formattedPrice } from "../../utils/formattedPrice";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
const Order = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const fetchApiOrder = async () => {
    setLoading(true);
    try {
      const res: any = await getAllOrders(page, limit, keyword);

      setData(res.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiOrder();
  }, []);

  const formattedDate = (data: string | Date): string => {
    return moment(data).format("HH:mm:ss - DD/MM/YYYY ");
  };

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    const modal = document.getElementById(
      `modal_delete_${id}`
    ) as HTMLDialogElement;
    modal.close();
    toast.success("🦄 Bạn đã xóa sản phẩm thành công!", {
      position: "top-right",
    });
    fetchApiOrder();
  };
  console.log(data);
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
                id="limit"
                name="limit"
                autoComplete="limit-name"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
          <div className="w-[30%] relative">
            <input
              type="text"
              className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
              placeholder="Tìm kiếm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
          {loading ? (
            <div className="h-[320px] w-full flex items-center justify-center text-violet-400">
              <span className="loading loading-spinner loading-lg "></span>
              <span className="loading loading-spinner loading-lg "></span>
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          ) : (
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
                      <td>{formattedPrice(item.totalPrice)}Đ</td>
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
                        <UpdateOrder
                          item={item}
                          fetchApiOrder={fetchApiOrder}
                        />
                        {/* delete */}
                        <span
                          className="p-[10px] bg-red-500 rounded-lg"
                          onClick={() => {
                            const modal = document.getElementById(
                              `modal_delete_${item._id}`
                            ) as HTMLDialogElement;
                            modal?.showModal();
                          }}
                        >
                          <FaRegTrashCan className=" text-white text-[25px]" />
                          <dialog
                            id={`modal_delete_${item._id}`}
                            className="modal"
                          >
                            <div className="modal-box">
                              <div className=" py-[10px] ">
                                <div className="text-[20px]">
                                  Bạn có chắc muốn xóa sản phẩm:{" "}
                                  <strong className="">{item.name}</strong>
                                </div>
                              </div>
                              <div className="flex justify-end items-center">
                                <button
                                  className="primary-btn  relative top-[11px] mr-[10px]"
                                  onClick={() => handleDeleteOrder(item._id)}
                                >
                                  Xóa
                                </button>
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="primary-btn bg-gray-500">
                                      thoát
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* pagination */}
      {loading === false && (
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
              <button
                className="join-item btn btn-md"
                onClick={() => setPage(1)}
              >
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
      )}
    </>
  );
};

export default Order;
