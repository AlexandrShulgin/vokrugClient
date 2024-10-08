import fire from './img/fire.png'
import concert from './img/concert.png'
import culture from './img/culture.png'
import danger from './img/danger.png'
import explosion from './img/explosion.png'
import flooding from './img/flooding.png'
import gunfire from './img/gunfire.png'
import party from './img/party.png'
import sports from './img/sports.png'
import stray from './img/stray.png'
import tornado from './img/tornado.png'

export const categories = [
  {
    type: 'Опасность',
    src: danger
  },
  {
    type: 'Взрыв',
    src: explosion
  },
  {
    type: 'Стрельба',
    src: gunfire
  },
  {
    type: 'Пожар',
    src: fire
  },
  {
    type: 'Затопление',
    src: flooding
  },
  {
    type: 'Ураган',
    src: tornado
  },
  {
    type: 'Бродячие животные',
    src: stray
  },
  {
    type: 'Вечеринка',
    src: party
  },
  {
    type: 'Выступление',
    src: concert
  },
  {
    type: 'Культурное мероприятие',
    src: culture
  },
  {
    type: 'Спортивное мероприятие',
    src: sports
  },
  
  
  
]
export const dateToString = (date: Date) => {
  const dateLocal = new Date(date)
  const dd = dateLocal.getDate() < 10 ? `0${dateLocal.getDate()}` : dateLocal.getDate() 
  const mm = dateLocal.getMonth() + 1 < 10 ? `0${dateLocal.getMonth() + 1}` : dateLocal.getMonth() + 1
  const yyyy = dateLocal.getFullYear()
  const hh = dateLocal.getHours() < 10 ? `0${dateLocal.getHours()}` : dateLocal.getHours()
  const mimi = dateLocal.getMinutes() < 10 ? `0${dateLocal.getMinutes()}` : dateLocal.getMinutes()
  const dd_mm_yyyy = `${dd}-${mm}-${yyyy}`
  const hh_mimi = `${hh}:${mimi}`
  return [dd_mm_yyyy, hh_mimi]
}

export const HOST = 'http://v101242.hosted-by-vdsina.com:5000'