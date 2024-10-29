import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { getReviewById } from "../../Services/modules/auth";
import { FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const Reviews = () => {
  const [idProduct, setIdProduct] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [, setRating] = useState<number>(0);
  const handleReviewById = async () => {
    try {
      const res: any = await getReviewById(idProduct);
      setData(res.reviews);
      setRating(res.reviews.rating);
      setIdProduct("");
      if (res.reviews.length > 0) {
        toast.success(`🦄Danh sách đánh giá!`, {
          position: "top-right",
        });
      } else {
        toast.error(`🦄Sản phẩm chưa được đánh giá!`, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRating = (index: number) => {
    setRating(index);
  };

  return (
    <>
      {" "}
      <div className="w-[1500px]">
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white">
          Quản lý bình luận
        </h1>

        <div className="mt-[20px] flex justify-between">
          <div className="sm:col-span-3 ">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Show entries
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>
          </div>
          <div className="w-[30%] relative">
            <input
              type="text"
              className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
              placeholder="Tìm kiếm"
              value={idProduct}
              onChange={(e) => setIdProduct(e.target.value)}
            />
            <button
              type="button"
              className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300 bg-violet-200 text-black dark:bg-white  dark:text-black absolute top-0 right-[44px] dark:border-0 ring-1 ring-inset ring-gray-300"
              onClick={() => handleReviewById()}
            >
              <RiSearchLine />
            </button>
          </div>
        </div>
      </div>
      {/* table */}
      {data && data.length > 0 ? (
        <>
          <div className="mt-[40px]">
            <div className="overflow-x-auto w-[1500px]">
              <table className="table text-[16px]">
                {/* head */}
                <thead>
                  <tr className="text-[18px] dark:text-gray-300">
                    <th></th>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Xếp hạng</th>
                    <th>Nội dung</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item: any, index: number) => (
                      <tr className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400">
                        <th>{index + 1}</th>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>
                          <span className="flex items-center">
                            {[...Array(5)].map((_, index: number) => (
                              <FaStar
                                key={index}
                                className={`text-[20px] cursor-pointer ${
                                  index < item.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                onClick={() => handleRating(index + 1)} // Thiết lập rating theo số sao đã chọn
                              />
                            ))}
                          </span>
                        </td>
                        <td>{item.comment}</td>

                        <td className="flex gap-[10px] items-center">
                          <span className="p-[10px] bg-red-500 rounded-lg">
                            {" "}
                            <FaRegTrashCan className=" text-white text-[25px]" />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* pagination */}
          <div className="flex items-center justify-center mt-[30px]">
            <div className="join">
              <button className="join-item btn btn-md">1</button>
              <button className="join-item btn btn-md btn-active">2</button>
              <button className="join-item btn btn-md">3</button>
              <button className="join-item btn btn-md">4</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center py-[50px] text-[20px]">
            Vui lòng nhập Id Sản phẩm!!!
          </div>
        </>
      )}
    </>
  );
};

export default Reviews;
