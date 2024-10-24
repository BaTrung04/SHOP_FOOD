import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LayoutDefault from "./Layout/LayoutDefault";
import Introduce from "./components/Home/Introduce";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import News from "./components/Home/News";
import NewsAdmin from "./components/admin/News";
import Contact from "./components/Home/Contact";
import Home from "./components/Home/Home";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRouter";
import DashBoard from "./components/admin/DashBoard";
import CategoriesAdmin from "./components/admin/CategoriesAdmin";
import LoginAdmin from "./components/admin/LoginAdmin";

import LayoutDefaultAdmin from "./Layout/LayoutDefaultAdmin";
import Product from "./components/admin/Product";
import Order from "./components/admin/Order";
import Reviews from "./components/admin/Reviews";
import User from "./components/admin/User";
import Info from "./components/Home/Info";
import UpdateAccount from "./components/Home/UpdateAccount";
import UpdatePassword from "./components/Home/UpdatePassword";
import Cart from "./components/cart/Cart";
import Payment from "./components/shopping/Payment";
import DetailNews from "./components/Home/DetailNews";
import ListNews from "./components/Home/ListNews";
import Categories from "./components/products/Categories";
import DetailProduct from "./components/products/DetailProduct";
import PageNotExist from "./components/404/404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductByCategory from "./components/products/ProductByCategory";
import DetailCategory from "./components/products/DetailCategory";

function App() {
  const isRole = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user?.role
  );
  const darkMode = localStorage.getItem("darkMode");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutDefault />}>
            <Route index element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail-product" element={<DetailProduct />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/categories" element={<Categories />}>
              <Route index element={<DetailCategory />} />
              <Route path=":slug/:id" element={<ProductByCategory />} />
            </Route>
            <Route path="/news" element={<News />}>
              <Route index element={<ListNews />} />
              <Route path="detail-news" element={<DetailNews />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/info" element={<Info />}>
              <Route index element={<UpdateAccount />} />
              <Route path="update-password" element={<UpdatePassword />} />
            </Route>
          </Route>
          <Route
            path="admin"
            element={
              isRole === "admin" ? (
                <PrivateRoute>
                  <LayoutDefaultAdmin />
                </PrivateRoute>
              ) : (
                <Navigate to="/login-admin" />
              )
            }
          >
            {/* Route con */}
            <Route index element={<DashBoard />} />
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="products" element={<Product />} />
            <Route path="orders" element={<Order />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="user" element={<User />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="*" element={<PageNotExist />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode === "true" ? "dark" : "light"}
        />
      </Router>
    </>
  );
}

export default App;
