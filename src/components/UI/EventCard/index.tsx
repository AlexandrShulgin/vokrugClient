import { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.css"
import comment from "../../../img/comment.png"
import plusInactive from "../../../img/plusInactive.png"
import plusActive from "../../../img/plusActive.png"
import reportActive from "../../../img/reportActive.png"
import reportInactive from "../../../img/reportInactive.png"
import eventApi from "../../../api/eventApi";
import { MyEvent } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type MarkerProps = {
  markerData?: MyEvent;
  style?: CSSProperties;
  activeId?: string
}

const EventCard: React.FC<MarkerProps> = ({ activeId, style, markerData }) => {
  
  const currentUser = useSelector((state: RootState) => state.user);
 
  const [event, setEvent] = useState<MyEvent>()
  const [pluses, setPluses] = useState<number>()
  const [reports, setReports] = useState<number>()
  const [isPlusClicked, setIsPlusClicked] = useState<boolean>()
  const [isReportClicked, setIsReportClicked] = useState<boolean>()

  useEffect(() => {
    if (activeId) {
      eventApi.getEventById(activeId)
      .then((data) => setEvent(data))
    } else if (markerData) {
      setEvent(markerData)
    }
  }, [])

  useEffect(() => {
    setPluses(event?.pluses.length)
    setReports(event?.reports.length)
    setIsPlusClicked(event?.pluses.find((item) => item === currentUser._id) ? true : false)
    setIsReportClicked(event?.reports.find((item) => item === currentUser._id) ? true : false)
  }, [event])

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
    if (isReportClicked) {
      reportHandler()
    }
    if (currentUser && event) {
      eventApi.plusEvent({ eventId: event._id, userId: currentUser._id})
    }
    if (pluses !== undefined) {
      if (isPlusClicked) {
        setPluses(pluses - 1)
        setIsPlusClicked(false)
      } else {
        setPluses(pluses + 1)
        setIsPlusClicked(true)
      }
    }
  }

  const reportHandler = () => {
    if (isPlusClicked) {
      plusHandler()
    }
    if (currentUser && event) {
      eventApi.reportEvent({ eventId: event._id, userId: currentUser._id})
    }
    if (reports !== undefined) {
      if (isReportClicked) {
        setReports(reports - 1)
        setIsReportClicked(false)
      } else {
        setReports(reports + 1)
        setIsReportClicked(true)
      }
    }
  }

  return (
    <div className={classes.EventCard} style={style} onMouseDown={(e) => e.stopPropagation()}>
      {event && <>
      <div className={classes.header}>
        <div className={classes.type}>
          <div className={classes.img}></div>
          <p>{event?.type}</p>
        </div>
        <div className={classes.date}>
          <p>{dateToString(event.createdAt)[0]}</p>
          <p>{dateToString(event.createdAt)[1]}</p>
        </div>
      </div>
      <div className={classes.address}>
        <div>{event.address.name.charAt(0).toUpperCase() + event.address.name.slice(1)}</div>
        <div>{event.address.description}</div>
      </div>
      <div className={classes.description}>{event.description}</div>
      <div className={classes.footer}>
        <p>@{event.name}</p>
        <div className={classes.buttons}>
          <button onClick={plusHandler}><img className={classes.icon} src={isPlusClicked ? plusActive : plusInactive} alt="plus"/></button>
          <div style={{marginLeft: '-3px', marginRight: '15px'}} className={classes.counter}>{pluses}</div>
          <button onClick={reportHandler}><img style={{marginTop: "2px"}} className={classes.icon} src={isReportClicked ? reportActive : reportInactive} alt="report"/></button>
          <div style={{marginRight: '15px'}} className={classes.counter}>{reports}</div>
          <button><img className={classes.icon} src={comment} alt="comment"/></button>
        </div>
      </div> </>}
    </div>
  )
}

export default EventCard
