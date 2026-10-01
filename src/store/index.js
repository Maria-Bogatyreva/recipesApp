import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from '../features/recipes/_recipesSlice.js'
import productsReducer from '../features/products/_productsSlice.js'

const preloadedState = {
  recipes: { // Пользовательские рецепты
    list: [
      {
        id: '1',
        name: "Паста Карбонара",
        ingredients: ["Макароны", "Яйца", "Пармезан", "Бекон"],
        steps: ["Варим макароны", "Готовим соус", "Смешиваем"],
        favorite: false,
      },
      {
        id: '2',
        name: 'Окрошка',
        ingredients: ["Картошка", "Яйца", "Колбаса", "Огурцы", "Сметана", "Квас"],
        steps: ["Все порезать и смешать", "Добавить сметану", "Залить квасом"],
        favorite: false,
      }
    ],
    public: [], // Публичные рецепты из API
    loading: false,
    error: null
  },
  products: {
    list: [
      {
        id: '1',
        name: 'Яйца',
        quantity: 1,
        unit: 'шт'
      },
      {
        id: '2',
        name: 'Мука',
        quantity: 1,
        unit: 'кг'
      }
    ]
  }
};


const store = configureStore({
  preloadedState,
  reducer: {
    recipes: recipesReducer,
    products: productsReducer
  }
})

export default store;