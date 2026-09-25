import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {}
})

export default recipesSlice.reducer;