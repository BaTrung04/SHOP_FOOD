import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LayoutShopping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="container py-[50px] dark:text-white">
        <div className="flex items-center justify-center">
          <ul className="steps cursor-pointer mb-[30px]">
            <li
              className={`step ${
                currentPath === "/ship" ||
                currentPath === "/ship/confirm" ||
                currentPath === "/ship/payment"
                  ? "step-primary"
                  : ""
              }`}
              onClick={() => navigate("/ship")}
            >
              Vận chuyển
            </li>
            <li
              className={`step ${
                currentPath === "/ship/confirm" ||
                currentPath === "/ship/payment"
                  ? "step-primary"
                  : ""
              }`}
              onClick={() => navigate("confirm")}
            >
              Xác nhận hóa đơn
            </li>
            <li
              className={`step ${
                currentPath === "/ship/payment" ? "step-primary" : ""
              }`}
              onClick={() => navigate("payment")}
            >
              Thanh toán
            </li>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutShopping;
