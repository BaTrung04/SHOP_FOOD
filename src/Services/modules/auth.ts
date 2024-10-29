import {
  IANew,
  ICategoryResponse,
  INewResponse,
  IProductByIdResponse,
  IProductResponse,
  IWishList,
} from "../../components/Interface/product";
import {
  ILogin,
  IApiLogin,
  IUser,
  IAllUser,
} from "../../components/Interface/user";
import axiosInstance from "../axiosBaseApi";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const configForm = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
// [POST LOGIN]
export const loginAuthApi = async (user: ILogin): Promise<IApiLogin> => {
  return await axiosInstance.post("/login", user, config);
};

//[GET LOGOUT]
export const logoutAuthApi = async () => {
  return await axiosInstance.get("/logout");
};

//[REGISTER LOGOUT]
export const registerAuthApi = async (userData: any) => {
  return await axiosInstance.post("/register", userData, configForm);
};

//[PUT LOGOUT]
export const updatePassword = async (passwords: any) => {
  return await axiosInstance.put("/password/update", passwords);
};

//[PUT LOGOUT]
export const updateProfile = async (data: any): Promise<IUser> => {
  return await axiosInstance.put("/me/update", data);
};

//[ADMIN]

//CATEGORY
//[POST CATEGORIES]
export const getCategories = async (
  page: number,
  limit: number,
  keyword: string
): Promise<ICategoryResponse> => {
  return await axiosInstance.get(
    `/category?page=${page}&keyword=${keyword}&limit=${limit}`
  );
};

//[POST CATEGORIES]
export const createCategories = async (data: any) => {
  return await axiosInstance.post("/admin/category", data, configForm);
};

//[Update CATEGORIES]
export const updateCategories = async (id: string, data: any) => {
  return await axiosInstance.put(`/admin/category/${id}`, data);
};

//[DELETE CATEGORIES]
export const deleteCategories = async (id: string) => {
  return await axiosInstance.delete(`/admin/category/${id}`);
};

//[USER]
//admin [GET ALL USER]
export const getAllUser = async (): Promise<IAllUser> => {
  return await axiosInstance.get(`/admin/users`);
};

//admin [GET ALL USER]
export const updateUser = async (id: string, data: any): Promise<IUser> => {
  return await axiosInstance.put(`/admin/user/${id}`, data);
};

//[PRODUCT]
//admin [GET ALL USER]
export const getAllProduct = async (
  page: number,
  limit: number,
  keyword: string
): Promise<IProductResponse> => {
  return await axiosInstance.get(
    `/products?page=${page}&keyword=${keyword}&limit=${limit}`
  );
};

//[GET PRODUCT BY ID]
export const getProductById = async (
  id: string | undefined
): Promise<IProductByIdResponse> => {
  return await axiosInstance.get(`/product/${id}`);
};

//[POST CATEGORIES]
export const postProduct = async (data: any) => {
  return await axiosInstance.post("/admin/product/new", data);
};

//[Update CATEGORIES]
export const updateProduct = async (id: string, data: any) => {
  return await axiosInstance.put(`/admin/product/${id}`, data);
};

//[DELETE CATEGORIES]
export const deleteProduct = async (id: string) => {
  return await axiosInstance.delete(`/admin/product/${id}`);
};

//[USER]
export const getProductByCategories = async (
  id: any,
  page: number,
  limit: number,
  keyword: string
): Promise<INewResponse> => {
  return await axiosInstance.get(
    `/${id}/products?page=${page}&keyword=${keyword}&limit=${limit}`
  );
};

//[NEWS]
//admin [GET NEWS]
export const getNews = async (
  page: number,
  limit: number,
  keyword: string
): Promise<INewResponse> => {
  return await axiosInstance.get(
    `/news?page=${page}&keyword=${keyword}&limit=${limit}`
  );
};

export const getANew = async (id: string | undefined): Promise<IANew> => {
  return await axiosInstance.get(`/news/${id}`);
};

//[POST NEWS]
export const postNews = async (data: any) => {
  return await axiosInstance.post("/admin/news", data);
};

//[Update CATEGORIES]
export const updateNews = async (id: string, data: any) => {
  return await axiosInstance.put(`/admin/news/${id}`, data);
};
//[DELETE NEWS]
export const deleteNews = async (id: string) => {
  return await axiosInstance.delete(`/news/${id}`);
};

//[Wishlist]
//[POST WISHLIST]
export const postWishList = async (id: string): Promise<IWishList> => {
  return await axiosInstance.post("/wishlist", id);
};

//[GET WISHLIST]
export const getWishList = async (page: number, limit: number) => {
  return await axiosInstance.get(`/wishlist/user?limit=${limit}&page=${page}`);
};

//[PAYMENT ]
export const postPayment = async (data: any) => {
  return await axiosInstance.post(`/payment/process`, data);
};

//[PUT NEW REVIEW]
export const putReview = async (data: any) => {
  return await axiosInstance.put(`/review`, data);
};

export const getReviewById = async (id: string | undefined) => {
  return await axiosInstance.get(`/reviews?id=${id}`);
};

//[ORDER]
//[POST ORDER]
export const postOrder = async (data: any) => {
  return await axiosInstance.post(`/order/new`, data);
};

//[GET ORDER]
export const getOrderMe = async () => {
  return await axiosInstance.get(`/orders/me`);
};
