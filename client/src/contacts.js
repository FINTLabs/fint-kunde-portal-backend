export const SET_CONTACTS = 'fint-test-client/tokens/SET_TOKEN';

export function setEntries(entries) {
	  const list = List(entries);
	  return state.set('entries', list)
	              .set('initialEntries', list);
	}

export default function reducer(state = { contacts: {} }, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
    	return setEntries(action.contacts)
       };
    default:
      return state;
  }
}
setEntries(state, action.entries)