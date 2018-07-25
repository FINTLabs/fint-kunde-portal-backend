import {
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  FETCH_CONTACTS_SUCCESS,
  UPDATE_CONTACT_SUCCESS
} from "../actions/types";


export default function contact(state = [], action) {
  switch (action.type) {
    case FETCH_CONTACTS_SUCCESS:
      return {...state, contacts: action.payload};
    case UPDATE_CONTACT_SUCCESS:
      return state;
    case CREATE_CONTACT_SUCCESS:
      return {...state, contacts: [...state.contacts, action.payload]};
    case DELETE_CONTACT_SUCCESS:
      return {...state, contacts: state.contacts.filter(contact => action.payload !== contact)};
    default:
      return state
  }
}
