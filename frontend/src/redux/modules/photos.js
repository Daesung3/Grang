// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions 

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";

// action creators

function setFeed(feed){
    return {
        type: SET_FEED,
        feed
    };
}

function doLikePhoto(photoId){
    return {
        type: LIKE_PHOTO,
        photoId
    };
}

function doUnlikePhoto(photoId){
    return {
        type: UNLIKE_PHOTO,
        photoId
    };
}

function addComment(photoId, comment){
    return {
        type: ADD_COMMENT,
        photoId,
        comment
    };
}

// api actions

function getFeed() {
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/images/", {
            headers: {
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setFeed(json)));
    };
}

function likePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(doLikePhoto(photoId)); //즉각적인 반응을 주기 위해서
        const { user: {token }} = getState()
        fetch(`/images/${photoId}/likes/` , {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout())
            }else if (!response.ok){
                dispatch(doUnlikePhoto(photoId));
            }
        }); //image의 view를 확인해서 response값을 가져옴
    };
}

function unlikePhoto(photoId){
    return (dispatch, getState) => {
        dispatch(doUnlikePhoto(photoId)); //즉각적인 반응을 주기 위해서
        const { user: {token }} = getState()
        fetch(`/images/${photoId}/unlikes/` , {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout())
            }else if (!response.ok){
                dispatch(doLikePhoto(photoId));
            }
        }); //image의 view를 확인해서 response값을 가져옴
    };
}

function commentPhoto(photoId, message){
    return (dispatch, getState) => {
        const { user: {token }} = getState()
        fetch(`/images/${photoId}/comments/` , {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout())
            }
            return response.json();
        })
        .then(json => {
            if(json.message){
                dispatch(addComment(photoId, json));
            }
        });
    }
}
// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
    switch(action.type){
        case SET_FEED:
            return applySetFeed(state, action);
        case LIKE_PHOTO:
            return applyLikePhoto(state, action);
        case UNLIKE_PHOTO:
            return applyUnlikePhoto(state, action);
        case ADD_COMMENT:
            return applyAddComment(state, action);
        default:
        return state;
    }
}

// reducer functions

function applySetFeed(state, action){
    const { feed } = action;
    return {
        ...state,
        feed
    };
}

function applyLikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if(photo.id === photoId){
            return {...photo, is_liked: true, like_count: photo.like_count + 1} //사진의 모든 정보를 불러오고, is_liked항목을 override
        }
        return photo;
    });
    return { ...state, feed: updatedFeed }; // 이전의 feed + 새로 update된 피드
}

function applyUnlikePhoto(state, action){
    const { photoId } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if(photo.id === photoId){
            return {...photo, is_liked: false, like_count: photo.like_count - 1} //사진의 모든 정보를 불러오고, is_liked항목을 override
        }
        return photo;
    });
    return { ...state, feed: updatedFeed }; // 이전의 feed + 새로 update된 피드
}

function applyAddComment(state, action){ //새로고침 안해도 즉각적인 반응을 하는 것
    const { photoId, comment } = action;
    const { feed } = state;
    const updatedFeed = feed.map(photo => {
        if(photo.id === photoId){
            return {
                ...photo,
                comments: [...photo.comments, comment ] //이전 댓글 + 새 댓글
            }; 
        }
        return photo;
    });
    return { ...state, feed: updatedFeed }; 
    
}

// exports

const actionCreators = {
    getFeed,
    likePhoto,
    unlikePhoto,
    commentPhoto
}

export { actionCreators };

// default reducer export

export default reducer;