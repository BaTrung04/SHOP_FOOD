import logo from "../../assets/logo1.svg";
import { LiaCcVisa } from "react-icons/lia";
import { FaCcVisa } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-top">
        <footer className="container px-2 sm:px-6 lg:px-8 pb-[25px]">
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-[20px] px-[20px] py-[20px] dark:text-white ">
            <div className="col-span-2">
              <img
                src={logo}
                alt=""
                className="h-[60px] w-[200px] object-cover rounded-2xl"
              />
              <div>
                Website bán hàng trực tuyến của Food Good, hỗ trợ 24/7 cùng
                nhiều ưu đẫi hấp dẫn. Luôn luôn cập nhật mới nhiều sản phẩm.
              </div>
              <div>
                Cần hỗ trợ liên hệ với chúng tôi:{" "}
                <strong className="text-violet-500">+0123 456 789</strong>
              </div>
            </div>
            <div className=" flex flex-col gap-[10px]">
              <div className="font-bold text-violet-500">Thông tin</div>
              <div className="flex flex-col gap-[10px]">
                <div>Điều khoản về điều kiện</div>
                <div>Liên hệ với chúng tôi</div>
                <div>Giúp đỡ</div>
              </div>
            </div>
            <div className=" flex flex-col gap-[10px]">
              <div className="font-bold text-violet-500">Thông tin</div>
              <div className="flex flex-col gap-[10px]">
                <div>Số 263 Thành phố Bắc Ninh</div>
                <div>trung@gmail.com</div>
                <div>+012 3456 7890</div>
              </div>
            </div>
            <div className=" flex flex-col gap-[10px]">
              <div className="font-bold text-violet-500">Thông toán</div>
              <div className="flex flex-col gap-[10px]">
                <LiaCcVisa />
                <FaCcVisa />
                <div>Giúp đỡ</div>
              </div>
            </div>
          </div>
          <div className="text-center py-[10px] dark:text-white text-[20px]">
            Copyright © 2024 By Bá Trung
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
