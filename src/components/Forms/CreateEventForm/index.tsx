import { useEffect, useState } from 'react';
import MyTextarea from '../../UI/MyTextarea'
import classes from './index.module.css'
import MyButton from '../../UI/MyButton';
import axios from 'axios';
import eventApi from '../../../api/eventApi';
const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

type CreateEventFormProps = {
  cords: [number, number]
  onClose: () => void
};

interface Address {
  name: string,
  description: string,
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ cords, onClose }) => {

  const [address, setAddress] = useState<Address>({name: '', description: ''})
  const [type, setType] = useState<string>('')
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=b1d3c331-d2a1-40f1-84af-ef2371bf8057&geocode=${cords[0]},${cords[1]}&results=1&format=json`)
      .then((data) => setAddress(
        {
          name: data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name,
          description: data.data.response.GeoObjectCollection.featureMember[0].GeoObject.description
        }
      ))
  }, [cords])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    eventApi.createEvent({
      type: type,
      description: description,
      coordinates: cords,
      address: address,
      userId: 1
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.CreateEventForm}>
        <h1>Добавить новое событие</h1>
        <div className={classes.address}>
          <p className={classes.street}>{address?.name}</p>
          <p className={classes.globalAddress}>{address?.description}</p>
        </div>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <div key={index} className={classes.categoryItem}>
              <div  
                className={classes.categoryIcon}
                onClick={() => setType(category.toString())}
                style={type === category.toString() ? {outline: '3px solid white'} : {}}
                >
                {category}
              </div>
              <p className={classes.categoryTitle}>{category}</p>
            </div>
          ))}
        </div>
        <MyTextarea
          placeholder='Опишите событие (необязательно)'
          value={description}
          onChange={setDescription}
          />
        <MyButton 
          width='100%'
          height='35px'
          type='submit'
          >

          Подтвердить
        </MyButton>
      </div>
    </form>
  )
}

export default CreateEventForm