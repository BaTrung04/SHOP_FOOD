import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RiShoppingBagFill, RiShoppingBagLine } from "react-icons/ri";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { removeCart, removeItem } from "../../redux/CartSlice";
import cart from "../../assets/cart.png";
import { toast } from "react-toastify";

interface MyComponentProps {
  darkMode: boolean;
}

const ShowCart: React.FC<MyComponentProps> = (props) => {
  const { darkMode } = props;
  const [showCart, setShowCart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
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

  const handlePayment = () => {
    if (isLogin === false) {
      navigate("/login");
      toast.error("Vui lòng đăng nhập để thanh toán!");
    } else {
      navigate("/ship");
      setShowCart(false);
    }
  };
  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >
        <div className=" inset-y-0 right-0 flex items-center gap-[10px] pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="2xl:p-[11px] xl:p-[7px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300  bg-violet-200 text-black dark:bg-white  dark:text-black"
            onClick={() => {
              navigate("/cart");
              setShowCart(false);
            }}
          >
            {darkMode ? (
              <RiShoppingBagFill className="2xl:text-[25px] xl:text-[20px]" />
            ) : (
              <RiShoppingBagLine className="text-[25px] xl:text-[20px]" />
            )}
          </button>
          <div className="absolute top-[-6px] right-[-8px] bg-red-500 text-[16px] rounded-full w-[25px] h-[25px] text-center text-white">
            {items.length}
          </div>
        </div>

        {showCart && (
          <div className="absolute bg-white w-[350px] right-[50%] dark:bg-gray-700 mt-[1px] left-[50%] transform translate-x-[-50%] z-10 origin-top ring-1 ring-gray-100 shadow-xl h-[auto] rounded-lg">
            {items.length === 0 ? (
              <div className="px-[20px] py-[40px] text-center">
                <div className="flex flex-col items-center justify-center gap-[10px] dark:text-white">
                  <img src={cart} alt="" className="w-[100px] " />
                  Chưa có sản phẩm trong giỏ hàng.
                </div>
              </div>
            ) : (
              <>
                <div className="text-gray-400 text-[14px] p-[10px] dark:text-white">
                  Sản phẩm mới thêm
                </div>
                <div className="px-[10px] overflow-y-auto max-h-[350px] ">
                  {/* sp1 */}
                  {items &&
                    items.map((item: any) => (
                      <div className="flex items-center justify-between text-[14px] mb-[5px] dark:text-white gap-[30px]">
                        <div className="flex items-center gap-[10px] ">
                          <img
                            src={item.product?.images[0]?.url || " "}
                            alt="anh lỗi"
                            className="w-[40px] h-[50px] border border-violet-200 object-cover rounded-sm"
                          />
                          <div className="line-clamp-2">
                            {item.product.name}
                          </div>
                        </div>
                        <div className=" flex items-center gap-[3px]">
                          <span> {item.quantity} </span> x
                          <span className="text-red-500 font-semibold">
                            {formattedPrice(item.product.price)}Đ
                          </span>
                          <div className="ml-[5px]">
                            <div className="ring-1 ring-violet-300 p-[5px] rounded-md hover:bg-red-500 hover:text-white cursor-pointer">
                              <FaRegTrashCan
                                className=" text-base text-[25px]"
                                onClick={() =>
                                  dispatch(removeItem(item.product._id))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mx-[10px] py-[15px] my-[5px] border-y border-y-violet-300 dark:text-white flex justify-between">
                  <span>
                    {" "}
                    Tổng tiền:{" "}
                    <span className="text-red-500 font-semibold">
                      {formattedPrice(calculateTotalPrice())}Đ
                    </span>
                  </span>
                  <span
                    onClick={() => dispatch(removeCart())}
                    className="text-gray-500 font-semibold text-[14px] cursor-pointer hover:text-red-500 hover:ring-1 ring-red-500 rounded-lg px-[2px]"
                  >
                    Xóa tất cả
                  </span>
                </div>
                <div className="flex flex-col gap-[10px] items-center mt-[10px] px-[10px]">
                  <button
                    className="primary-btn w-[100%]"
                    onClick={() => {
                      navigate("/cart");
                      setShowCart(false);
                    }}
                  >
                    Xem giỏ hàng
                  </button>
                  <button
                    className="primary-btn w-[100%] mb-[10px]"
                    onClick={() => handlePayment()}
                  >
                    Thanh toán
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowCart;
