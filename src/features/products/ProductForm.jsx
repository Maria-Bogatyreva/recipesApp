import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, selectProducts, updateProduct} from "./_productsSlice.js";
import {nanoid} from "@reduxjs/toolkit";

const initialFormData = {
  name: "",
  quantity: "",
  unit: "",
}

// если есть продукт для редактирования - возвращает его (без мутации!), если нет - пустое
const getInitialFormData = (product) => {
  if (!product) {
    return initialFormData
  } else {
    return {
      name: product.name,
      quantity: product.quantity,
      unit: product.unit
    }
  }
}

export default function ProductForm({editProductId, onProductEdit}) {
  const products = useSelector(selectProducts);
  const editProduct = products.find(p => p.id === editProductId);


  const [formData, setFormData] = useState(() => getInitialFormData(editProduct));
  const dispatch = useDispatch();

  const handleChangeForm = (key, value) => {
    setFormData(prev => (
      {
        ...prev,
        [key]: value
      }
    ))
  }

  const isValidForm = (data) => {
    return data.name.trim().length > 0
      && data.unit.trim().length > 0
      && data.quantity > 0

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm(formData)) {
      if  (!editProductId) {
        // сохранение нового продукта
        dispatch(addProduct(
          {
            id: nanoid(),
            name: formData.name.trim(),
            quantity: Number(formData.quantity),
            unit: formData.unit.trim()
          }
        ))
        console.log('Продукт успешно добавлен!')

      } else {
        dispatch(updateProduct({
          id: editProductId,
          name: formData.name.trim(),
          quantity: Number(formData.quantity),
          unit: formData.unit.trim()
        }))
        console.log('Продукт успешно отредактирован!')

      }

      onProductEdit(undefined)
      setFormData(initialFormData)
    } else {
      alert('Заполните все поля!')
    }
  }
  return (
    <>
      <h2>Добавить новый продукт</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData.name} onChange={(e) => handleChangeForm('name', e.target.value)} name="name"
               placeholder="Название"/>
        <br/>
        <input type="number" value={formData.quantity} onChange={(e) => handleChangeForm('quantity', e.target.value)}
               name="quantity" placeholder="Количество"/>
        <br/>
        <input type="text" value={formData.unit} onChange={(e) => handleChangeForm('unit', e.target.value)} name="unit"
               placeholder="Eдиница измерения"/>
        <br/>
        {editProductId && <button type="button" onClick={()=>onProductEdit(undefined)}>Отменить редактирование</button>}
        &nbsp;
        <button type="submit">Сохранить</button>
      </form>
    </>
  )
}
