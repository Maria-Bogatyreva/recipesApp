import RecipeList from "./features/recipes/RecipeList.jsx";
import RecipeForm from "./features/recipes/RecipeForm.jsx";
import {useState} from "react";

function App() {
  const [editRecipeId, setEditRecipeId] = useState();
  const handleEditRecipe = (id) => {
    setEditRecipeId(id)
  }

  return (
    <>
      <h1>Конструктор рецептов</h1>
      <RecipeList onRecipeEdit={handleEditRecipe} editRecipeId={editRecipeId} />
      <RecipeForm key={editRecipeId || 'new'} editRecipeId={editRecipeId} onRecipeEdit={handleEditRecipe}/>
    </>
  )
}

export default App
