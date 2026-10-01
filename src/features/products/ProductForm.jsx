import {useState} from "react";
import {useDispatch} from "react-redux";
import {addProduct} from "./_productsSlice.js";
import {nanoid} from "@reduxjs/toolkit";

const initialFormData = {
  name: "",
  quantity: "",
  unit: "",
}

export default function ProductForm() {
  const [formData, setFormData] = useState(initialFormData);
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
      && data.quantity.trim() > 0

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm(formData)) {
      dispatch(addProduct(
        {
          id: nanoid(),
          name: formData.name.trim(),
          quantity: Number(formData.quantity),
          unit: formData.unit.trim()
        }
      ))
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
        <button type="submit">Добавить продукт</button>
      </form>
    </>
  )
}
