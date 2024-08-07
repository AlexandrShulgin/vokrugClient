import { CSSProperties, useEffect, useRef, useState } from "react";
import classes from "./index.module.css"
import comment from "../../../img/comment.png"
import plusInactive from "../../../img/plusInactive.png"
import plusActive from "../../../img/plusActive.png"
import reportActive from "../../../img/reportActive.png"
import reportInactive from "../../../img/reportInactive.png"
import eventApi from "../../../api/eventApi";
import { MyEvent, User } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CommentCard from "../СommentCard";
import AddCommentForm from "../../Forms/AddCommentForm";
import { useDispatch } from "react-redux";
import { setIsCommentOpen } from "../../../store/slices/refSlice";
import commentApi from '../../../api/commentApi';
import CommentSection from "../../CommentSection";
import { dateToString } from "../../../utils";

type MarkerProps = {
  markerData?: MyEvent;
  style?: CSSProperties;
  activeId?: string;
  id: string
  onComment?: () => void
}

interface Comment {
  _id: string;
  author: User;
  event: string;
  text: string;
  createdAt: string
}

const EventCard: React.FC<MarkerProps> = ({id, activeId, style, markerData, onComment }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.user);
  const isCommentOpen = useSelector((state: RootState) => state.ref.isCommentOpen)
  const [event, setEvent] = useState<MyEvent>()
  const [pluses, setPluses] = useState<number>()
  const [reports, setReports] = useState<number>()
  const [isPlusClicked, setIsPlusClicked] = useState<boolean>()
  const [isReportClicked, setIsReportClicked] = useState<boolean>()
  const [rerender, setRerender] = useState<boolean>(false)

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

  const commentClickHandler = () => {
    if (onComment) {
      onComment()
    }
    if (style?.position === 'unset') {
      if (isCommentOpen === id) {
        dispatch(setIsCommentOpen(''))
      } else {
        dispatch(setIsCommentOpen(id))
      }
    } else {
      dispatch(setIsCommentOpen(id))
    }
    
  }

  return (
    <div id={id} className={classes.EventCard} style={style} onMouseDown={(e) => e.stopPropagation()}>
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
          <button onClick={plusHandler}>
            <img className={classes.icon} src={isPlusClicked ? plusActive : plusInactive} alt="plus"/>
          </button>
          <div style={{marginLeft: '-3px', marginRight: '15px'}} className={classes.counter}>{pluses}</div>

          <button onClick={reportHandler}>
            <img style={{marginTop: "2px"}} className={classes.icon} src={isReportClicked ? reportActive : reportInactive} alt="report"/>
          </button>
          <div style={{marginRight: '15px'}} className={classes.counter}>{reports}</div>
          
          <button onClick={commentClickHandler}>
            <img className={classes.icon} src={comment} alt="comment"/>
          </button>
        </div>
      </div> </>}
      {style?.position === 'unset' && isCommentOpen === id && event &&
        <CommentSection eventId={event._id}/>
      }
    </div>
  )
}

export default EventCard
