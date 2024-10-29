import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProduct, postWishList } from "../../Services/modules/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const HistorySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = location.state?.keyword || "";
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllProduct(page, limit, keyword);

        setTotalPage(res.totalPage);
        setData(res.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [keyword]);

  const handleClickDetailProduct = (id: string) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      } as ScrollIntoViewOptions);
    }
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

  console.log(data);
  return (
    <>
      <div className="text-[20px]" ref={gridRef}>
        kết quả tìm kiếm:<strong> {keyword}</strong>
      </div>
      {data && data.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            {data &&
              data.length > 0 &&
              data.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col relative items-center shadow-md rounded-lg h-[320px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleClickDetailProduct(item._id)}
                >
                  <img
                    src={item?.images[0]?.url}
                    alt="sản phẩm"
                    className="w-[200px] h-[200px] object-cover my-[15px] rounded-lg"
                  />
                  <div className="text-center w-[80%] line-clamp-2">
                    {item.name}
                  </div>
                  <div className="text-red-600 font-bold">{item.price}₫</div>
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
              ))}
          </div>
          {/* pagination */}
          <div className="flex items-center justify-center mt-[50px] ">
            <div className="join">
              {page > 1 && (
                <button
                  className="join-item btn btn-md"
                  onClick={() => handlePageChange(page - 1)}
                >
                  &lt;
                </button>
              )}

              {page > 1 && (
                <button
                  className="join-item btn btn-md"
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
              )}

              {page > 2 && (
                <button
                  className="join-item btn btn-md"
                  onClick={() => handlePageChange(page - 1)}
                >
                  {page - 1}
                </button>
              )}
              <button className="join-item btn btn-md btn-active">
                {page}
              </button>
              {page < totalPage && (
                <button
                  className="join-item btn btn-md"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              )}
              {page < totalPage && (
                <button
                  className="join-item btn btn-md"
                  onClick={() => handlePageChange(page + 1)}
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="py-[50px] text-center">
          không có sản phầm nào phù hợp!
        </div>
      )}
      <div></div>
    </>
  );
};

export default HistorySearch;
