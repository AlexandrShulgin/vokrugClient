import { FC } from 'react';
import { Comment } from '../../../types/types';
import { dateToString } from '../../../utils';
import classes from './index.module.css';
import React from 'react';

type CommentCardProps = {
  comment: Comment;
};

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const { author, text, media, createdAt } = comment;
  const formattedDate = dateToString(createdAt);
  const mediaUrl = media.length > 0 ? media[0] : null;

  return (
    <div className={classes.CommentCard}>
      <div className={classes.line}></div>
      <div className={classes.content}>
        <div className={classes.header}>
          <img
            className={classes.img}
            src={`https://avatars.yandex.net/get-yapic/${author.avatar_id}/islands-34`}
            alt="avatar"
          />
          <div className={classes.userInfo}>
            <div className={classes.userName}>{author.display_name}</div>
            <div className={classes.userMail}>{author.email}</div>
          </div>
        </div>
        <div className={classes.text}>{text}</div>
        {mediaUrl && (
          <div className={classes.media}>
            {mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <img src={mediaUrl} alt="media" className={classes.image} />
            ) : (
              <video src={mediaUrl} controls autoPlay={false} className={classes.video} />
            )}
          </div>
        )}
        <div className={classes.footer}>
          <div className={classes.date}>{`${formattedDate[0]}/${formattedDate[1]}`}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentCard);
