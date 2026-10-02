import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPublicRecipes, selectPublicRecipes} from "../features/recipes/_recipesSlice.js";

export default function PublicRecipesPage() {
  const publicRecipes = useSelector(selectPublicRecipes);
  const loading = useSelector(state => state.recipes.loading)
  const error = useSelector(state => state.recipes.error)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useeffect')
      dispatch(fetchPublicRecipes())
  }, [dispatch]);

  if(loading) {
    return <div>Загрузка...</div>
  }
  if(error) {
    return <div>Что-то пошло не так.</div>
  }
  return (
    <>
      <Link to="/">Вернуться на главную</Link>
      <h1>Public Recipes</h1>
      {
        publicRecipes.map(recipe => (
          <div key={recipe.id}>
            <img width="80" src={recipe.image} alt=""/>
            {recipe.title}
          </div>
        ))
      }

    </>
  )
}
