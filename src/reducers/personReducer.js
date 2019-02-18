import { fromJS } from 'immutable';
import { PERSONS_FETCH, PERSONS_LOAD } from '../actions';

const INITIAL_STATE = fromJS({
  status: 'fetching',
  error: null,
  data: []
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSONS_FETCH:
      return state.set('status', 'fetching');
    case PERSONS_LOAD:
      const data = state.get('data').merge(action.payload);
      return state
        .set('status', 'loaded')
        .set('data', data);
    default:
      return state;
  }
}
