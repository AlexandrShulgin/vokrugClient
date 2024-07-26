import { YMapMarker } from 'ymap3-components'
import classes from './index.module.css'
import cross from '../../../img/cross.png'

const MyMarker = () => {
  return (
    <YMapMarker coordinates={[37.95, 55.65]}>
      <div className={classes.MyMarker}>
        <div className={classes.head}>
          <img className={classes.img} src={cross}/>
        </div>
        <div className={classes.tail}></div>
        <div className={classes.point}></div>
      </div>
    </YMapMarker>
  )
}

export default MyMarker