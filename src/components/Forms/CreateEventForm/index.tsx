import { useState } from 'react';
import MyTextarea from '../../UI/MyTextarea'
import classes from './index.module.css'
const categories = [
  {
    type: "danger",
    title: "Пожар" 
  },
  {
    type: "danger",
    title: "Стрельба",
  },
  {
    type: "safe",
    title: "Праздник"
  },
  {
    type: "safe",
    title: "Концерт"
  },
  {
    type: "danger",
    title: "Пожар" 
  },
  {
    type: "danger",
    title: "Стрельба",
  },
  {
    type: "safe",
    title: "Праздник"
  },
  {
    type: "safe",
    title: "Концерт"
  },
]
const CreateEventForm = () => {

  const [description, setDescription] = useState('');
  
  return (
    <form>
      <div className={classes.CreateEventForm}>
        <h1>Добавить новое событие</h1>
        <div className={classes.categories}>
          {categories.map((category) => (
            <div className={classes.categoryItem}>
              <div className={classes.categoryIcon}>

              </div>
              <p className={classes.categoryTitle}>{category.title}</p>
            </div>
          ))}
        </div>
        <MyTextarea
          placeholder='Опишите событие (необязательно)'
          value={description}
          onChange={setDescription}
          />
        <button type='submit'>Подтвердить</button>
      </div>
    </form>
  )
}

export default CreateEventForm