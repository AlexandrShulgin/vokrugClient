import { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.css"
import comment from "../../../img/comment.png"
import plus from "../../../img/plus.png"
import report from "../../../img/report.png"
import eventApi from "../../../api/eventApi";
import { MyEvent } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type MarkerProps = {
  markerData: MyEvent;
  style?: CSSProperties;
}

const EventCard: React.FC<MarkerProps> = ({ markerData, style }) => {
  
  const currentUser = useSelector((state: RootState) => state.user);
 
  const [pluses, setPluses] = useState<number>(markerData.pluses.length)
  const [reports, setReports] = useState<number>(markerData.reports.length)

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
  
  const plusHandler = () => {
    if (currentUser) {
      eventApi.plusEvent({ eventId: markerData._id, userId: currentUser._id})
        .then(() => setPluses(pluses + 1))
    }
  }

  const reportHandler = () => {
    if (currentUser) {
      eventApi.reportEvent({ eventId: markerData._id, userId: currentUser._id})
        .then(() => setReports(reports + 1))
    }
  }

  return (
    <div className={classes.EventCard} style={style} onMouseDown={(e) => e.stopPropagation()}>
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
          <button onClick={plusHandler}><img className={classes.icon} src={plus} alt="plus"/></button>
          <div style={{marginLeft: '-3px', marginRight: '15px'}} className={classes.counter}>{pluses}</div>
          <button onClick={reportHandler}><img style={{marginTop: "2px"}} className={classes.icon} src={report} alt="report"/></button>
          <div style={{marginRight: '15px'}} className={classes.counter}>{reports}</div>
          <button><img className={classes.icon} src={comment} alt="comment"/></button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
