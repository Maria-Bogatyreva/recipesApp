import RecipeList from "./features/recipes/RecipeList.jsx";
import RecipeForm from "./features/recipes/RecipeForm.jsx";
import {useState} from "react";

function App() {
  const [editRecipeId, setEditRecipeId] = useState();
  console.log('edit', editRecipeId);
  const handleEditRecipe = (id) => {

    setEditRecipeId(id)
  }

  return (
    <>
      <h1>Конструктор рецептов</h1>
      <RecipeList onRecipeEdit={handleEditRecipe}/>
      <RecipeForm recipeId={editRecipeId}/>
    </>
  )
}

export default App
