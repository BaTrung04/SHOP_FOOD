import img from "../../assets/dau-bep.png";
import { FaArrowRight } from "react-icons/fa6";

const News = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-[25px] font-medium uppercase py-[40px] text-center dark:text-white">
          Category Archives: Tin tức
        </h1>
        <div className="flex gap-[10px] pb-[50px] dark:text-white">
          {/* left */}
          <div className="flex-1 border-r border-r-violet-300 px-[20px] pb-[50px]">
            {/* map */}
            <div className="flex flex-col items-center gap-[10px] py-[20px] border-b border-violet-300">
              <div className="uppercase text-[14px] text-gray-500 dark:text-gray-300">
                tin tức
              </div>
              <div className="relative text-[20px] text-center">
                Thời thượng và lãng mạn với Dịch vụ tiệc trọn gói outside Qúa
                Ngon Food
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
                      Sinh nhật là dịp để bạn quây quần bên người thân, bạn bè
                      và ôn lại những kỉ niệm đẹp. Vì thế, tại sao lại bỏ lỡ
                      những khoảng khắc tận hưởng thời gian ý nghĩa bên nhau mà
                      “đầu tắt mặt tối” dưới bếp để nấu nướng đến mức mệt phờ cả
                      người. Trong […]
                    </div>
                    <button className="primary-btn px-[30px] py-[8px] mt-[20px] flex items-center gap-[10px]">
                      Đọc bài viết <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* map */}
            <div className="flex flex-col items-center gap-[10px] py-[20px] border-b border-violet-300">
              <div className="uppercase text-[14px] text-gray-500 dark:text-gray-300">
                tin tức
              </div>
              <div className="relative text-[20px] text-center">
                Thời thượng và lãng mạn với Dịch vụ tiệc trọn gói outside Qúa
                Ngon Food
                <span className="absolute w-[60px] h-[3px] bg-violet-500 block left-[46%] bottom-[-5px]"></span>
              </div>
              <div className="text-[14px] text-gray-500 uppercase">
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
                      Sinh nhật là dịp để bạn quây quần bên người thân, bạn bè
                      và ôn lại những kỉ niệm đẹp. Vì thế, tại sao lại bỏ lỡ
                      những khoảng khắc tận hưởng thời gian ý nghĩa bên nhau mà
                      “đầu tắt mặt tối” dưới bếp để nấu nướng đến mức mệt phờ cả
                      người. Trong […]
                    </div>
                    <button className="primary-btn px-[30px] py-[8px] mt-[20px] flex items-center gap-[10px]">
                      Đọc bài viết <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-[300px] p-[20px]">
            <div className="relative text-[20px] font-semibold  uppercase">
              Food Good
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0] bottom-[-5px]"></span>
            </div>
            <div className="py-[15px]">
              Lấy chất lượng sản phẩm – món ăn làm trung tâm với sự đầu tư chỉn
              chu, tỉ mỉ và chặt chẽ trong từng khâu như lựa chọn nguyên liệu,
              quy trình chế biến đến cách bày trí và thưởng thức. Qúa Ngon Food
              quyết tâm khẳng định giá trị thương hiệu Việt và tạo ra lợi thế
              cạnh tranh với những thương hiệu nước ngoài đang dần chiếm lĩnh
              thị trường Việt Nam.
            </div>
            <div className="relative text-[20px] font-semibold  uppercase">
              Latest Posts
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0] bottom-[-5px]"></span>
            </div>
            <div className="py-[15px] ">
              {/* map */}
              <div className="border-b border-violet-300 py-[15px]">
                <div className="flex gap-[20px] items-start ">
                  <div className="px-[15px] py-[10px] bg-gray-300 rounded-sm text-[11px] text-gray-600">
                    01 Th12
                  </div>
                  <div className="line-clamp-2 hover:text-violet-600 cursor-pointer">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </div>
                </div>
              </div>
              <div className="border-b border-violet-300 py-[15px]">
                <div className="flex gap-[20px] items-start ">
                  <div className="px-[15px] py-[10px] bg-gray-300 rounded-sm text-[11px] text-gray-600">
                    01 Th12
                  </div>
                  <div className="line-clamp-2 hover:text-violet-600 cursor-pointer">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
