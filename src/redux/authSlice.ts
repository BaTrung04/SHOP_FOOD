import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Giả sử `currentUser` là một object có kiểu IUser, bạn định nghĩa kiểu dữ liệu cho nó:
import { IApiLogin } from "../components/Interface/user";
export interface IAuthState {
  login: {
    currentUser: IApiLogin | null;
    isFetching: boolean;
    error: boolean;
    isLogin: boolean;
  };
}

const initialState: IAuthState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<IApiLogin>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isLogin = true;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = authSlice;
export const { loginStart, loginFailed, loginSuccess } = actions;
export default reducer;
