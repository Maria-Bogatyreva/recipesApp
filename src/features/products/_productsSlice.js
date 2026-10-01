import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  list: []
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload)
    },
    editProduct: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.list[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload)
    }
  }
})

// Экспорт селекторов, для использования в компонентах
export const selectProducts = state => state.products.list
export default productsSlice.reducer;
export const {addProduct, editProduct, deleteProduct} = productsSlice.actions