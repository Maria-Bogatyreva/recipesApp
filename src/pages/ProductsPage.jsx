import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, selectProducts} from "../features/products/_productsSlice.js";
import ProductForm from "../features/products/ProductForm.jsx";
import {useState} from "react";



export default function ProductsPage() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [editProductId, setEditProductId] = useState("");

  const handleEditProduct = (id) => {
    setEditProductId(id)
  }

  const handleDeleteProduct= (id) => {
    dispatch(deleteProduct(id));
    if(id === editProductId) {
      setEditProductId(undefined)
    }
  }

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
                    <button type="button" onClick={()=>setEditProductId(product.id)}>Редактировать</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
          : <p>Продуктов нет</p>
      }
      <hr/>
      <ProductForm key={editProductId}
                   editProductId={editProductId}
                   onProductEdit={handleEditProduct}/>
    </>
  )
}
