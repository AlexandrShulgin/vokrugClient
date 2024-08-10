import classes from './index.module.css'
import { useState, useEffect } from "react";
import commentApi from "../../api/commentApi";
import { Comment, User } from "../../types/types";
import AddCommentForm from "../Forms/AddCommentForm"
import CommentCard from "../UI/СommentCard"
import Spinner from '../UI/Spinner';

type CommentSectionProps = {
  eventId: string
}

const CommentSection = ({ eventId }: CommentSectionProps) => {
  
  const [comments, setComments] = useState<Comment[]>()
  const [loading, setLoading] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    commentApi.getCommentByEvent(eventId)
      .then((data) => setComments(data))
      .finally(() => setLoading(false))
  }, [rerender])

  return (
    <div className={classes.CommentSection}>
      <AddCommentForm eventId={eventId} onRerender={() => setRerender(!rerender)}/>
        {comments ? 
          comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard comment={comment}/>
            </div>
        ))
          : <Spinner position='unset'/>
        }
    </div>
  )
}

export default CommentSection