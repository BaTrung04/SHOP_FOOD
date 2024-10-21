import {
  ILogin,
  IApiLogin,
  IUserRegister,
} from "../../components/Interface/user";
import axiosInstance from "../axiosBaseApi";
const config = {
  headers: {
    "Content-Type": "application/json",
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
const configM = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
//[GET LOGOUT]
export const registerAuthApi = async (userData: any) => {
  return await axiosInstance.post("/register", userData, configM);
};
