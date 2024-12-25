import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Snowfall from "react-snowfall";
import tuyet from "../assets/tuyet.png";
import keo from "../assets/keo.png";
import chuong from "../assets/chuong.png";
const LayoutDefault = () => {
  const images = [
    (() => {
      const img = new Image();
      img.src = tuyet;
      return img;
    })(),
    (() => {
      const img = new Image();
      img.src = tuyet;
      return img;
    })(),
    (() => {
      const img = new Image();
      img.src = keo;
      return img;
    })(),
    (() => {
      const img = new Image();
      img.src = keo;
      return img;
    })(),
    (() => {
      const img = new Image();
      img.src = chuong;
      return img;
    })(),
    (() => {
      const img = new Image();
      img.src = chuong;
      return img;
    })(),
  ];
  return (
    <>
      <Snowfall
        snowflakeCount={50}
        images={images}
        radius={[10, 30]}
        speed={[1, 3]}
        wind={[-0.5, 1.5]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 5,
        }}
      ></Snowfall>
      <div className="h-full ">
        <NavBar />
        <div className="dark:bg-gray-700 overflow-x-hidden ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutDefault;
