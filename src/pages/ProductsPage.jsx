import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, selectProducts} from "../features/products/_productsSlice.js";
import ProductForm from "../features/products/ProductForm.jsx";



export default function ProductsPage() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  return (
    <>
      <Link to="/">Вернуться на главную</Link>
      <h1>Продукты</h1>
      {
        products.length ?
          <table>
            <thead>
            <tr>
              <th>Название</th>
              <th>Количество</th>
              <th>Ед</th>
            </tr>
            </thead>
            <tbody>
            {
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unit}</td>
                  <td>
                    <button onClick={() => dispatch(deleteProduct(product.id))}>Удалить</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>

          : <p>Продуктов нет</p>
      }
      <hr/>
      <ProductForm />
    </>
  )
}
