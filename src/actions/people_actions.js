import { getPeopleByPage } from '../services/people.service'

export const SELECT_PAGE = 'SELECT_PAGE'
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
export const INVALIDATE_PEOPLE = 'INVALIDATE_PEOPLE'


export function selectPage(page) {
    return {
        type: SELECT_PAGE,
        page
    }
}

export function invalidatePeople(page) {
    return {
        type: INVALIDATE_PEOPLE,
        page
    }
}

function requestPeople(page) {
    return {
        type: REQUEST_PEOPLE,
        page
    }
}

function receivePeople(page, peoplePage) {
    return {
        type: RECEIVE_PEOPLE,
        page,
        people: peoplePage.items,
        hasNext: peoplePage.hasNext,
        hasPrevious: peoplePage.hasPrevious,
        receivedAt: peoplePage.receivedAt
    }
}

function fetchPeople(page) {
    return dispatch => {
        dispatch(requestPeople(page))
        return getPeopleByPage(page)
            .then(peoplePage => dispatch(receivePeople(page, peoplePage)))
    }
}

function shouldFetchPeople(state, page) {
    const people = state.peopleByPage[page]
    if (!people) {
        return true
    } else if (people.isFetching) {
        return false
    } else {
        return people.didInvalidate
    }
}

export function fetchPeopleIfNeeded(page) {
    return (dispatch, getState) => {
        if (shouldFetchPeople(getState(), page)) {
            return dispatch(fetchPeople(page))
        }
    }
}
