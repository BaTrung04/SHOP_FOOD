import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { loadStripe } from "@stripe/stripe-js";
const Confirm = () => {
  const navigate = useNavigate();
  const info = useSelector((state: RootState) => state.ship.info);
  const items = useSelector((state: RootState) => state.cart.items);

  const formattedPrice = (price: number | undefined): string => {
    if (typeof price !== "number") {
      return "Giá không xác định";
    }
    return price.toLocaleString("vi-VN");
  };
  const calculateTotalPrice = (): number => {
    return items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  };
  const itemsPrice = calculateTotalPrice(); // giống giống như for, foreach
  const shippingPrice = itemsPrice > 100000 ? 0 : 10000; // tính tiền ship
  const taxPrice = Number(0.01 * itemsPrice); // tính thuế
  const totalPrice = itemsPrice + shippingPrice + taxPrice; // tổng tiền

  const calculateTotalQuantity = (): number => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  const handleClickNext = async () => {
    const stripe = await loadStripe("pk_test_51PCBNUP8z5n5kzFuvaruaOaszE2aUO4uc1f7FHYW2twU67IjtfQyp9cgAv2wxp2J6C4B988HYiQQ2fAA28od2Cmy00mInT9WHn");
    const body = {
      products: items,
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]}`, // Lấy token từ cookie
    };

    const res = await fetch(`http://localhost:8000/api/v1/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await res.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="col-span-2 border-r border-r-violet-100 border-dashed pr-[20px] pb-[20px]">
          <div className="flex flex-col gap-[10px] border-b border-b-violet-100 pb-[25px]">
            <div className="text-[25px] font-semibold">
              Thông tin vận chuyển
            </div>
            <div>
              <span className="font-bold">Tên khách hàng:</span> trung
            </div>
            <div>
              <span className="font-bold">Số điện thoại:</span> 012142133
            </div>
            <div>
              <span className="font-bold">địa chỉ:</span> bắc ninh , hà nội,
              việt nam
            </div>
          </div>
          <div className="mt-[25px] border-b border-b-violet-100">
            <div className="text-[23px] font-semibold py-[10px]">
              Các mặt hàng bạn đã chọn
            </div>
            <div className="overflow-x-auto w-[100%]">
              <table className="table text-[16px]">
                {/* head */}
                <thead>
                  <tr className="text-[18px] dark:text-gray-300">
                    <th></th>
                    <th>Hình ảnh </th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th className="">Số lượng </th>
                    <th>Tổng tiền</th>
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
                        <td> {formattedPrice(item.product.price)}Đ</td>
                        <td>
                          <div className=" ">{item.quantity}</div>
                        </td>
                        <td>
                          {formattedPrice(
                            Number(item.product.price) * item.quantity
                          )}
                          Đ
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-end mt-[50px]">
              <div className="  w-[300px] ring-1 ring-violet-300 py-[15px] rounded-xl shadow-md dark:bg-gray-800">
                <div className="text-center font-semibold border-b border-b-violet-300 px-[20px] pb-[10px]">
                  Tổng giá trị đơn hàng
                </div>
                <div className="flex justify-between px-[20px] py-[10px]">
                  <span>Sản phẩm: </span>
                  <span>3 </span>
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
                  onClick={() => handleClickNext()}
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
