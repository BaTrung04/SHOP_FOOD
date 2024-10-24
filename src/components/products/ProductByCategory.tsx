import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProductByCategories } from "../../Services/modules/auth";
const ProductByCategory = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(id);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await getProductByCategories(id, page, limit, "");
      setData(res.rows);
      setTotalPage(res.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [id]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      } as ScrollIntoViewOptions);
    }
  };
  return (
    <>
      <div ref={gridRef}>
        {loading ? (
          <div className="h-[320px] w-full flex items-center justify-center text-violet-400">
            <span className="loading loading-spinner loading-lg "></span>
            <span className="loading loading-spinner loading-lg "></span>
            <span className="loading loading-spinner loading-lg "></span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {/* map */}
            {data && data.length > 0 ? (
              data.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center shadow-md rounded-lg h-[320px] dark:bg-gray-800 cursor-pointer transform transition-transform duration-300 hover:scale-105"
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
                </div>
              ))
            ) : (
              <div className="flex justify-start  h-[320px] col-span-4 pt-[20px]">
                Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
              </div>
            )}
          </div>
        )}

        {/* pagination */}
        <div className="flex items-center justify-center mt-[50px]">
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
            <button className="join-item btn btn-md btn-active">{page}</button>
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
      </div>
    </>
  );
};

export default ProductByCategory;
