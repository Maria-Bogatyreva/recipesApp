import {useSelector} from "react-redux";
import {selectListRecipes} from "./_recipesSlice.js";

export default function FavoriteRecipes() {
  const recipes = useSelector(selectListRecipes);
  const favoriteRecipes = recipes.filter(r => r.favorite)

  return (
    <div>
      {
        favoriteRecipes.length ?
        <>
          <h2>Избранное</h2>
          {favoriteRecipes.map(fav => <div key={fav.id}>{fav.name}</div>)}
        </>
          :
        <strong>Избранных рецептов пока нет</strong>
      }
    </div>
  )
}
