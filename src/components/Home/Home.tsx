import intro from "../../assets/intro.mp4";
import ship from "../../assets/ship.png";
import chef from "../../assets/dau-bep.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categories } from "../Interface/product";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  return (
    <>
      <div className="bg-white  dark:bg-gray-700">
        <video autoPlay muted loop className="video-homepage">
          <source src={intro} type="video/mp4"></source>
        </video>
        <div className="container">
          {/* header */}
          <div className="flex items-center justify-around gap-[20px] py-[50px] dark:text-white">
            <div>
              <div className="flex items-center gap-[10px]">
                <img src={ship} alt="" className="h-[60px]" /> Giao món siêu
                nhanh
              </div>
              <div>
                Qúa Ngon Food tối ưu thời gian giao hàng để khách hàng có trải
                nghiệm tuyệt vời nhất.
              </div>
            </div>
            <div className="flex flex-col items-center gap-[10px] border-x border-dashed border-violet-600 px-[5px]">
              <div>Thực đơn đa dạng</div>
              <div className="text-center">
                Không còn giới hạn nhu cầu và sở thích khi bạn đến với Qúa Ngon
                Food
              </div>
            </div>
            <div>
              <div className="flex items-center gap-[10px] ">
                <img src={chef} alt="" className="h-[60px]" /> Đầu bếp phục vụ
                tại nhà
              </div>
              <div>
                Món ăn được giữ nóng bằng than hồng trong lu đất, đầu bếp trình
                bày và phục vụ tại nhà
              </div>
            </div>
          </div>
          {/* Carousel */}
          <Carousel
            responsive={responsive}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease-in-out"
            transitionDuration={500}
            className="rounded-sm"
          >
            {categories &&
              categories.map((urlImg) => (
                <div key={urlImg.id} className="h-[300px] ">
                  <img src={urlImg.url} alt="" className=" cursor-pointer" />
                  <div className="text-center dark:text-white">
                    {urlImg.name}
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;
