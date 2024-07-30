import { YMapMarker } from 'ymap3-components'
import classes from './index.module.css'
import cross from '../../../img/cross.png'
import { LngLat } from '@yandex/ymaps3-types'
import EventCard from '../EventCard'

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
    _id: string;
  },
  onClick: () => void;
  activeId: string;
}

const MyMarker: React.FC<MarkerProps> = ({ markerData, onClick, activeId }) => {
  
  const cords: LngLat = [markerData.coordinates[0], markerData.coordinates[1]]
  const isActive = markerData._id === activeId

  return (
    <YMapMarker coordinates={cords} onClick={onClick} zIndex={isActive ? 999: 0}>
      <div className={classes.MyMarker}>
        {isActive ? 
          <EventCard markerData={markerData}/> :
          <div className={classes.head}>
            <div>{markerData.type}</div>
          </div>
        }
        <div className={classes.tail} style={{borderTop: isActive ? "8px solid #222327" : "8px solid #ff3333"}}></div>
        <div className={classes.point}></div>
      </div>
    </YMapMarker>
  )
}

export default MyMarker