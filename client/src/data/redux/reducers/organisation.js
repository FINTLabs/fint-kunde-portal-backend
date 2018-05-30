import {
  FETCH_LEGAL_CONTACT_SUCCESS,
  FETCH_ORGANISATION_SUCCESS,
  FETCH_TECHNICAL_CONTACTS_SUCCESS
} from "../actions/types";

export default function organisation(state = [], action) {
  switch (action.type) {
    case FETCH_TECHNICAL_CONTACTS_SUCCESS:
      return {...state, technicalContacts: action.payload};
    case FETCH_LEGAL_CONTACT_SUCCESS:
      return {...state, legalContact: action.payload};
    case FETCH_ORGANISATION_SUCCESS:
      return {...state, organisation: action.payload};

    default:
      return state
  }
}
