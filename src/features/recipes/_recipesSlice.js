import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  list: [],//пользовательские рецепты
  public: [],
  loading: false,
  error: null//

};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.list.push(action.payload)
    },
    deleteRecipe: (state, action) => {
      state.list = state.list.filter(recipe => recipe.id !== action.payload)
    },
    updateRecipe: (state, action) => {
      const editRecipeIndex = state.list.findIndex(recipe => recipe.id === action.payload.id);
      if (editRecipeIndex >= 0) {
        state.list[editRecipeIndex] = action.payload
      }
    },
    favoriteRecipe: (state, action) => {
      const currentRecipe = state.list.find(r => r.id === action.payload);
      if (currentRecipe) {
        currentRecipe.favorite = !currentRecipe.favorite;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase('app/reset', () => {
      return initialState;
    })
  }
})
// Экспорт селекторов, для использования в компонентах
export const selectListRecipes = (state) => state.recipes.list

// Экспорт редюсера для добавления в store
export default recipesSlice.reducer;

export const {addRecipe, deleteRecipe, updateRecipe, favoriteRecipe} = recipesSlice.actions