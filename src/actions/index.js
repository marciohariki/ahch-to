import { createAction } from 'redux-actions';

export const PERSONS_LOAD = `persons/load`;
export const PERSONS_FETCH = `persons/fetch`;

export const personsLoad = createAction(PERSONS_LOAD);
export const personsFetch = createAction(PERSONS_FETCH);
