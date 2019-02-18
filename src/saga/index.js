import { call, put, takeLatest } from 'redux-saga/effects';

import swapi from '../api/swapi';
import { PERSONS_FETCH, personsLoad } from '../actions';

const fetchPersons = async () => {
  const response = await swapi.get('/people');
  return response.data;
};

function * personsFetchSaga() {
  try {
    const persons = yield call(fetchPersons);
    yield put(personsLoad(persons.results));
  } catch (e) {
    yield call((e) => console.log(e), e);
  }
}

export function * personsWatchFetchSaga() {
  yield takeLatest(PERSONS_FETCH, personsFetchSaga);
}
