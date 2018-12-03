import { combineReducers } from 'redux'
import {
  SELECT_PAGE, INVALIDATE_PEOPLE,
  REQUEST_PEOPLE, RECEIVE_PEOPLE
} from '../actions/actions'

const selectedPage = (state = '1', action) => {
  switch (action.type) {
    case SELECT_PAGE:
      return action.page
    default:
      return state
  }
}

const people = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_PEOPLE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PEOPLE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PEOPLE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.people,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const peopleByPage = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_PEOPLE:
    case RECEIVE_PEOPLE:
    case REQUEST_PEOPLE:
      return {
        ...state,
        [action.page]: people(state[action.page], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  peopleByPage,
  selectedPage
})

export default rootReducer