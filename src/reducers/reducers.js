import {combineReducers} from 'redux'
import {INVALIDATE_PEOPLE, RECEIVE_PEOPLE, REQUEST_PEOPLE, SELECT_PAGE} from '../actions/people_actions'

const STARTER_PAGE = '1';

const selectedPage = (state = STARTER_PAGE, action) => {
  switch (action.type) {
    case SELECT_PAGE:
      return action.page;
    default:
      return state
  }
};

const people = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  hasNext: false,
  hasPrevious: false
}, action) => {
  switch (action.type) {
    case INVALIDATE_PEOPLE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true
      };
    case REQUEST_PEOPLE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_PEOPLE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.people,
        hasNext: action.hasNext,
        hasPrevious: action.hasPrevious,
        lastUpdated: action.receivedAt
      };
    default:
      return state
  }
}

const peopleByPage = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_PEOPLE: 
      return {
        ...state,
        [action.page]: people(state[action.page], action)
      };
    case RECEIVE_PEOPLE: 
      return {
        ...state,
        [action.page]: people(state[action.page], action)
      };
    case REQUEST_PEOPLE:
      return {
        ...state,
        [action.page]: people(state[action.page], action)
      };
    default:
      return state
  }
};

const rootReducer = combineReducers({
  peopleByPage,
  selectedPage
});

export default rootReducer