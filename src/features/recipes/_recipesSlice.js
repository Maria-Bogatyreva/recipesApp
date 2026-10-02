import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  list: [],//пользовательские рецепты
  public: [],
  loading: false,
  error: null//

};

export const fetchPublicRecipes = createAsyncThunk(
  'recipes/public',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=187ba0ea95494af99b0a6134c303af08');
      if (!response.ok) {
        throw new Error('error!')
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
    builder
      .addCase('app/reset', () => {
        return initialState;
      })
      .addCase(fetchPublicRecipes.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchPublicRecipes.fulfilled, (state, action) => {
        state.loading = false
        state.public = action.payload.recipes
      })
      .addCase(fetchPublicRecipes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})
// Экспорт селекторов, для использования в компонентах
export const selectListRecipes = (state) => state.recipes.list

// Экспорт редюсера для добавления в store
export default recipesSlice.reducer;

export const {addRecipe, deleteRecipe, updateRecipe, favoriteRecipe} = recipesSlice.actions