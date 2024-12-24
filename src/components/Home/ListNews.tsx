import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNews } from "../../Services/modules/auth";
import moment from "moment";
const ListNews = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>("");
  const [page] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [keyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await getNews(page, limit, keyword);
        setData(res.rows);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [keyword, page, limit]);
  const formattedDate = (data: string | Date): string => {
    return moment(data).format("DD/MM/YYYY");
  };
  return (
    <>
      {/* map */}
      {loading ? (
        <div className="h-[320px] w-full flex items-center justify-center text-violet-400">
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      ) : (
        <div>
          {data &&
            data.map((item: any) => (
              <div
                className="flex flex-col items-center gap-[10px] py-[20px] mb-[30px] border-b border-violet-300"
                key={item._id}
              >
                <div className="uppercase text-[14px] text-gray-500 dark:text-gray-300">
                  tin tức
                </div>
                <div
                  className="relative text-[20px] text-center hover:text-violet-500 cursor-pointer"
                  onClick={() => navigate("detail-news")}
                >
                  {item.title}
                  <span className="absolute w-[60px] h-[3px] bg-violet-500 block left-[46%] bottom-[-5px]"></span>
                </div>
                <div className="text-[14px] text-gray-500 uppercase dark:text-gray-300">
                  Posted on {formattedDate(item.createdAt)} by{" "}
                  {item.author.name}
                </div>
                <div>
                  <div className=" grid grid-cols-3 ">
                    <img
                      src={item.image.url}
                      alt=""
                      className="md:mt-0 mt-[20px] object-cover border border-violet-200 rounded-xl"
                    />
                    <div className="p-[20px] col-span-2 ">
                      <p className="md:line-clamp-6 line-clamp-4">
                        {item.content}{" "}
                      </p>
                      <button
                        className="primary-btn px-[30px] py-[8px] mt-[20px] flex items-center gap-[10px]"
                        onClick={() => navigate(`${item._id}`)}
                      >
                        Đọc bài viết <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ListNews;
