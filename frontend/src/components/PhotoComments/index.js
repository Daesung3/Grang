import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PhotoComments = props => (
  <div className={styles.comments}>
    <ul className={styles.list}>
      <Comment
        creator={props.creator}
        username={props.creator}
        comment={props.caption}
        natural_time={props.natural_time}
      />
      {props.comments.map(comment => (
        <Comment
          creator={props.creator}
          username={comment.creator.username}
          comment={comment.message}
          natural_time={comment.natural_time}
          key={comment.id}
        />
      ))}
    </ul>
  </div>
);

const Comment = props => (
  <li className={`${styles.comment} ${props.username === props.creator ? styles.me : ''}`}>
    <span className={styles.username}>{props.username}</span>
    <div className={styles.message}>
      <div className={styles.messageCaret}>
        <div className={styles.messageCaretOuter} />
        <div className={styles.messageCaretInner} />
      </div>
      <span className={styles.messageBody}>{props.comment}</span>
    </div>
    <span className={styles.natural_time}>{props.natural_time}</span>
  </li>
);

PhotoComments.propTypes = {
  caption: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  natural_time: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    //피드에서 보이는 댓글 부분
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      natural_time: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        propfile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default PhotoComments;
