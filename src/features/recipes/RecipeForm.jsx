import {useState} from "react";

const initialFormData = {
  name: "",
  ingredients: [''],
  steps: [''],
  favorite: false,
}
export default function RecipeForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (name, value) => {
    switch (name) {
      case 'name':
        setFormData(prev => (
          {
            ...prev,
            name: value
          }
        ))
        break;
    }
  }

  const handleChangeElement = (key, index, value) => {
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

  const handleAddElement = (key) => {
    setFormData(prevState => {
        return {
          ...prevState,
          [key]: [...prevState[key], '']
        }
      }
    )
  }


  return (
    <>
      <h2>Добавить новый рецепт</h2>
      <form className="recipeForm">
        <div className="recipeForm_group">
          <span>Введите название</span>
          <input name="name" type="text" value={formData.name}
                 onChange={(e) => handleChangeForm('name', e.target.value)}/>
        </div>
        <div className="recipeForm_group">
          <span>Добавьте ингредиенты</span>
          <div className="ingredients">
            {
              formData.ingredients.map((ingredient, index) => {
                return <input key={index} type="text"
                              value={ingredient}
                              onChange={e => handleChangeElement('ingredients', index, e.target.value)}/>
              })
            }
          </div>
          <button type='button' onClick={() => handleAddElement('ingredients')} className="recipeForm_btn">Добавить ингредиент</button>
        </div>

        <div className="recipeForm_group">
          <span>Опишите шаги</span>
          <div className="steps">
            {
              formData.steps.map((step, index) => {
                return <input key={index} type="text"
                              value={step}
                              onChange={e => handleChangeElement('steps', index, e.target.value)}/>
              })
            }
          </div>
          <button type='button' onClick={() => handleAddElement('steps')} className="recipeForm_btn">Добавить шаг</button>
        </div>
      </form>
    </>

  )
}
