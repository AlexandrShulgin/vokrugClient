import classes from './index.module.css'
import { useState, useEffect } from "react";
import commentApi from "../../api/commentApi";
import { User } from "../../types/types";
import AddCommentForm from "../Forms/AddCommentForm"
import CommentCard from "../UI/СommentCard"

interface Comment {
  _id: string;
  author: User;
  event: string;
  text: string;
  createdAt: string
}

type CommentSectionProps = {
  eventId: string
}

const CommentSection = ({ eventId }: CommentSectionProps) => {
  
  const [comments, setComments] = useState<Comment[]>()

  useEffect(() => {
    commentApi.getCommentByEvent(eventId)
      .then((data) => setComments(data))
  }, [])

  return (
    <div className={classes.CommentSection}>
      <AddCommentForm eventId={eventId}/>
        {comments && comments.map((comment) => (
          <div key={comment._id}>
            <CommentCard comment={comment}/>
          </div>
        ))}
    </div>
  )
}

export default CommentSection