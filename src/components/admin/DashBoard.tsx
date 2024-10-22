import { FaAngleRight } from "react-icons/fa";

const DashBoard = () => {
  
  return (
    <>
      <div className="">
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px]">
          Tổng quan
        </h1>
        <div className="grid grid-cols-4 gap-[30px]  mt-[40px]">
          <div>
            <div className="bg-blue-400  w-[350px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px] ">Tổng danh thu</div>
                <div className="text-center text-[20px] font-bold ">
                  600.300VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-t-blue-500 px-[10px] py-[6px]">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-red-400  w-[350px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px] ">Tổng danh thu</div>
                <div className="text-center text-[20px] font-bold ">
                  600.300VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-t-red-500 px-[10px] py-[6px]">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-lime-400   w-[350px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px] ">Tổng danh thu</div>
                <div className="text-center text-[20px] font-bold ">
                  600.300VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-t-lime-500 px-[10px] py-[6px]">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-yellow-400   w-[350px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px] ">Tổng danh thu</div>
                <div className="text-center text-[20px] font-bold ">
                  600.300VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-t-yellow-500 px-[10px] py-[6px]">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-blue-400 h-[300px]">1</div>

          <div className=" bg-blue-400 h-[300px]">1</div>
          <div className=" bg-blue-400 h-[300px]">1</div>

          <div className="col-span-2 bg-blue-400 h-[300px]">1</div>

          <div className="col-span-2 bg-blue-400 h-[300px]">1</div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
