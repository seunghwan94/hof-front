import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    selectedProduct: null, //선택된 상품
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload; //선택한 상품 저장
    },
    updateOptions: (state, action) => {
      if (state.selectedProduct) {
        state.selectedProduct.options = action.payload; //상품 옵션 업데이트
      }
    },
  },
});

export const { setSelectedProduct, updateOptions } = productSlice.actions;

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export default store;
