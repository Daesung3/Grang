import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PhotoComments = props => (
    <div className={styles.comments}>
        <ul className={styles.list}>
            <Comment username={props.creator} comment={props.caption} />
            {props.comments.map(comment => (
                <Comment username={comment.creator.username} comment={comment.message} natural_time={comment.natural_time} key={comment.id} />
            ))}
        </ul>
    </div>
);

const Comment = props => (
    <li className={styles.comment}>
        <span className={styles.username}>{props.username}</span>
        <span className={styles.message}>{props.comment}</span>
        <span className={styles.natural_time}>{props.natural_time}</span>
    </li>
)

PhotoComments.propTypes = {
    caption: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf( //피드에서 보이는 댓글 부분
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