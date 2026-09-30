import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import PublicRecipesPage from "./pages/PublicRecipesPage.jsx";
import CustomRecipesPage from "./pages/CustomRecipesPage.jsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/public-recipes',
    element: <PublicRecipesPage />
  },
  {
    path: '/custom-recipes',
    element: <CustomRecipesPage />
  },

])