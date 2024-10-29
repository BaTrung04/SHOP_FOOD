import { FaRegTrashCan } from "react-icons/fa6";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../redux/CartSlice";
import cart from "../../assets/cart.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.auth.login.isLogin);
  const formattedPrice = (price: number | undefined): string => {
    if (typeof price !== "number") {
      return "Giá không xác định";
    }
    return price.toLocaleString("vi-VN");
  };

  // Hàm tính tổng tiền
  const calculateTotalPrice = (): number => {
    return items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  };

  // Hàm tính tổng tiền
  const calculateTotalQuantity = (): number => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handlePayment = () => {
    if (isLogin === false) {
      navigate("/login");
      toast.error("Vui lòng đăng nhập để thanh toán!");
    } else {
      navigate("/ship");
    }
  };
  return (
    <>
      <div className="container py-[50px] dark:text-white">
        {items.length === 0 ? (
          <div className="py-[50px] flex flex-col items-center gap-[10px]">
            <img src={cart} alt="" className="w-[300px]" />
            <div className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-500 bg-clip-text text-transparent text-[30px]">
              Giỏ hàng của bạn chưa có sản phẩm nào!
            </div>
            <div>
              Quay lại trang chủ mua hàng ngay:{" "}
              <button className="primary-btn" onClick={() => navigate("/")}>
                Về trang chủ
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-[25px] font-medium border-b border-b-violet-300 pb-[10px]">
              Danh sách mong muốn của bạn
            </h1>
            {/* table */}
            <div className="mt-[40px] border-b border-b-violet-300">
              <div className="overflow-x-auto w-[100%]">
                <table className="table text-[16px]">
                  {/* head */}
                  <thead>
                    <tr className="text-[18px] dark:text-gray-300">
                      <th></th>
                      <th>Hình ảnh sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th className="">Số lượng </th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1  map*/}
                    {items &&
                      items.map((item: any, index: number) => (
                        <tr className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400">
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={item?.product?.images[0]?.url || ""}
                              alt="sản phẩm"
                              className="w-[50px] h-[50px] object-cover ring-1 ring-violet-300 rounded"
                            />
                          </td>
                          <td>{item.product.name}</td>
                          <td>{formattedPrice(item.product.price)}Đ</td>
                          <td>
                            {" "}
                            <div>
                              <button
                                className={`btn rounded-tl-md rounded-none rounded-bl-md text-[20px] ${
                                  item.quantity === 1
                                    ? " opacity-50 cursor-not-allowed bg-violet-300"
                                    : ""
                                }`}
                                disabled={item.quantity === 1}
                                onClick={() =>
                                  dispatch(decreaseQuantity(item.product._id))
                                }
                              >
                                -
                              </button>
                              <button className="btn rounded-none bg-white text-[20px] w-[30px] ">
                                {item.quantity}
                              </button>
                              <button
                                className="btn rounded-tr-md rounded-none rounded-br-md text-[20px]"
                                onClick={() =>
                                  dispatch(increaseQuantity(item.product._id))
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="flex gap-[10px] items-center ">
                            <div className="p-[8px] bg-red-500 rounded-lg text-white hover:bg-white hover:text-red-500 hover:ring-1 ring-violet-300">
                              <FaRegTrashCan
                                className="  text-[22px] "
                                onClick={() =>
                                  dispatch(removeItem(item.product._id))
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
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
                  <span>Sản phẩm: </span>
                  <span>{items.length} </span>
                </div>
                <div className="flex justify-between px-[20px] py-[10px]">
                  <span>Số lượng: </span>
                  <span> {calculateTotalQuantity()} </span>
                </div>
                <div className="flex justify-between border-b border-b-violet-300 px-[20px] py-[10px]">
                  Tổng tiền:{" "}
                  <span className="text-red-500 font-semibold">
                    {formattedPrice(calculateTotalPrice())}Đ
                  </span>
                </div>
                <button
                  className="primary-btn w-[90%] mx-[20px] mt-[15px]"
                  onClick={() => handlePayment()}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
