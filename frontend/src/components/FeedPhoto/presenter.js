import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import PhotoActions from "components/PhotoActions";
import PhotoComments from "components/PhotoComments";
import CommentBox from "components/CommentBox";
import DetailFeedPhoto from "components/DetailFeedPhoto";

const FeedPhoto = (props, context) => {
  return (
    <div className={styles.feedPhoto}>
      <div className={styles.mainImage}>
        <img className={styles.file} src={props.file} alt={props.caption} />
      </div>
      <div className={styles.mainChat}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <img
              src={props.creator.profile_image || require("images/noPhoto.png")}
              alt="a"
              className={styles.image}
            />
            <div>
              <div className={styles.userName}>{props.creator.username}</div>
              <div className={styles.userLocation}>{props.location}</div>
            </div>
          </div>
          <div className={styles.cock}>
            <PhotoActions
              number={props.like_count}
              isLiked={props.is_liked}
              photoId={props.id}
              openLikes={props.openLikes}
            />
          </div>
        </header>
        <div className={styles.meta}>
          <PhotoComments
            natural_time={props.natural_time}
            caption={props.caption}
            creator={props.creator.username}
            comments={props.comments}
          />
        </div>
        <div className={styles.commentBox}>
          <CommentBox photoId={props.id} />
        </div>
        {props.seeingDetail && (
          <DetailFeedPhoto closeDetail={props.closeDetail} />
        )}
      </div>
    </div>
  );
};

FeedPhoto.contextTypes = {
  t: PropTypes.func.isRequired
};

FeedPhoto.propTypes = {
  creator: PropTypes.shape({
    propfile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    //피드에서 보이는 댓글 부분
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        propfile_image: PropTypes.string,
        username: PropTypes.string.isRequired,
        name: PropTypes.string
      }).isRequired
    })
  ).isRequired,
  natural_time: PropTypes.string.isRequired,
  is_liked: PropTypes.bool.isRequired,
  seeingLikes: PropTypes.bool.isRequired,
  closeLikes: PropTypes.func.isRequired,
  openLikes: PropTypes.func.isRequired,
  seeingDetail: PropTypes.bool.isRequired,
  openDetail: PropTypes.func.isRequired,
  closeDetail: PropTypes.func.isRequired
};

export default FeedPhoto;
