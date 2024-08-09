import classes from './index.module.css';
import { useState, useEffect } from "react";
import commentApi from "../../api/commentApi";
import { Comment } from "../../types/types";
import AddCommentForm from "../Forms/AddCommentForm";
import CommentCard from "../UI/СommentCard";
import Spinner from '../UI/Spinner';

type CommentSectionProps = {
  eventId: string;
}

const CommentSection = ({ eventId }: CommentSectionProps) => {
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    commentApi.getCommentByEvent(eventId)
      .then((data) => {
        if (data?.success) {
          setComments(data.comments);
        } else {
          setError("Не удалось загрузить комментарии.");
        }
      })
      .catch(() => {
        setError("Произошла ошибка при загрузке комментариев.");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  return (
    <div className={classes.CommentSection}>
      <AddCommentForm eventId={eventId} />
      {loading ? (
        <Spinner position='unset' />
      ) : error ? (
        <div className={classes.ErrorMessage}>{error}</div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
          </div>
        ))
      )}
    </div>
  );
}

export default CommentSection;
