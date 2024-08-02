import { CSSProperties } from "react";
import classes from "./index.module.css"

type MarkerProps = {
  markerData: {
    address: {
      name: string,
      description: string
    };
    coordinates: [number, number];
    createdAt: Date;
    description: string;
    rating: number;
    time: number;
    type: string;
    userId: number;
    name: string;
    _id: string;
  },
  style?: CSSProperties
}

const EventCard: React.FC<MarkerProps> = ({ markerData, style }) => {
  
  const dateToString = (date: Date) => {
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
  
  return (
    <div className={classes.EventCard} style={style}>
      <div className={classes.header}>
        <div className={classes.type}>
          <div className={classes.img}></div>
          <p>{markerData.type}</p>
        </div>
        <div className={classes.date}>
          <p>{dateToString(markerData.createdAt)[0]}</p>
          <p>{dateToString(markerData.createdAt)[1]}</p>
        </div>
      </div>
      <div className={classes.address}>
        <div>{markerData.address.name.charAt(0).toUpperCase() + markerData.address.name.slice(1)}</div>
        <div>{markerData.address.description}</div>
      </div>
      <div className={classes.description}>{markerData.description}</div>
      <div className={classes.footer}>
        <p>@{markerData.name}</p>
        <div className={classes.buttons}>
          <button>+</button>
          <button>-</button>
          <button>=</button>
        </div>
      </div>
    </div>
  )
}

export default EventCard