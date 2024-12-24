import React, { useState } from "react";
import { IoInformationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import { putOrder } from "../../Services/modules/auth";
import { toast } from "react-toastify";

interface MyComponentProps {
  item: any;
  fetchApiOrder: () => void;
}

const UpdateOrder: React.FC<MyComponentProps> = ({ item, fetchApiOrder }) => {
  const { _id, shippingInfo, orderItems, orderStatus, createdAt, totalPrice } =
    item;
  const info = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user
  );

  const [status, setStatus] = useState(orderStatus || ""); // Set giá trị mặc định là orderStatus

  // Mảng trạng thái có thể có
  const orderStatusOptions = ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"];

  const formattedPrice = (price: number | undefined): string => {
    if (typeof price !== "number") {
      return "Giá không xác định";
    }
    return price.toLocaleString("vi-VN");
  };

  const formattedDate = (data: string | Date): string => {
    return moment(data).format("HH:mm:ss - DD/MM/YYYY ");
  };
  const handleClickUpdateStatus = async (id: string) => {
    const data = {
      status: status,
    };
    try {
      await putOrder(id, data);
      const modal = document.getElementById(
        `modal_detail_${_id}`
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn dã cập nhật thành công!", {
        position: "top-right",
      });
      fetchApiOrder();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <span
        className="p-[8px] bg-blue-400 rounded-lg hover:bg-blue-600"
        onClick={() => {
          const modal = document.getElementById(
            `modal_detail_${_id}`
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        <IoInformationOutline className=" text-white text-[22px]" />
        <dialog id={`modal_detail_${_id}`} className="modal">
          <div className="modal-box w-11/12 max-w-[1000px] ">
            <div className=" py-[10px] ">
              <div>
                <h1 className="text-[25px] mb-[20px]"> Thông tin:</h1>
                <div className="grid grid-cols-3">
                  <div className="flex flex-col gap-[10px] col-span-2">
                    <div>
                      Tên: <strong className="">{info?.name}</strong>
                    </div>
                    <div>
                      Điện thoại:{" "}
                      <strong className="">{shippingInfo?.phoneNo}</strong>
                    </div>
                    <div>
                      Địa chỉ:{" "}
                      <strong className="">
                        {shippingInfo?.address} / {shippingInfo?.city} /
                        {shippingInfo?.country}{" "}
                      </strong>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="text-25px ">
                      Đặt hàng: {formattedDate(createdAt)}
                    </div>
                    <div className="text-25px flex items-center gap-[10px]">
                      <span className="relative top-[3px]">Trạng thái:</span>
                      <div className="mt-[6px] flex-1">
                        <select
                          id="category"
                          name="category"
                          autoComplete="limit-name"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className={` block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                            status === "Đã đặt hàng" ||
                            status === "Đang vận chuyển"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {orderStatusOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className={` ${
                                option === "Đã đặt hàng" ||
                                option === "Đang vận chuyển"
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      className="primary-btn w-[full]"
                      onClick={() => handleClickUpdateStatus(item._id)}
                    >
                      Cập nhật
                    </button>

                    <div className="text-25px font-semibold">
                      Tổng tiền: {formattedPrice(totalPrice)}Đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[30px]">
              <div className="text-[20px] font-semibold py-[10px] mb-[10px]">
                Thông tin sản phẩm:
              </div>
              {orderItems &&
                orderItems.map((item: any) => (
                  <div
                    key={item.id}
                    className=" flex items-center justify-between text-[16px] mb-[5px] dark:text-white gap-[30px]"
                  >
                    <div className="flex items-center gap-[15px] ">
                      <img
                        src={item.image}
                        alt="anh lỗi"
                        className="w-[70px] h-[70px] border border-violet-200 object-cover rounded-sm"
                      />
                      <div className="line-clamp-2">{item.name}</div>
                    </div>
                    <div className=" flex items-center gap-[3px]">
                      <span> {item.quantity} </span> x
                      <span className="text-red-500 font-semibold">
                        {formattedPrice(item.price)}Đ
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="primary-btn btn-sm">Close</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </span>
    </>
  );
};

export default UpdateOrder;
