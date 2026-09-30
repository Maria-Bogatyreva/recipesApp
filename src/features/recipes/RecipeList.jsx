import {useDispatch, useSelector} from "react-redux";
import {deleteRecipe, favoriteRecipe, selectListRecipes} from "./_recipesSlice.js";

export default function RecipeList({onRecipeEdit, editRecipeId}) {
  const recipes = useSelector(selectListRecipes);
  const dispatch = useDispatch();

  const handleDeleteRecipe = (id) => {
    dispatch(deleteRecipe(id));
    if(id === editRecipeId) {
      onRecipeEdit(undefined)
    }
  }

  return (
    <div>
      <h2>Список добавленных рецептов</h2>
      {recipes.length ?
        <ul>{
          recipes.map(recipe => (
            <li key={recipe.id}>
              <h3>Название: {recipe.name} </h3>
              <button type="button"
                      onClick={()=>dispatch(favoriteRecipe(recipe.id))}
                      aria-label={recipe.favorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
                {recipe.favorite ? '★' : '☆'}
              </button>
              <div><i>Количество шагов:</i> {recipe.steps.length}</div>
              <div><i>Количество ингредиентов:</i> {recipe.ingredients.length}</div>
              <div>
                <button onClick={()=>onRecipeEdit(recipe.id)}>Редактировать</button>
                &nbsp;
              < button onClick={() =>handleDeleteRecipe(recipe.id)}>Удалить</button>
              </div>
                <br/>
            </li>
          ))
        }
        </ul>
        :
        <p>Рецептов пока нет</p>
      }
    </div>
  )
}
