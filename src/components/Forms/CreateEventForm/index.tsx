import React, { useEffect, useState } from 'react';
import MyTextarea from '../../UI/MyTextarea';
import classes from './index.module.css';
import MyButton from '../../UI/MyButton';
import axios from 'axios';
import eventApi from '../../../api/eventApi';
import { categories } from '../../../utils';

type CreateEventFormProps = {
  cords: [number, number];
  onClose: () => void;
  id?: string;
  name?: string;
};

interface Address {
  name: string;
  description: string;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ cords, onClose, id, name }) => {
  const [address, setAddress] = useState<Address>({ name: '', description: '' });
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [media, setMedia] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://geocode-maps.yandex.ru/1.x/?apikey=b1d3c331-d2a1-40f1-84af-ef2371bf8057&geocode=${cords[0]},${cords[1]}&results=1&format=json`)
      .then((response) => {
        const geoObject = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
        setAddress({
          name: geoObject.name,
          description: geoObject.description,
        });
      })
      .catch(() => {
        setError("Не удалось получить данные о местоположении.");
      });
  }, [cords]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!type) {
      setError("Пожалуйста, выберите категорию события.");
      return;
    }

    try {
      await eventApi.createEvent({
        type,
        description,
        coordinates: cords,
        address,
        userId: id || '0',
        name: name || 'anonym',
        media,
      });
      onClose();
    } catch (error) {
      setError("Ошибка при создании события. Попробуйте еще раз.");
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia([...media, ...Array.from(e.target.files)]);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className={classes.CreateEventForm}>
        <h1>Добавить новое событие</h1>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.address}>
          <p className={classes.street}>{address.name}</p>
          <p className={classes.globalAddress}>{address.description}</p>
        </div>
        <div className={classes.categories}>
          {categories.map((category) => (
            <div key={category.type} className={classes.categoryItem}>
              <div
                className={classes.categoryIcon}
                onClick={() => setType(category.type.toString())}
                style={type === category.type.toString() ? { outline: '3px solid white' } : {}}
              >
                <img src={category.src} alt={category.type} className={classes.categoryImg} />
              </div>
              <p className={classes.categoryTitle}>{category.type}</p>
            </div>
          ))}
        </div>
        <MyTextarea
          placeholder='Опишите событие (необязательно)'
          value={description}
          onChange={setDescription}
        />
        <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} />
        
        <MyButton width='100%' height='35px' type='submit'>
          Подтвердить
        </MyButton>
      </div>
    </form>
  );
};

export default CreateEventForm;
