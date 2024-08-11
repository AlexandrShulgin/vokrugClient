import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { User } from '../../../types/types'
import { dateToString, HOST } from '../../../utils'
import classes from './index.module.css'
import trashcan from '../../../img/trashcangray.png'
const CommentCard = ({comment}: any) => {
  
  const handleDelete = () => {

  }

  const currentUser = useSelector((state: RootState) => state.user);
  console.log(comment)
  return (
    <div className={classes.CommentCard}>
      <div className={classes.line}></div>
      <div className={classes.content}>
        <div className={classes.header}>
          <img className={classes.img} src={`https://avatars.yandex.net/get-yapic/${comment.author.avatar_id}/islands-34`} alt='avatar'/>
          <div className={classes.userInfo}>
            <div className={classes.userName}>
              {comment.author.display_name}
            </div>
            <div className={classes.userMail}>
              {comment.author.email}
            </div>
          </div>
        </div>
        <div className={classes.text}>
          {comment.text}
        </div>
        {comment.media.length !== 0 && comment.media[0] !== "" &&
          <div className={classes.media}>
            {comment.media[0].match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={`${HOST}/${comment.media[0]}`} alt={'media'} className={classes.image}/>
              ) : (
                <video src={`${HOST}/${comment.media[0]}`} controls autoPlay={false} className={classes.video}/>
              )}
          </div>
        }
        <div className={classes.footer}>
          <div className={classes.date}>
            {`${dateToString(comment.createdAt)[0]}/${dateToString(comment.createdAt)[1]}`}
          </div>
          <button className={classes.delete} onClick={handleDelete}>
            <img src={trashcan} alt='delete'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentCard