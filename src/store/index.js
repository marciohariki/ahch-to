import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
store.runSaga = sagaMiddleware.run;

export default store;
