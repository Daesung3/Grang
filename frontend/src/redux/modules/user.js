// imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const SUBSCRIBE_USER = "SUBSCRIBE_USER";
const UNSUBSCRIBE_USER = "UNSUBSCRIBE_USER";
const GET_CATEGORY = "GET_CATEGORY";
const CHANEGE_CATEGORY = "CHANGE_CATEGORY";

// action creator 동기

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function setUserList(likes) {
  return {
    type: SET_USER_LIST,
    likes
  };
}

function setSubscribeUser(userId) {
  return {
    type: SUBSCRIBE_USER,
    userId
  };
}

function setUnsubscribeUser(userId) {
  return {
    type: UNSUBSCRIBE_USER,
    userId
  };
}

function setCategory(category) {
  return {
    type: GET_CATEGORY,
    category
  };
}

function setChangeCategory(category) {
  return {
    type: CHANEGE_CATEGORY,
    category
  };
}

// API actions 비동기

function facebookLogin(access_token) {
  return function(dispatch) {
    fetch(`/users/login/facebook/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch(`/rest-auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password, email) {
  return function(dispatch) {
    fetch(`rest-auth/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      });
  };
}

function getPhotoLikes(photoId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json));
      });
  };
}

function subscribeUser(userId) {
  return (dispatch, getState) => {
    dispatch(setSubscribeUser(userId));
    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/subscribe/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnsubscribeUser(userId));
      }
    });
  };
}

function unsubscribeUser(userId) {
  return (dispatch, getState) => {
    dispatch(setUnsubscribeUser(userId));
    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/unsubscribe/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setSubscribeUser(userId));
      }
    });
  };
}

function getCategory() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/category/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        /* if(response.status === 401){
              dispatch(logout());
          } */
        return response.json();
      })
      .then(json => {
        dispatch(setCategory(json.category));
      });
  };
}

function changeCategory(category) {
  /* return (dispatch, getState) => { */
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState(); //getState에서 user의 token을 받아옴.
    fetch(`/users/setcategory/`, {
      //카테고리 바꾸는 view와 연결된 url
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category
      })
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        console.log(response);
        return response.json();
      })
      .then(json => {
        if (json) {
          dispatch(setChangeCategory(json));
        }
      });
  };
}

// intial state

const intialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt")
};

// reducer

function reducer(state = intialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case SUBSCRIBE_USER:
      return applySubscribeUser(state, action);
    case UNSUBSCRIBE_USER:
      return applyUnsubscribeUser(state, action);
    case GET_CATEGORY:
      return applyGetCategory(state, action);
    case CHANEGE_CATEGORY:
      return applyChangeCategory(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applySetUserList(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList
  };
}

function applySubscribeUser(state, action) {
  const { userId } = action; // userId를 action 불러온다.
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, subscribe: true };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

function applyUnsubscribeUser(state, action) {
  const { userId } = action; // userId를 action 불러온다.
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, subscribe: false };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

function applyGetCategory(state, action) {
  return {
    ...state,
    category: action.category
  };
}

function applyChangeCategory(state, action) {
  console.log(action, "!!!");
  return {
    ...state,
    category: action.category
  };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  subscribeUser,
  unsubscribeUser,
  getCategory,
  changeCategory
};

export { actionCreators };
// reducer export

export default reducer;
