import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  const user: any = useSelector(
    (state: RootState) => state.auth.login.currentUser?.user
  );
  const isRole = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user?.role
  );

  const formattedDate = moment(user?.createdAt).format("DD/MM/YYYY");

  return (
    <>
      <div className="container py-[50px]">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-[25px]">
          <div className="md:border-r border-r-violet-200 md:pr-[25px] border-dashed  col-span-1">
            {/* left */}
            <div className="flex flex-col  ring-1 ring-violet-200 gap-[10px] items-center p-[20px] rounded-xl dark:bg-gray-800 dark:text-white">
              <h1 className="text-[25px] font-semibold">Thông tin cá nhân</h1>
              {user?.avatar?.url && (
                <img
                  src={user.avatar.url}
                  alt="Avatar"
                  className="rounded-full h-[150px] border border-violet-300 w-[150px] object-cover"
                />
              )}
              <div>Họ và tên: {user?.name}</div>
              <div>Email:{user?.email}</div>
              <div>Ngày tạo: {formattedDate}</div>
              <button className="primary-btn" onClick={() => navigate("")}>
                Cập nhật thông tin cá nhân
              </button>
              <button
                className="primary-btn mt-[10px] px-[45px]"
                onClick={() => navigate("update-password")}
              >
                Cập nhật mật khẩu
              </button>
            </div>
            <div className="mt-[50px] dark:bg-gray-800">
              <div className="ring-1 ring-violet-200 p-[25px] flex flex-col items-center rounded-xl gap-[30px]">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/wishlist")}
                >
                  Xem các sản phẩm yêu thích
                </button>
                {isRole === "user" && (
                  <button
                    className="primary-btn px-[55px]"
                    onClick={() => navigate("/history-order")}
                  >
                    Lịch sử mua hàng
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="xl:col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
