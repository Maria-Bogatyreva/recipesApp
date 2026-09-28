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
    },
    updateRecipe: (state, action) => {
      const editRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (editRecipeIndex >= 0) {
        state.recipes[editRecipeIndex] = action.payload
      }
    },
    favoriteRecipe: (state, action) => {
      const currentRecipe = state.recipes.find(r => r.id === action.payload)
      currentRecipe.favorite = !currentRecipe.favorite;
    }
  }
})

export default recipesSlice.reducer;

export const {addRecipe, deleteRecipe, updateRecipe, favoriteRecipe} = recipesSlice.actions