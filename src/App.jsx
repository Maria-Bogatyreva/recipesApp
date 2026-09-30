import RecipeList from "./features/recipes/RecipeList.jsx";
import RecipeForm from "./features/recipes/RecipeForm.jsx";
import {useState} from "react";
import FavoriteRecipes from "./features/recipes/FavoriteRecipes.jsx";
import {useDispatch} from "react-redux";
import {resetApp} from "./store/actions.js";

function App() {
  const [editRecipeId, setEditRecipeId] = useState('');
  const [resetCount, setResetCount] = useState(0)
  const dispatch = useDispatch();
  const handleEditRecipe = (id) => {
    setEditRecipeId(id)
  }

  const handleResetApp = () => {
    dispatch(resetApp());
    setEditRecipeId(undefined);
    setResetCount(prev => prev + 1)
  }

  return (
    <>
      <h1>Конструктор рецептов</h1>
      <div className="recipes_block">
        <RecipeList onRecipeEdit={handleEditRecipe} editRecipeId={editRecipeId} />
        <FavoriteRecipes />
      </div>

      <RecipeForm key={editRecipeId || `new-${resetCount}`} editRecipeId={editRecipeId} onRecipeEdit={handleEditRecipe}/>

      <button onClick={handleResetApp}>СБРОСИТЬ ПРИЛОЖЕНИЕ</button>
    </>
  )
}

export default App
