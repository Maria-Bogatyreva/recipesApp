import {useSelector} from "react-redux";

export default function RecipeList() {
  const recipes = useSelector(state => {
    return state.recipes
  });

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
