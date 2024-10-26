import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: {
    _id: string;
    name: string;
    price: string;
    image: string;
    stock: string;
  };
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add
    addToCart: (
      state,
      action: PayloadAction<{ product: any; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        // Tăng quantity nếu sản phẩm đã tồn tại
        existingItem.quantity += quantity; // Cộng thêm số lượng người dùng chọn
      } else {
        // Thêm sản phẩm mới vào mảng items với số lượng đã chọn
        state.items.push({
          product,
          quantity,
        });
      }
    },
    //tang
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    //giam
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    //removeItem
    removeItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      // Lọc bỏ sản phẩm có _id trùng với productId
      state.items = state.items.filter(
        (item) => item.product._id !== productId
      );
    },
    //xóa tất cả
    removeCart: (state) => {
      state.items = [];
    },
  },
});

// Action creators được tạo cho mỗi reducer function
const { actions, reducer } = cartSlice;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCart,
  removeItem,
} = actions; // Thêm removeCart vào đây
export default reducer;
