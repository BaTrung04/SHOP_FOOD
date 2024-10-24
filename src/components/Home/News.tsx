import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getNews } from "../../Services/modules/auth";
import moment from "moment";

const News = () => {
  const [data, setData] = useState<any>("");
  const [page] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [keyword] = useState<string>("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getNews(page, limit, keyword);
        setData(res.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [keyword, page, limit]);
  const formattedDate = (data: string | Date): string => {
    return moment(data).format("DD/MM");
  };
  return (
    <>
      <div className="container">
        <h1 className="text-[25px] font-medium uppercase py-[40px] text-center dark:text-white">
          Category Archives: Tin tức
        </h1>
        <div className="flex gap-[10px] pb-[50px] dark:text-white">
          {/* left */}
          <div className="flex-1 border-r border-r-violet-300 px-[20px] pb-[50px]">
            <Outlet />
          </div>
          {/* right */}
          <div className="w-[300px] p-[20px]">
            <div className="relative text-[20px] font-semibold  uppercase">
              Food Good
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0] bottom-[-5px]"></span>
            </div>
            <div className="py-[15px]">
              Lấy chất lượng sản phẩm – món ăn làm trung tâm với sự đầu tư chỉn
              chu, tỉ mỉ và chặt chẽ trong từng khâu như lựa chọn nguyên liệu,
              quy trình chế biến đến cách bày trí và thưởng thức. Qúa Ngon Food
              quyết tâm khẳng định giá trị thương hiệu Việt và tạo ra lợi thế
              cạnh tranh với những thương hiệu nước ngoài đang dần chiếm lĩnh
              thị trường Việt Nam.
            </div>
            <div className="relative text-[20px] font-semibold  uppercase">
              Latest Posts
              <span className="absolute w-[40px] h-[3px] bg-violet-500 block left-[0] bottom-[-5px]"></span>
            </div>
            <div className="py-[15px] ">
              {/* map */}
              {data &&
                data.map((item: any) => (
                  <div className="border-b border-violet-300 py-[15px]">
                    <div className="flex gap-[20px] items-start ">
                      <div className="flex items-center justify-center px-[10px] h-[50px] w-[50px] bg-gray-300 rounded-sm text-[11px] text-gray-600">
                        {formattedDate(item.createdAt)}
                      </div>
                      <div className="line-clamp-2 hover:text-violet-600 cursor-pointer">
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
