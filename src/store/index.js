import {applyMiddleware, createStore} from 'redux';
import reducer from "../reducers/reducers";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

export const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);
