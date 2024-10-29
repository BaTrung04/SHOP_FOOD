import { useEffect, useState } from "react";
import { getOrderMe } from "../../Services/modules/auth";
import DetailOrderById from "./DetailOrderById";
import moment from "moment";
const HistoryOrder = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res: any = await getOrderMe();
        setData(res.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  const formattedDate = (data: string | Date): string => {
    return moment(data).format("HH:mm:ss - DD/MM/YYYY ");
  };
  return (
    <>
      {loading ? (
        <div className="h-[1142px] w-full flex items-center justify-center text-violet-400">
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : (
        <div className="container py-[50px] dark:text-white">
          <h1 className="text-[25px] font-medium border-b border-b-violet-300 pb-[10px]">
            Lịch sử mua hàng
          </h1>
          {/* table */}
          <div className="py-[50px]">
            <div className="overflow-x-auto w-[100%]">
              <table className="table text-[16px]">
                {/* head */}
                <thead>
                  <tr className="text-[18px] dark:text-gray-300">
                    <th></th>
                    <th>Id</th>
                    <th>Số lượng </th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
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
                          <DetailOrderById item={item} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryOrder;
