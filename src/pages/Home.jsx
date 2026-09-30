import {Link} from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <ul className="nav-links">
        <li><Link to="/public-recipes">Публичные рецепты</Link></li>
        <li><Link to="/custom-recipes">Кастомные рецепты</Link></li>
        <li><Link to="/products">Продукты</Link></li>
      </ul>
    </>
  )
}
