import { ChangeEvent, useEffect, useState } from "react";
import { ICategory } from "../Interface/product";
import { getCategories } from "../../Services/modules/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
  const [valuePrice, setValuePrice] = useState<number>(0);
  const [, setRating] = useState(0);
  const [category, setCategory] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchApiCategory = async () => {
      try {
        const res = await getCategories(1, 10, "");
        setCategory(res.rows);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApiCategory();
  }, []);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValuePrice(Number(e.target.value));
  };
  const handleClickProductByCategory = (slug: string, id: string) => {
    navigate(`${slug}/${id}`);
  };
  return (
    <div className="container py-[50px]">
      <div className="flex sm:flex-row flex-col gap-[10px] pb-[50px] dark:text-white">
        {/* left */}
        <div className="sm:w-[270px] w-full sm:border-r border-r-violet-300 border-dashed">
          <div className=" px-[20px] py-[10px] rounded-lg">
            <div className="text-[18px] font-bold relative mb-[10px]">
              Danh mục
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0]"></span>
            </div>
            {loading ? (
              <div className="h-[320px] w-full flex items-center justify-center text-violet-400">
                <span className="loading loading-spinner loading-lg "></span>
                <span className="loading loading-spinner loading-lg "></span>
                <span className="loading loading-spinner loading-lg "></span>
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 grid-cols-3 sm:gap-[8px] gap-[4px]">
                {category &&
                  category.map((item) => {
                    const isActive = location.pathname.includes(item.slug); // Kiểm tra xem slug có trong URL hiện tại không

                    return (
                      <div
                        key={item._id}
                        className={`truncate max-w-[200px] sm:border-b border-b-violet-200 border border-violet-200  py-[5px] sm:block flex items-center justify-center pl-[5px] rounded-md cursor-pointer hover:bg-violet-200 ${
                          isActive ? "bg-violet-300" : ""
                        }`}
                        onClick={() =>
                          handleClickProductByCategory(item.slug, item._id)
                        }
                      >
                        {item.categoryName}
                      </div>
                    );
                  })}
              </div>
            )}
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Categories;
