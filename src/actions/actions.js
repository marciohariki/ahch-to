import fetch from 'cross-fetch'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const SELECT_PAGE = 'SELECT_PAGE'
export const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
export const INVALIDATE_PEOPLE = 'INVALIDATE_PEOPLE'


export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}


// PEOPLE SECTION

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

function receivePeople(page, json) {
    return {
        type: RECEIVE_PEOPLE,
        page,
        people: json.results.map(result => result),
        receivedAt: Date.now()
    }
}

function fetchPeople(page) {
    return dispatch => {
        dispatch(requestPeople(page))
        return fetch(`https://swapi.co/api/people?page=${page}`)
            .then(response => response.json())
            .then(json => dispatch(receivePeople(page, json)))
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
