import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Giả sử `currentUser` là một object có kiểu IUser, bạn định nghĩa kiểu dữ liệu cho nó:
import { IApiLogin } from "../components/Interface/user";
import storage from "redux-persist/lib/storage";
import persistConfig from "./persistConfig";
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
    //Logout
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      storage.removeItem(`persist:${persistConfig.key}`);
      state.login.isLogin = false;
      state.login.error = false;
    },
    logOutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    //register
    registerSuccess: (state, action: PayloadAction<any>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isLogin = true;
      state.login.error = false;
    },
    //updateProfile
    updateProfileSuccess: (state, action) => {
      if (state.login.currentUser) {
        state.login.currentUser.user = action.payload;
      }
    },
    //updatePassword
    updatePasswordSuccess: (state, action) => {
      if (state.login.currentUser) {
        state.login.currentUser.user.password = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = authSlice;
export const {
  loginStart,
  loginFailed,
  loginSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  registerSuccess,
  updateProfileSuccess,
  updatePasswordSuccess,
} = actions;
export default reducer;
