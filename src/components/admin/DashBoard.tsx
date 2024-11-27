import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import {
  getAllOrders,
  getAllProduct,
  getAllUser,
  getCategories,
} from "../../Services/modules/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Doughnut, Line, Radar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const DashBoard = () => {
  const [dataProduct, setDataProduct] = useState<any>([]);
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [dataCategories, setDataCategories] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(
    Array(12).fill(0)
  );
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resProduct = await getAllProduct(1, 1000, "");
        setDataProduct(resProduct.rows);

        const resOrder: any = await getAllOrders();
        setTotal(resOrder.totalAmount);
        setDataOrder(resOrder.orders);

        // Calculate monthly revenue
        const revenueByMonth = Array(12).fill(0);
        resOrder.orders.forEach((order: any) => {
          const month = new Date(order.createdAt).getMonth();
          revenueByMonth[month] += order.totalPrice;
        });
        setMonthlyRevenue(revenueByMonth);

        const resUser: any = await getAllUser();
        setDataUser(resUser.users);

        const resCate = await getCategories(1, 30, "");
        setDataCategories(resCate.rows);
   
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  // Line chart data for monthly revenue
  const lineState = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu theo tháng",
        backgroundColor: ["#60a5fa"],
        hoverBackgroundColor: ["#60a5fa"],
        data: monthlyRevenue,
        borderColor: "#60a5fa",
        fill: false,
      },
    ],
  };

  //radar
  const categoryCounts = dataProduct.reduce((acc: any, product: any) => {
    const category = product.category; // Lấy danh mục từ sản phẩm
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
  // Tạo một mảng kết quả mới dựa trên dataCategories và categoryCounts
  const result = dataCategories.map((category: any) => {
    return {
      ...category, // Sao chép các thuộc tính từ category
      count: categoryCounts[category._id] || 0, // Lấy số lượng từ categoryCounts hoặc 0 nếu không có
    };
  });

  const productWithCate = result.map((item: any) => item.count);
  const nameCategories = dataCategories.map((item: any) => item.categoryName);
  const radarData = {
    labels: nameCategories,
    datasets: [
      {
        label: "Danh mục sản phẩm",
        data: productWithCate,
        fill: true,
        backgroundColor: "#a78bfa",
        borderColor: "#a78bfa",
        pointBackgroundColor: "#a78bfa",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#a78bfa",
      },
    ],
  };
  let outOfStock = 0;
  const dataOutOfStokc = dataProduct.map((item: any) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });
  // Doughnut tính số lượng hàng còn và hết hàng
  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#e40e0e", "#406eeb"],
        hoverBackgroundColor: ["#eb4949", "#5491ec"],
        data: [outOfStock, dataProduct.length - outOfStock],
      },
    ],
  };
  const formattedPrice = (price: number): string => {
    return price.toLocaleString("vi-VN");
  };

  const options = {};

  return (
    <>
      <div className="">
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px]">
          Tổng quan
        </h1>
        <div className="grid grid-cols-6 gap-[30px] mt-[40px]">
          {/* Tổng danh thu */}
          <div>
            <div className="bg-blue-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">Tổng danh thu</div>
                <div className="text-center text-[20px] font-bold">
                  {formattedPrice(total)} VNĐ
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-t-blue-500 px-[10px] py-[6px]">
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Tổng danh muc */}
          <div>
            <div className="bg-violet-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">Tổng số danh mục</div>
                <div className="text-center text-[20px] font-bold">
                  {dataCategories.length}
                </div>
              </div>
              <div
                onClick={() => navigate("categories")}
                className="flex items-center justify-between border-t border-t-violet-500 px-[10px] py-[6px] cursor-pointer"
              >
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Tổng số sản phẩm */}
          <div>
            <div className="bg-red-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">Tổng số sản phẩm</div>
                <div className="text-center text-[20px] font-bold">
                  {dataProduct.length}
                </div>
              </div>
              <div
                onClick={() => navigate("products")}
                className="flex items-center justify-between border-t border-t-red-500 px-[10px] py-[6px] cursor-pointer"
              >
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Tổng số bài viết */}
          <div>
            <div className="bg-fuchsia-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">Tổng số bài viết</div>
                <div className="text-center text-[20px] font-bold">5</div>
              </div>
              <div
                onClick={() => navigate("news")}
                className="flex items-center justify-between border-t border-t-fuchsia-500 px-[10px] py-[6px] cursor-pointer"
              >
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Tổng số người dùng */}
          <div>
            <div className="bg-lime-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">
                  Tổng số người dùng
                </div>
                <div className="text-center text-[20px] font-bold">
                  {dataUser.length}
                </div>
              </div>
              <div
                onClick={() => navigate("user")}
                className="flex items-center justify-between border-t border-t-lime-500 px-[10px] py-[6px] cursor-pointer"
              >
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Tổng số đơn hàng */}
          <div>
            <div className="bg-yellow-400 w-[245px] rounded-xl text-white">
              <div className="p-[10px]">
                <div className="text-center text-[22px]">Tổng số đơn hàng</div>
                <div className="text-center text-[20px] font-bold">
                  {dataOrder.length}
                </div>
              </div>
              <div
                onClick={() => navigate("orders")}
                className="flex items-center justify-between border-t border-t-yellow-500 px-[10px] py-[6px] cursor-pointer"
              >
                Xem chi tiết <FaAngleRight />
              </div>
            </div>
          </div>

          {/* Line Chart for total revenue */}
          <div className="col-span-4 h-[500px] w-[1200px] flex ">
            <Line options={options} data={lineState} style={{ width: 900 }} />
          </div>

          {/* Radar Chart for product categories */}
          <div className="col-span-2 h-[600px]">
            <Radar data={radarData} options={options} />
          </div>

          {/* Placeholder elements */}
          <div className=" col-span-2 h-[300px]">
            <Doughnut data={doughnutState} options={options} />
          </div>
          <div className="bg-blue-400 h-[300px]">1</div>
          <div className="col-span-2 bg-blue-400 h-[300px]">1</div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
