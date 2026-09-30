import {useSelector} from "react-redux";

export default function FavoriteRecipes() {
  const recipes = useSelector(state => state.recipes.recipes);
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
