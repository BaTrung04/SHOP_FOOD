import { ILogin, IApiLogin } from "../../components/Interface/user";
import axiosInstance from "../axiosBaseApi";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const loginAuthApi = async (user: ILogin): Promise<IApiLogin> => {
  return await axiosInstance.post("/login", user, config);
};
