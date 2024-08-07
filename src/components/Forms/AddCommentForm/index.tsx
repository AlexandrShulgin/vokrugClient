import { useState } from 'react';
import MyTextarea from '../../UI/MyTextarea';
import classes from './index.module.css'
import eventApi from '../../../api/eventApi';
import commentApi from '../../../api/commentApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface CommentProps {
  eventId: string;
}

const AddCommentForm = ({ eventId }: CommentProps) => {
  const [comment, setComment] = useState<string>()

  const currentUser = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment) {
      commentApi.createComment({authorId: currentUser._id, eventId, text: comment})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.AddCommentForm}>
        <p className={classes.comment}>Оставить комменарий</p>
        <MyTextarea
          value={comment}
          onChange={setComment} 
          placeholder='Комментарий...' 
          style={{height: '100px'}}
          />
        <button className={classes.submit} type='submit'>Отправить</button>
      </div>
    </form>
  )
}

export default AddCommentForm;