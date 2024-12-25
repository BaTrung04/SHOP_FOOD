import Carousel from "react-multi-carousel";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  getProductByCategories,
  getProductById,
  getReviewById,
  postWishList,
  putReview,
} from "../../Services/modules/auth";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { RootState } from "../../redux/store";
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

const responsiveCate = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 2,
  },
};

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState<any>([]);
  const [idCategory, setIdCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProductByCategory, setDataProductByCategory] = useState<any>([]);
  const [dataReview, setDataReview] = useState<any>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const isFormValid = rating && comment;
  const name = useSelector(
    (state: RootState) => state.auth.login.currentUser?.user.name
  );

  const handlePageChange = (idCategory: string) => {
    navigate(`/product/${idCategory}`);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      } as ScrollIntoViewOptions);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        setData(res.product);
        setImages(res.product.images);
        setIdCategory(res.product.category);
        setQuantity(1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [id]);

  const fetchApiReviews = async () => {
    setLoading(true);
    try {
      const res: any = await getReviewById(id);
      setDataReview(res.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiReviews();
  }, [id]);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await getProductByCategories(idCategory, 1, 10, "");
      setDataProductByCategory(res.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [idCategory]);

  const formattedPrice = (price: number | undefined): string => {
    if (typeof price !== "number") {
      return "Giá không xác định";
    }
    return price.toLocaleString("vi-VN");
  };

  const handleClickAddWishList = async (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.stopPropagation();
    const data: any = {
      productId: id,
    };
    try {
      const res = await postWishList(data);
      toast.success(`🦄 ${res.message}!`);
    } catch (error) {
      console.log(error);
      toast.error(`🦄 Vui lòng đăng nhập!`);
    }
  };

  const handleClickAddToCart = async () => {
    const res: any = await getProductById(id);
    dispatch(addToCart({ product: res.product, quantity: quantity }));
  };

  const handleRating = (index: number) => {
    setRating(index);
  };

  const handleReview = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      rating: rating,
      comment: comment,
      productId: id,
      name: name,
    };
    try {
      await putReview(data);
      fetchApiReviews();
      toast.success("🦄Bạn đã đánh giá thành công!");
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataReview);
  return (
    <>
      {loading ? (
        <div className="h-[1142px] w-full flex items-center justify-center text-violet-400">
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : (
        <div className="container py-[50px]" ref={gridRef}>
          <div className="grid md:grid-cols-2 border-b border-b-violet-300 pb-[50px] dark:text-white">
            <div>
              <div className="flex items-center justify-center">
                <img
                  src={
                    data?.images?.length > 0
                      ? data.images[0].url
                      : "path/to/default/image.jpg"
                  }
                  alt="ảnh"
                  className="md:w-[100%] w-[80%] object-cover rounded-md"
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
                {images.length > 1 &&
                  images &&
                  images.map((item: any) => (
                    <div
                      key={item._id}
                      className="h-[110px] flex justify-center flex-col items-center mt-[10px]"
                    >
                      <img
                        src={item?.url}
                        alt="hình ảnh"
                        className=" cursor-pointer object-cover w-[90px] h-[90px] ring-1 ring-violet-200 opacity-50 hover:opacity-100"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="px-[30px] flex flex-col gap-[20px]">
              <div className="md:text-[30px] text-[20px] font-medium">
                {data.name}
              </div>
              <div className="text-red-500 md:text-[20px] text-lg">
                {formattedPrice(data.price)}Đ
              </div>
              <p className="line-clamp-6">{data.description}</p>
              <div className="flex items-center gap-[10px]">
                Tình trạng:{" "}
                {data.stock > 0 ? (
                  <strong className="text-green-700">Còn hàng</strong>
                ) : (
                  <strong className="text-red-700">Hết hàng</strong>
                )}
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
                <button
                  className="primary-btn flex-1 py-[10px]"
                  onClick={() => handleClickAddToCart()}
                >
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
            <div className="grid md:grid-cols-2 md:gap-0 gap-[50px] dark:text-white">
              <div className="">
                <div className="text-[18px] font-semibold ">Đánh giá</div>
                {/* map */}
                {dataReview.length > 0 ? (
                  <>
                    {dataReview &&
                      dataReview.map((item: any) => (
                        <div
                          className="flex gap-[20px] pr-[30px] mt-[20px] border-y border-violet-100 py-[10px]"
                          key={item.id}
                        >
                          {/* Thêm key cho mỗi item */}

                          <div>
                            <div className="flex items-center justify-start gap-[10px]">
                              <div className="font-medium">{item.name}</div>
                              {/* Sử dụng item.rating để hiển thị số sao sáng */}
                              {[...Array(5)].map((_, index: number) => (
                                <FaStar
                                  key={index + 1}
                                  className={`text-[20px] cursor-pointer ${
                                    index < item.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() => handleRating(index + 1)} // Thiết lập rating theo số sao đã chọn
                                />
                              ))}
                            </div>
                            <div className="line-clamp-3 text-[14px]">
                              {item.comment}
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className=" py-[30px]">
                    Sản phẩm chưa có đánh giá nào!
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <div className="p-[20px] ring-2 ring-violet-300 rounded-lg shadow-lg w-[90%] dark:bg-gray-800">
                  <div className="font-semibold">Thêm đánh giá mới</div>
                  <form
                    onSubmit={handleReview}
                    className="space-y-6 mt-[20px]  w-[100%]  "
                  >
                    <div>
                      <div className="text-[14px] my-[10px]">
                        Đánh giá của bạn: *
                      </div>
                      <div className="flex gap-[10px]">
                        <div className="flex">
                          {[...Array(5)].map((_, index: number) => (
                            <FaStar
                              key={index + 1}
                              className={`text-[30px] cursor-pointer ${
                                index < rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => handleRating(index + 1)} // Thiết lập rating theo số sao đã chọn
                            />
                          ))}
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
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
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

          <div className="py-[40px] mt-[200px] border-t border-t-violet-300">
            <div className="flex justify-between">
              <div className="text-[20px] uppercase py-[10px] ">
                Các sản phẩm tương tự
              </div>
              <div className="flex items-center gap-[10px] hover:text-violet-500 cursor-pointer">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
            <Carousel
              responsive={responsiveCate}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all 1s ease-in-out"
              transitionDuration={500}
              className="rounded-sm z-20]"
            >
              {dataProductByCategory &&
                dataProductByCategory.map((item: any) => (
                  <div
                    key={item._id}
                    className="h-[360px] dark:bg-gray-800 mx-[5px] cursor-pointer transform transition-transform duration-300 hover:scale-105 rounded-lg"
                    onClick={() => handlePageChange(item._id)}
                  >
                    <div className="pt-[20px] flex flex-col items-center gap-[15px]">
                      <div className="flex justify-center">
                        <img
                          src={
                            item?.images?.length > 0
                              ? item.images[0].url
                              : "path/to/default/image.jpg"
                          }
                          alt="hình ảnh"
                          className="cursor-pointer h-[200px] w-[200px] object-cover rounded-lg"
                        />
                      </div>
                      <div className="text-center w-[80%] line-clamp-2 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-red-600 font-bold text-[16px] text-center">
                        {formattedPrice(item.price)}Đ
                      </div>
                      <div className="absolute top-[15px] right-[15px]">
                        <div
                          onClick={(e) => handleClickAddWishList(e, item._id)}
                          className="ring-2 ring-violet-500 p-[5px] rounded-full flex items-center justify-center relative group opacity-10 hover:opacity-100 "
                        >
                          <FaHeart className="text-[25px] text-violet-500" />
                          <span className="absolute top-full flex items-center gap-[5px] w-[110px] mt-2 left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaRegHeart /> Yêu thích
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
