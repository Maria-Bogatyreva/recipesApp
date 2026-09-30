import {useState} from "react";
import {addRecipe, selectListRecipes, updateRecipe} from "./_recipesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";

const initialFormData = {
  name: "",
  ingredients: [''],
  steps: [''],
  favorite: false,
}

// если есть рецепт для редактирования - возвращает его (без мутации!), если нет - пустое
const getInitialFormData = (recipe) => {
  if (!recipe) {
    return initialFormData
  } else {
    return {
      name: recipe.name,
      ingredients: [...recipe.ingredients],
      steps: [...recipe.steps],
    }
  }
}
export default function RecipeForm({editRecipeId, onRecipeEdit}) {
  const recipes = useSelector(selectListRecipes);
  const editRecipe = recipes.find(recipe => recipe.id === editRecipeId);

  // Ленивая инициализация state
  const [formData, setFormData] = useState(() => getInitialFormData(editRecipe));
  const dispatch = useDispatch();

  const handleChangeForm = (key, index, value) => {
    switch (key) {
      case 'name':
        setFormData(prev => (
          {
            ...prev,
            name: value
          }
        ))
        break;
      default:
        setFormData(prev => {
          const updatedElements = prev[key].map((el, i) => {
            if (i === index) {
              return value
            }
            return el
          })

          return {
            ...prev,
            [key]: updatedElements
          }
        })
    }
  }

  const handleAddElement = (key) => {
    setFormData(prevState => {
        return {
          ...prevState,
          [key]: [...prevState[key], '']
        }
      }
    )
  }

  const isValidForm = (data) => {
    return data.name.trim().length > 0
      && data.ingredients.some(i => i.trim().length > 0)
      && data.steps.some(s => s.trim().length > 0)
  }

  // Функция для очистки введенных данных
  const prepareRecipeData = (data) => {
    return {
      ...data,
      name: data.name.trim(),
      ingredients: data.ingredients.map(i => i.trim()).filter(i => i.length > 0),
      steps: data.steps.map(s => s.trim()).filter(i => i.length > 0)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFormData = prepareRecipeData(formData);
    if (isValidForm(cleanFormData)) {
      if (!editRecipeId) {
        // сохранение нового рецепта
        dispatch(addRecipe({
          id: nanoid(),
          ...cleanFormData
        }))
        console.log('Рецепт успешно добавлен!')
      } else {
        // редактирование
        dispatch(updateRecipe({
          id: editRecipeId,
          favorite: editRecipe.favorite,
          ...cleanFormData
        }))
        console.log('Рецепт успешно отредактирован!')
      }

      onRecipeEdit(undefined)
      setFormData(initialFormData); // очистка после добавления/редактирования

    } else {
      alert('Заполните все поля!')
    }
  }

  return (
    <>
      <h2>Добавить новый рецепт</h2>
      <form className="recipeForm" onSubmit={handleSubmit}>
        <div className="recipeForm_group">
          <span>Введите название</span>
          <input name="name" type="text" value={formData.name}
                 onChange={(e) => handleChangeForm('name', '', e.target.value)}/>
        </div>
        <div className="recipeForm_group">
          <span>Добавьте ингредиенты</span>
          <div className="ingredients">
            {
              formData.ingredients.map((ingredient, index) => {
                return <input key={index} type="text"
                              value={ingredient}
                              onChange={e => handleChangeForm('ingredients', index, e.target.value)}/>
              })
            }
          </div>
          <button type='button' onClick={() => handleAddElement('ingredients')} className="recipeForm_btn">Добавить
            ингредиент
          </button>
        </div>

        <div className="recipeForm_group">
          <span>Опишите шаги</span>
          <div className="steps">
            {
              formData.steps.map((step, index) => {
                return <input key={index} type="text"
                              value={step}
                              onChange={e => handleChangeForm('steps', index, e.target.value)}/>
              })
            }
          </div>
          <button type='button' onClick={() => handleAddElement('steps')} className="recipeForm_btn">Добавить шаг
          </button>
        </div>

        <div>
          {editRecipeId && <button type="button" onClick={()=>onRecipeEdit(undefined)}>Отменить редактирование</button>}
          &nbsp;
          <button type="submit">Сохранить рецепт</button>
        </div>


      </form>
    </>

  )
}
