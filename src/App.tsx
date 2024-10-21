import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
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
import PrivateRoute from "./routes/privateRouter";
import DashBoard from "./components/admin/DashBoard";
import LoginAdmin from "./components/admin/LoginAdmin";

import LayoutDefaultAdmin from "./Layout/LayoutDefaultAdmin";
import Product from "./components/admin/product";
import Order from "./components/admin/order";
import Reviews from "./components/admin/Reviews";
import User from "./components/admin/User";
import { useState } from "react";

function App() {
  const isRole = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user?.role
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutDefault />}>
            <Route index element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
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
            <Route path="products" element={<Product />} />
            <Route path="orders" element={<Order />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="user" element={<User />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/login-admin" element={<LoginAdmin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
