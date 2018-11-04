import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";
import PhotoComments from "components/PhotoComments";
import TimeStamp from "components/TimeStamp";
import CommentBox from "components/CommentBox";

const DetailFeedPhoto = props => {
    console.log(props.loading);
    if(props.loading){
        return <LoadingDetail />
    } else {
        return (
        <div className={styles.feedPhoto}>
            <header className={styles.header}>
                <img
                    src={props.creator.propfile_image || require("images/noPhoto.png")}
                    alt={props.creator.username}
                    className={styles.image}
                />
                <div className={styles.headerColumn}>
                    <span>{props.creator.username}</span>
                    <span>{props.location}</span>
                </div>
            </header>
            <img src={props.file} alt={props.caption} />
            <div className={styles.meta}>
                <PhotoComments 
                    caption={props.caption}
                    creator={props.creator.username}
                    comments={props.comments}
                />
                <TimeStamp time={props.natural_time} />
                <CommentBox photoId={props.id}/>
            </div>
        </div>
        );
        };
        
}


const LoadingDetail = props => (
    
    <div><Loading /></div>
)

DetailFeedPhoto.propTypes = {
    loading: PropTypes.bool.isRequired,
    creator: PropTypes.shape({
        propfile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf( //피드에서 보이는 댓글 부분
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
    openLikes: PropTypes.func.isRequired
};

export default DetailFeedPhoto;