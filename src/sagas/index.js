import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import swapi from '../api/swapi';
import { PERSONS_FETCH, personsLoad } from '../actions';
import parsePersonList from '../schemas/person';

const fetchPersons = async () => {
  const response = await swapi.get('/people');
  return response.data;
};

function * personsFetchSaga () {
  try {
    const data = yield call(fetchPersons);
    const persons = parsePersonList(data.results);
    yield put(personsLoad(persons));
  } catch (e) {
    yield call((e) => console.log(e), e);
  }
}

function * watchFetchPersons () {
  yield takeLatest(PERSONS_FETCH, personsFetchSaga);
}

export default function * root () {
  yield all([
    fork(watchFetchPersons)
  ]);
}
