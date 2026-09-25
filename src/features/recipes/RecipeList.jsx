import {useDispatch, useSelector} from "react-redux";
import {deleteRecipe} from "./recipesSlice.js";

export default function RecipeList({onRecipeEdit}) {
  const recipes = useSelector(state =>    state.recipes.recipes);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Список добавленных рецептов</h2>
      {recipes.length ?
        <ul>{
          recipes.map(recipe => (
            <li key={recipe.id}>
              <h3>Название: {recipe.name} </h3>
              <div><i>Количество шагов:</i> {recipe.steps.length}</div>
              <div><i>Количество ингредиентов:</i> {recipe.ingredients.length}</div>
              <div>
                <button onClick={()=>onRecipeEdit(recipe.id)}>Редактировать</button>
                &nbsp;
              < button onClick={() => dispatch(deleteRecipe(recipe.id))}>Удалить</button>
              </div>
                <br/>
            </li>
          ))
        }
        </ul>
        :
        <p>Рецептов пока нет</p>
      }
    </>
  )
}
