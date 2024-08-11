import { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.css";
import comment from "../../../img/comment.png";
import plusInactive from "../../../img/plusInactive.png";
import plusActive from "../../../img/plusActive.png";
import reportActive from "../../../img/reportActive.png";
import reportInactive from "../../../img/reportInactive.png";
import eventApi from "../../../api/eventApi";
import { MyEvent } from "../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import CommentSection from "../../CommentSection";
import MediaSection from "../../MediaSection";
import { dateToString } from "../../../utils";
import Spinner from "../Spinner";
import { setIsCommentOpen } from "../../../store/slices/refSlice";
import { categories } from "../../../utils";
import trashcan from "../../../img/trashcan.png"
import edit from "../../../img/edit.png"
import { setRerender } from "../../../store/slices/rerenderSlice";

type MarkerProps = {
  markerData?: MyEvent;
  style?: CSSProperties;
  activeId?: string;
  id: string;
  onComment?: () => void;
};

const EventCard: React.FC<MarkerProps> = ({ id, activeId, style, markerData, onComment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const isCommentOpen = useSelector((state: RootState) => state.ref.isCommentOpen);
  const [event, setEvent] = useState<MyEvent>();
  const [pluses, setPluses] = useState<number>();
  const [reports, setReports] = useState<number>();
  const [isPlusClicked, setIsPlusClicked] = useState<boolean>(false);
  const [isReportClicked, setIsReportClicked] = useState<boolean>(false);

  useEffect(() => {
    if (activeId) {
      eventApi.getEventById(activeId)
        .then((data) => setEvent(data))
    } else if (markerData) {
      setEvent(markerData);
    }
  }, [activeId, markerData]);

  useEffect(() => {
    if (event) {
      setPluses(event.pluses.length);
      setReports(event.reports.length);
      setIsPlusClicked(event.pluses.includes(currentUser._id));
      setIsReportClicked(event.reports.includes(currentUser._id));
    }
  }, [event, currentUser._id]);

  const plusHandler = () => {
    if (isReportClicked) {
      reportHandler();
    }
    if (currentUser && event) {
      eventApi.plusEvent({ eventId: event._id, userId: currentUser._id });
    }
    if (pluses !== undefined) {
      setPluses(isPlusClicked ? pluses - 1 : pluses + 1);
      setIsPlusClicked(!isPlusClicked);
    }
  };

  const reportHandler = () => {
    if (isPlusClicked) {
      plusHandler();
    }
    if (currentUser && event) {
      eventApi.reportEvent({ eventId: event._id, userId: currentUser._id });
    }
    if (reports !== undefined) {
      setReports(isReportClicked ? reports - 1 : reports + 1);
      setIsReportClicked(!isReportClicked);
    }
  };

  const commentClickHandler = () => {
    if (onComment) {
      onComment();
    }
    if (style?.position === 'unset') {
      dispatch(setIsCommentOpen(isCommentOpen === id ? '' : id));
    } else {
      dispatch(setIsCommentOpen(id));
    }
  };

  const handleDelete = () => {
    if (event && currentUser._id !== '0') {
      if (event.userId === currentUser._id) {
        eventApi.deleteEvent({eventId: event._id})
          .finally(() => dispatch(setRerender()))
      }
    }
  }

  return (
    <div 
      id={id} 
      className={classes.EventCard} 
      style={style} 
      onMouseDown={(e) => e.stopPropagation()}  
    >
      {event ? (
        <>
          {currentUser._id !== '0' && event.userId === currentUser._id &&
            <div className={classes.currentUser}>
              <div>Это ваше событие</div>
              <div className={classes.buttonSection}>
                <button onClick={handleDelete}>
                  <img src={trashcan} alt="delete"/>
                </button>
              </div>
            </div>
          }
          <div className={classes.header}>
            <div className={classes.type}>
              <img
                className={classes.img}
                src={categories.find((category) => category.type === event.type)?.src}
                alt={categories.find((category) => category.type === event.type)?.type}
              />
              <p>{event.type}</p>
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
          {event.description ?
            <div className={classes.description}>{event.description}</div>
            :
            <div className={classes.hr}></div>
          } 

          <MediaSection eventId={event._id} position={style?.position} />
          <div className={classes.footer}>
            <p>@{event.name}</p>
            <div className={classes.buttons}>
              <button onClick={plusHandler}>
                <img className={classes.icon} src={isPlusClicked ? plusActive : plusInactive} alt="plus" />
              </button>
              <div style={{ marginLeft: '-3px', marginRight: '15px' }} className={classes.counter}>{pluses}</div>
              <button onClick={reportHandler}>
                <img style={{ marginTop: "2px" }} className={classes.icon} src={isReportClicked ? reportActive : reportInactive} alt="report" />
              </button>
              <div style={{ marginRight: '15px' }} className={classes.counter}>{reports}</div>
              <button onClick={commentClickHandler}>
                <img className={classes.icon} src={comment} alt="comment" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <Spinner position="unset" />
      )}
      {style?.position === 'unset' && isCommentOpen === id && event && (
        <CommentSection eventId={event._id} />
      )}
    </div>
  );
};

export default EventCard;
