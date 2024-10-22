import { ChangeEvent, useState } from "react";
import { categories } from "../Interface/product";
import lauHaiSan from "../../assets/lau-hai-san.jpg";

const Categories = () => {
  const [valuePrice, setValuePrice] = useState<number>(0);
  const [rating, setRating] = useState(0);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValuePrice(Number(e.target.value));
  };

  return (
    <div className="container py-[50px]">
      <div className="flex gap-[10px] pb-[50px] dark:text-white">
        {/* left */}
        <div className="w-[270px] border-r border-r-violet-300 border-dashed">
          <div className=" px-[20px] py-[10px] rounded-lg">
            <div className="text-[18px] font-bold relative mb-[10px]">
              Danh mục
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0]"></span>
            </div>
            <div className="flex flex-col gap-[8px]">
              {categories &&
                categories.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-b-violet-200 hover:bg-violet-200 py-[5px] pl-[5px] rounded-md cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          </div>
          {/* loc theo gia */}
          <div className="px-[20px] mt-[40px]">
            <div className="text-[18px] font-bold relative mb-[10px]">
              Lọc theo giá
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0]"></span>
            </div>
            <div>
              <input
                type="range"
                min={0}
                max={2000000}
                value={valuePrice}
                className="range range-xs [--range-shdw:#8b5cf6] mt-[5px]"
                onChange={handleRangeChange}
              />
              <div className="mt-[5px] flex items-center justify-between">
                <span>
                  Giá 0Đ - {new Intl.NumberFormat("vi-VN").format(valuePrice)}Đ
                </span>
                <button className="primary-btn">Lọc</button>
              </div>
            </div>
          </div>
          {/* lọc theo đánh giá */}
          <div className="px-[20px] mt-[40px]">
            <div className="text-[18px] font-bold relative mb-[10px]">
              Lọc theo đánh giá
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0]"></span>
            </div>
            <div>
              <ul className="pl-0">
                {[5, 4, 3, 2, 1].map((star) => (
                  <li
                    style={{
                      cursor: "pointer",
                      listStyleType: "none",
                    }}
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{
                          width: `${star * 20}%`,
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex-1">
          <div>
            <div className="grid grid-cols-4 gap-4">
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[290px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[200px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
