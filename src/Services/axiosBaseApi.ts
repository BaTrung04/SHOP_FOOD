import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Xử lý response từ server
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
