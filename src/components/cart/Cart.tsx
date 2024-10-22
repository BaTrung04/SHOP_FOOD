import { FaRegTrashCan } from "react-icons/fa6";

const Cart = () => {
  return (
    <>
      <div className="container py-[50px] dark:text-white">
        <h1 className="text-[25px] font-medium border-b border-b-violet-300 pb-[10px]">
          Danh sách mong muốn của bạn
        </h1>
        {/* table */}
        <div className="mt-[40px]">
          <div className="overflow-x-auto w-[100%]">
            <table className="table text-[16px]">
              {/* head */}
              <thead>
                <tr className="text-[18px] dark:text-gray-300">
                  <th></th>
                  <th>Hình ảnh sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng </th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400">
                  <th>1</th>
                  <td>671222f5ee39e946b821f23e</td>
                  <td>1</td>
                  <td>10.000 VNĐ</td>
                  <td>32</td>
                  <td className="flex gap-[10px] items-center">
                    <span className="p-[8px] bg-red-500 rounded-lg">
                      <FaRegTrashCan className=" text-white text-[22px]" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* thanh toan */}
        <div className="flex justify-end mt-[50px]">
          <div className="  w-[300px] ring-1 ring-violet-300 py-[15px] rounded-xl shadow-md dark:bg-gray-800">
            <div className="text-center font-semibold border-b border-b-violet-300 px-[20px] pb-[10px]">
              Tổng giá trị đơn hàng
            </div>
            <div className="flex justify-between px-[20px] py-[10px]">
              <span>Số lượng: </span>
              <span>10 </span>
            </div>
            <div className="flex justify-between border-b border-b-violet-300 px-[20px] py-[10px]">
              <span>Tổng tiền: </span>
              <span>1002034 </span>
            </div>
            <button className="primary-btn w-[90%] mx-[20px] mt-[15px]">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
