import { useEffect, useState, useCallback } from 'react';
import classes from './index.module.css';
import mediaApi from '../../api/mediaApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setIsSidebarOpen } from '../../store/slices/refSlice';
import Spinner from '../UI/Spinner';

type MediaSectionProps = {
  eventId: string;
  position: string | undefined;
}

interface Media {
  _id: string;
  media: string[];
}

const MediaSection = ({ eventId, position }: MediaSectionProps) => {
  const [isMediaOpen, setIsMediaOpen] = useState<boolean>(false);
  const [media, setMedia] = useState<Media[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const sidebarRef = useSelector((state: RootState) => state.ref);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMediaOpen) {
      setLoading(true);
      mediaApi.getMediaByEvent(eventId)
        .then((data) => setMedia(data))
        .catch(() => setError('Не удалось загрузить медиафайлы. Попробуйте еще раз.'))
        .finally(() => setLoading(false));
    }
  }, [isMediaOpen, eventId]);

  const mediaContent = useCallback(() => {
    if (position !== 'unset' || !isMediaOpen) return null;

    if (loading) return <Spinner position='unset' />;
    if (error) return <div>{error}</div>;
    if (!media || media.length === 0) return <div>Медиафайлы не найдены</div>;

    const urls: string[] = media.flatMap(item => item.media);

    return (
      <div className={classes.content}>
        {urls.map((url) =>
          url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
            <img src={url} alt="media" className={classes.image} key={url} />
          ) : (
            <video src={url} controls autoPlay={false} className={classes.video} key={url} />
          )
        )}
      </div>
    );
  }, [loading, error, media, isMediaOpen, position]);

  const mediaButtonHandler = useCallback(() => {
    if (position === 'unset') {
      setIsMediaOpen(prevState => !prevState);
    } else {
      dispatch(setIsSidebarOpen(true));
      const element = document.getElementById(eventId);
      if (element && sidebarRef.current) {
        sidebarRef.current.scrollTo({
          top: element.offsetTop,
        });
      }
    }
  }, [dispatch, eventId, position, sidebarRef]);

  return (
    <div className={classes.MediaSection}>
      <button 
        onClick={mediaButtonHandler} 
        className={classes.mediaButton}
        aria-expanded={isMediaOpen}
        aria-controls="media-content"
      >
        Медиа
      </button>
      <div id="media-content">
        {mediaContent()}
      </div>
    </div>
  );
}

export default MediaSection;
