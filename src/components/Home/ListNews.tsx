import { FaArrowRight } from "react-icons/fa";
import img from "../../assets/dau-bep.png";
import { useNavigate } from "react-router-dom";
const ListNews = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* map */}
      <div className="flex flex-col items-center gap-[10px] py-[20px] mb-[30px] border-b border-violet-300">
        <div className="uppercase text-[14px] text-gray-500 dark:text-gray-300">
          tin tức
        </div>
        <div
          className="relative text-[20px] text-center hover:text-violet-500 cursor-pointer"
          onClick={() => navigate("detail-news")}
        >
          Thời thượng và lãng mạn với Dịch vụ tiệc trọn gói outside Qúa Ngon
          Food
          <span className="absolute w-[60px] h-[3px] bg-violet-500 block left-[46%] bottom-[-5px]"></span>
        </div>
        <div className="text-[14px] text-gray-500 uppercase dark:text-gray-300">
          Posted on 25/11/2021 by hoangdung
        </div>
        <div>
          <div className=" flex ">
            <img
              src={img}
              alt=""
              className="w-[300px] h-[300px] object-cover border border-violet-200 rounded-xl"
            />
            <div className="p-[20px]">
              <div>
                Sinh nhật là dịp để bạn quây quần bên người thân, bạn bè và ôn
                lại những kỉ niệm đẹp. Vì thế, tại sao lại bỏ lỡ những khoảng
                khắc tận hưởng thời gian ý nghĩa bên nhau mà “đầu tắt mặt tối”
                dưới bếp để nấu nướng đến mức mệt phờ cả người. Trong […]
              </div>
              <button
                className="primary-btn px-[30px] py-[8px] mt-[20px] flex items-center gap-[10px]"
                onClick={() => navigate("detail-news")}
              >
                Đọc bài viết <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* map */}
      <div className="flex flex-col items-center gap-[10px] py-[20px] mb-[30px] border-b border-violet-300">
        <div className="uppercase text-[14px] text-gray-500 dark:text-gray-300">
          tin tức
        </div>
        <div
          className="relative text-[20px] text-center hover:text-violet-500 cursor-pointer"
          onClick={() => navigate("detail-news")}
        >
          Thời thượng và lãng mạn với Dịch vụ tiệc trọn gói outside Qúa Ngon
          Food
          <span className="absolute w-[60px] h-[3px] bg-violet-500 block left-[46%] bottom-[-5px]"></span>
        </div>
        <div className="text-[14px] text-gray-500 uppercase dark:text-gray-300">
          Posted on 25/11/2021 by hoangdung
        </div>
        <div>
          <div className=" flex ">
            <img
              src={img}
              alt=""
              className="w-[300px] h-[300px] object-cover border border-violet-200 rounded-xl"
            />
            <div className="p-[20px]">
              <div>
                Sinh nhật là dịp để bạn quây quần bên người thân, bạn bè và ôn
                lại những kỉ niệm đẹp. Vì thế, tại sao lại bỏ lỡ những khoảng
                khắc tận hưởng thời gian ý nghĩa bên nhau mà “đầu tắt mặt tối”
                dưới bếp để nấu nướng đến mức mệt phờ cả người. Trong […]
              </div>
              <button
                className="primary-btn px-[30px] py-[8px] mt-[20px] flex items-center gap-[10px]"
                onClick={() => navigate("detail-news")}
              >
                Đọc bài viết <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListNews;
