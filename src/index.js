import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import rootSaga from './sagas';
import App from './containers/App';
import store from './store';

store.runSaga(rootSaga);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
