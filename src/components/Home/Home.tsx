import intro from "../../assets/intro.mp4";
import ship from "../../assets/ship.png";
import chef from "../../assets/dau-bep.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categories } from "../Interface/product";
import { FaAngleRight } from "react-icons/fa6";
import lauHaiSan from "../../assets/lau-hai-san.jpg";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const [isOnButton, setIsOnButton] = useState<boolean>(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsOnButton(true);
    } else {
      setIsOnButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      <div className="bg-white  dark:bg-gray-700 dark:text-white relative">
        {/* video intro */}
        <video autoPlay muted loop className="w-[100%]">
          <source src={intro} type="video/mp4"></source>
        </video>
        {/* main */}
        <div className="container">
          {/* header */}
          <div className="flex items-center justify-around gap-[20px] py-[50px] dark:text-white">
            <div>
              <div className="flex items-center gap-[10px]">
                <img src={ship} alt="" className="h-[60px]" /> Giao món siêu
                nhanh
              </div>
              <div>
                Qúa Ngon Food tối ưu thời gian giao hàng để khách hàng có trải
                nghiệm tuyệt vời nhất.
              </div>
            </div>
            <div className="flex flex-col items-center gap-[10px] border-x border-dashed border-violet-600 px-[5px]">
              <div>Thực đơn đa dạng</div>
              <div className="text-center">
                Không còn giới hạn nhu cầu và sở thích khi bạn đến với Qúa Ngon
                Food
              </div>
            </div>
            <div>
              <div className="flex items-center gap-[10px] ">
                <img src={chef} alt="" className="h-[60px]" /> Đầu bếp phục vụ
                tại nhà
              </div>
              <div>
                Món ăn được giữ nóng bằng than hồng trong lu đất, đầu bếp trình
                bày và phục vụ tại nhà
              </div>
            </div>
          </div>
          {/* Carousel danh muc */}
          <Carousel
            responsive={responsive}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease-in-out"
            transitionDuration={500}
            className="rounded-sm z-20"
          >
            {categories &&
              categories.map((urlImg) => (
                <div key={urlImg.id} className="h-[300px] ">
                  <img src={urlImg.url} alt="" className=" cursor-pointer" />
                  <div className="text-center dark:text-white">
                    {urlImg.name}
                  </div>
                </div>
              ))}
          </Carousel>
          {/* top */}
          <div className="py-[50px]">
            <div className="flex justify-between">
              <div className="text-[20px] uppercase py-[10px] ">
                Đặc sản trứ danh - Giữ nóng trong lu đất - Đầu bếp phục vụ tận
                nơi
              </div>
              <div className="flex items-center gap-[10px] hover:text-violet-500 cursor-pointer">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
            </div>
          </div>
          {/* danh sahc san pham */}
          <div className="py-[50px]">
            <div className="flex justify-between">
              <div className="text-[20px] uppercase py-[10px] ">
                Sản phẩm thường xuyên được đặt{" "}
              </div>
              <div className="flex items-center gap-[10px] hover:text-violet-500 cursor-pointer">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* map */}
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
              <div className="flex flex-col items-center shadow-md rounded-lg h-[350px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <img
                  src={lauHaiSan}
                  alt=""
                  className=" w-[255px] object-cover my-[15px] rounded-lg"
                />
                <div className="text">LẨU QUÁ NGON FOOD</div>
                <div className="text-red-600 font-bold">975.000₫</div>
              </div>
            </div>
          </div>

          {/* danh sach tin tuc */}
          <div className="py-[50px]">
            <Carousel
              responsive={responsive}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all 1s ease-in-out"
              transitionDuration={500}
              className="rounded-sm z-20]"
            >
              {categories &&
                categories.map((urlImg) => (
                  <div
                    key={urlImg.id}
                    className="h-[400px] dark:bg-gray-800 mx-[5px] cursor-pointer transform transition-transform duration-300 hover:scale-105 rounded-lg"
                  >
                    <img src={urlImg.url} alt="" className="cursor-pointer" />
                    <div className="text-center dark:text-white px-[20px] relative ">
                      Gà ta quay lu xôi đậu xanh hạt sen
                      <span className="absolute w-[30px] h-[3px] bg-violet-500 block left-[42%] bottom-[-5px]"></span>
                    </div>
                    <div className="line-clamp-3 px-[10px] text-center mt-[10px] text-gray-500 text-[14px]">
                      Gà ta quay lu xôi đậu xanh là một trong những món ăn chủ
                      chốt mang dấu ấn đặc trưng riêng của thương hiệu Qúa Ngon
                      Food, chiếm được sự ưa thích của thực khách nhờ vào hương
                      vị và cách chế biến vô cùng đặc biệt.
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
        {isOnButton && (
          <button
            className="primary-btn p-[15px] cursor-pointer rounded-full fixed right-[30px] bottom-[30px]"
            onClick={scrollToTop}
          >
            <FaArrowUp className="text-[22px]" />
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
