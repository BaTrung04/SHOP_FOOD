import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socket"], // Không lưu trữ socket trong redux-persist
};

// rootReducer với kiểu trả về được khai báo
const rootReducer = combineReducers({
  auth: authReducer,
});

// persistReducer với kiểu trả về được khai báo
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Khai báo kiểu RootState từ rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Tạo store với middleware kèm theo kiểu
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Khai báo kiểu cho AppDispatch từ store
export type AppDispatch = typeof store.dispatch;

// Tạo persistor
export let persistor = persistStore(store);
