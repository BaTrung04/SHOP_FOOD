import Carousel from "react-multi-carousel";
import lauHaiSan from "../../assets/lau-hai-san.jpg";
import { categories } from "../Interface/product";
import { useState } from "react";
import { CiStar } from "react-icons/ci";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DetailProduct = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const isFormValid = content;
  return (
    <>
      <div className="container py-[50px]">
        <div className="grid grid-cols-2 border-b border-b-violet-300 pb-[50px] dark:text-white">
          <div>
            <div className="flex items-center justify-center">
              <img
                src={lauHaiSan}
                alt=""
                className="w-[100%] object-cover rounded-md"
              />
            </div>
            <Carousel
              responsive={responsive}
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
                  <div
                    key={urlImg.id}
                    className="h-[110px] ring-1 ring-violet-200 flex justify-center flex-col items-center mt-[10px]"
                  >
                    <img
                      src={urlImg.url}
                      alt=""
                      className=" cursor-pointer object-cover w-[90px] h-[90px]"
                    />
                    <div className="text-center dark:text-white">
                      {urlImg.name}
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="px-[30px] flex flex-col gap-[20px]">
            <div className="text-[30px] font-medium">
              ĐỆ NHẤT HEO TỘC QUAY LU CHẶT MẸT{" "}
            </div>
            <div className="text-red-500">2.787.000₫</div>
            <p>
              Đệ Nhất Heo Tộc Quay Lu Chặt Mẹt là đặc sản trứ danh chỉ duy nhất
              bán tại Quá Ngon Food. Món ăn nổi tiếng hơn 14 năm nay, trước phải
              đến Nhà hàng mới được thưởng thức, nay đã có dịch vụ giao món tận
              nhà! Một con heo tộc làm 3 món: lòng dồi hấp nóng hổi; thịt, da
              quay lu giòn rụm; đầu, xương, cẳng chân nấu khoai sọ, dùng cùng
              với các loại rau rừng, mắm tôm Thanh Hoá.
            </p>
            <div className="flex items-center gap-[10px]">
              Tình trạng: <strong className="text-green-700">Còn hàng</strong>
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <div>
                <button
                  className={`btn rounded-tl-md rounded-none rounded-bl-md text-[20px] ${
                    quantity === 1
                      ? " opacity-50 cursor-not-allowed bg-violet-300"
                      : ""
                  }`}
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <button className="btn rounded-none bg-white text-[20px]">
                  {quantity}
                </button>
                <button
                  className="btn rounded-tr-md rounded-none rounded-br-md text-[20px]"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="primary-btn flex-1 py-[10px]">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="ring-1 ring-violet-300 px-[10px] py-[13px] rounded-2xl shadow-md mb-[20px] w-[120px] dark:text-white">
            Đánh giá (0)
          </div>
          {/* Dánh giá */}
          <div className="flex dark:text-white">
            <div className="flex-1">
              <div className="text-[18px] font-semibold ">Đánh giá</div>
              {/* map */}
              <div className="flex gap-[20px] pr-[30px] mt-[20px]">
                <img
                  src={lauHaiSan}
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-full border border-violet-300"
                />
                <div>
                  <div className="flex items-center justify-start gap-[10px]">
                    <div className="font-medium">Bá Trung</div>
                    <div className="flex">
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                    </div>
                  </div>
                  <div className="line-clamp-3 text-[14px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nulla officiis ut natus doloremque ipsa enim officia veniam,
                    commodi dolorem laborum blanditiis ipsam eligendi unde
                    placeat vero sequi quidem sapiente nam!
                  </div>
                </div>
              </div>
              {/* map */}
              <div className="flex gap-[20px] pr-[30px] mt-[20px]">
                <img
                  src={lauHaiSan}
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-full border border-violet-300"
                />
                <div>
                  <div className="flex items-center justify-start gap-[10px]">
                    <div className="font-medium">Bá Trung</div>
                    <div className="flex">
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                      <CiStar className="text-[20px]" />
                    </div>
                  </div>
                  <div className="line-clamp-3 text-[14px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nulla officiis ut natus doloremque ipsa enim officia veniam,
                    commodi dolorem laborum blanditiis ipsam eligendi unde
                    placeat vero sequi quidem sapiente nam!
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="p-[20px] ring-2 ring-violet-300 rounded-lg shadow-lg w-[80%] dark:bg-gray-800">
                <div className="font-semibold">Thêm đánh giá mới</div>
                <form className="space-y-6 mt-[20px]  w-[100%]  ">
                  <div>
                    <div className="text-[14px] my-[10px]">
                      Đánh giá của bạn: *
                    </div>
                    <div className="flex gap-[10px]">
                      <div className="flex">
                        <CiStar className="text-[30px]" />
                        <CiStar className="text-[30px]" />
                        <CiStar className="text-[30px]" />
                        <CiStar className="text-[30px]" />
                        <CiStar className="text-[30px]" />
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                          >
                            Nhận xét của bạn:
                          </label>
                        </div>
                        <div className="mt-2 relative">
                          <textarea
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="block w-full px-[5px] rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                            placeholder="Nhập nội dung tại đây..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className={`primary-btn w-[100%] ${
                        !isFormValid
                          ? "opacity-50 cursor-not-allowed bg-violet-300"
                          : ""
                      }`}
                      disabled={!isFormValid}
                    >
                      Đánh giá
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
