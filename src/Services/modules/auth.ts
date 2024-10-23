import { ICategoryResponse } from "../../components/Interface/product";
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

//admin [GET ALL USER]
export const getAllUser = async (): Promise<IAllUser> => {
  return await axiosInstance.get(`/admin/users`);
};

//admin [GET ALL USER]
export const updateUser = async (id: string, data:any): Promise<IUser> => {
  return await axiosInstance.put(`/admin/user/${id}`, data);
};
