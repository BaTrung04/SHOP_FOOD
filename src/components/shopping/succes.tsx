import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../redux/CartSlice";

type PaymentStatus = "success" | "failed" | "error" | "missing_session" | null;

const Success = () => {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const infoShip: any = useSelector((state: RootState) => state.ship.info);
  const user: any = useSelector(
    (state: RootState) => state.auth.login.currentUser?.user
  );
  const orderItems = items.map((item: any) => {
    return {
      product: item?.product?._id,
      name: item?.product?.name,
      price: item?.product?.price,
      quantity: item?.quantity,
      image: item?.product?.images[0]?.url,
    };
  });

  // Hàm tính tổng tiền
  const calculateTotalPrice = (): number => {
    return items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  };

  const itemsPrice = calculateTotalPrice(); // giống giống như for, foreach
  const shippingPrice = itemsPrice > 100000 ? 0 : 10000; // tính tiền ship
  const totalPrice = itemsPrice + shippingPrice; // tổng tiền

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      navigate("/");
      return;
    }

    fetch(
      `http://localhost:8000/api/v1/check-payment-status?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Xác minh thanh toán thất bại");
        }
        return response.json();
      })
      .then((data) => {
        if (data.payment_status === "paid") {
          setPaymentStatus("success");
          createOrder(data.payment_intent, data.payment_status);
          localStorage.removeItem("sessionId");
        } else {
          setPaymentStatus("failed");
        }
      })
      .catch(() => {
        setPaymentStatus("error");
      });
  }, [navigate]);

  const createOrder = async (paymentId: string, paymentStatus: string) => {
    try {
      // truyen cho du body di. cai dung voi stripe e thanh lam r. con lai la thong tin dat hang
      const response = await fetch(`http://localhost:8000/api/v1/order/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          paymentInfo: {
            id: paymentId,
            status: paymentStatus,
          },
          user: user._id,
          orderItems: orderItems,
          shippingInfo: {
            address: infoShip.address,
            country: infoShip.nation,
            city: infoShip.city,
            phoneNo: infoShip.phone,
            postalCode: infoShip.code,
          },
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          totalPrice: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Tạo đơn hàng thất bại");
      }
      console.log("Đơn hàng đã được tạo thành công!");
      dispatch(removeCart());
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {paymentStatus === "success" && <h1>Thanh toán thành công!</h1>}
      {paymentStatus === "failed" && (
        <h1>Thanh toán thất bại. Vui lòng thử lại.</h1>
      )}
      {paymentStatus === "error" && (
        <h1>Lỗi khi xác minh thanh toán. Vui lòng liên hệ hỗ trợ.</h1>
      )}
      {paymentStatus === "missing_session" && (
        <h1>Không tìm thấy mã phiên giao dịch.</h1>
      )}

      <button
        onClick={handleBackHome}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Quay về Trang chủ
      </button>
    </div>
  );
};

export default Success;
