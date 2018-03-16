import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list)
              .set('initialEntries', list);
}

