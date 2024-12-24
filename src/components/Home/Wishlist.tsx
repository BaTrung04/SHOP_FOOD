import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { getWishList, postWishList } from "../../Services/modules/auth";
import { IProduct } from "../Interface/product";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

const Wishlist = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [page] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res: any = await getWishList(page, limit);
      setData(res.rows);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [page, limit]);

  const formattedPrice = (price: number): string => {
    return price.toLocaleString("vi-VN");
  };

  const handleClickDeleteWishList = async (id: string) => {
    const data: any = {
      productId: id,
    };
    try {
      const res = await postWishList(data);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success(`🦄 ${res.message}!`);
    } catch (error) {
      console.log(error);
      toast.error(`🦄 Vui lòng đăng nhập!`);
    }
  };
  const handleClickAddToCart = async (product: any) => {
    dispatch(addToCart({ product: product, quantity: 1 }));
  };
  return (
    <>
      {loading ? (
        <div className="h-[1142px] w-full flex items-center justify-center text-violet-400">
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : (
        <div className="container py-[50px] dark:text-white">
          <h1 className="text-[25px] font-medium border-b border-b-violet-300 pb-[10px]">
            Danh sách yêu thích của bạn
          </h1>
          {/* table */}
          <div className="mt-[40px]">
            <div className="overflow-x-auto w-[100%]">
              <table className="table text-[16px]">
                {/* head */}
                <thead>
                  <tr className="text-[18px] dark:text-gray-300">
                    <th></th>
                    <th>img</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>nhãn hiệu</th>
                    <th className="text-center">mô tả</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data &&
                    data.map((item: IProduct, index: number) => (
                      <tr
                        key={item._id}
                        className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400"
                      >
                        <th>{index + 1}</th>
                        <td>
                          <img
                            src={item?.images[0]?.url || ""}
                            alt="sản phẩm"
                            className="w-[50px] h-[50px] object-cover ring-1 ring-violet-300 rounded"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td className="text-red-500">
                          {formattedPrice(item.price)}Đ
                        </td>
                        <td>{item.seller}</td>
                        <td className="max-w-[300px] ">
                          <span className="line-clamp-2">
                            {item.description}
                          </span>
                        </td>

                        <td className="flex gap-[10px] items-center">
                          {/* add to cart */}
                          <button
                            className="primary-btn sm:block hidden"
                            onClick={() => handleClickAddToCart(item)}
                          >
                            Thêm vào giỏ hàng
                          </button>
                          <button
                            className="primary-btn sm:hidden block py-[12px]"
                            onClick={() => handleClickAddToCart(item)}
                          >
                            Thêm
                          </button>
                          {/* delete */}
                          <span
                            className="p-[10px] bg-red-500 rounded-lg"
                            onClick={() => handleClickDeleteWishList(item._id)}
                          >
                            <FaRegTrashCan className=" text-white text-[25px]" />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
