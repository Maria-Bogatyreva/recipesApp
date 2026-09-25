import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  recipes: []
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload)
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
    }
  }
})

export default recipesSlice.reducer;

export const {addRecipe, deleteRecipe} = recipesSlice.actions