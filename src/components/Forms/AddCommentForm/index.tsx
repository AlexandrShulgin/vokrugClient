import { useState } from 'react';
import MyTextarea from '../../UI/MyTextarea';
import classes from './index.module.css';
import commentApi from '../../../api/commentApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import clip from '../../../img/clip.png'
interface CommentProps {
  eventId: string;
}

const AddCommentForm = ({ eventId }: CommentProps) => {
  const [comment, setComment] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);

  const currentUser = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      try {
        if (media) {
          await commentApi.createComment({authorId: currentUser._id, eventId, text: comment, media});
        } else {
          await commentApi.createComment({authorId: currentUser._id, eventId, text: comment});
        }
        setComment('');
        setMedia(null);
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
      }
    }
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.AddCommentForm}>
        <p className={classes.comment}>Оставить комментарий</p>
        <MyTextarea
          value={comment}
          onChange={setComment}
          placeholder='Комментарий...'
          style={{ height: '100px' }}
        />
        <div className={classes.uploadSection}>
          <label htmlFor="file-upload" className={classes.file}>
            <p className={classes.toUpload}>Прикрепить фото/видео</p>
            <img className={classes.upload} src={clip} alt='upload'/>
          </label>
          <div className={classes.filenames}>
            <div>{media?.name}</div>
          </div>
        </div>
        <input id="file-upload" type="file" accept="image/*,video/*" onChange={handleMediaChange} />
        
        <button className={classes.submit} type='submit'>Отправить</button>
      </div>
    </form>
  )
}

export default AddCommentForm;
