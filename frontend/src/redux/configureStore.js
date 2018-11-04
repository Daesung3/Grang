//user.js나 photo.js등의 여러개의 리듀서를 가지고 여기에 스토어를 만듬!!

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";
import user from 'redux/modules/user';
import photos from 'redux/modules/photos';
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];


if(env === "development"){
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const reducer = combineReducers({
    user,
    photos,
    routing: routerReducer,
    i18nState
});

let store;

if(env=== "development"){
  store = initialState => 
    Reactotron.createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares))
    );
}else{
  store = initialState => 
    createStore(reducer, applyMiddleware(...middlewares));

}


export { history };

export default store();