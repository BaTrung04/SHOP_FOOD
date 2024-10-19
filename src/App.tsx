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
import Contact from "./components/Home/Contact";
import Home from "./components/Home/Home";
function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
