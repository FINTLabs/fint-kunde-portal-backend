import {
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FETCH_CONTACTS_SUCCESS,
  UPDATE_CONTACT_SUCCESS
} from "./types";


export function fetchContactsSuccess(payload) {
  return {type: FETCH_CONTACTS_SUCCESS, payload}
}

export function fetchContactError() {
  return {type: FETCH_CONTACTS_ERROR}
}

export function deleteContactSuccess(contact) {
  return {type: DELETE_CONTACT_SUCCESS, contact}
}

export function createContactSuccess(contact) {
  return {type: CREATE_CONTACT_SUCCESS, contact}
}

export function updateKontaktSuccess(contact) {
  return {type: UPDATE_CONTACT_SUCCESS, contact}
}






