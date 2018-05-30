import {
  ADD_TECHNICAL_CONTACT_ERROR,
  ADD_TECHNICAL_CONTACT_SUCCESS,
  FETCH_LEGAL_CONTACT_ERROR,
  FETCH_LEGAL_CONTACT_SUCCESS,
  FETCH_ORGANISATION_ERROR,
  FETCH_ORGANISATION_SUCCESS,
  FETCH_TECHNICAL_CONTACTS_ERROR,
  FETCH_TECHNICAL_CONTACTS_SUCCESS,
  LINK_COMPONENT_TO_ORGANISATION_ERROR,
  LINK_COMPONENT_TO_ORGANISATION_SUCCESS,
  REMOVE_TECHNICAL_CONTACT_ERROR,
  REMOVE_TECHNICAL_CONTACT_SUCCESS,
  SET_LEGAL_CONTACT_ERROR,
  SET_LEGAL_CONTACT_SUCCESS,
  UNLINK_COMPONENT_FROM_ORGANISATION_SUCCESS,
  UNSET_LEGAL_CONTACT_ERROR,
  UNSET_LEGAL_CONTACT_SUCCESS
} from "./types";


// TODO: Add error to error actions

export function fetchTechnicalContactsSuccess(payload) {
  return {
    type: FETCH_TECHNICAL_CONTACTS_SUCCESS,
    payload
  }
}

export function fetchTechnicalContactsError() {
  return {
    type: FETCH_TECHNICAL_CONTACTS_ERROR,
  }
}

export function fetchLegalContactSuccess(payload) {
  return {
    type: FETCH_LEGAL_CONTACT_SUCCESS,
    payload
  }
}

export function fetchLegalContactError() {
  return {
    type: FETCH_LEGAL_CONTACT_ERROR,
  }
}


export function fetchOrganisationSuccess(payload) {
  return {
    type: FETCH_ORGANISATION_SUCCESS,
    payload
  }
}

export function fetchOrganisationError() {
  return {
    type: FETCH_ORGANISATION_ERROR
  }
}

export function linkComponentToOrganisationSuccess(api) {
  return {type: LINK_COMPONENT_TO_ORGANISATION_SUCCESS, api}
}

export function linkComponentToOrganisationError(error) {
  return {type: LINK_COMPONENT_TO_ORGANISATION_ERROR, error}
}

export function unlinkComponentFromOrganisationSuccess(api) {
  return {type: UNLINK_COMPONENT_FROM_ORGANISATION_SUCCESS, api}
}

export function removeTechnicalContactSuccess(response) {
  return {type: REMOVE_TECHNICAL_CONTACT_SUCCESS, response}
}

export function removeTechnicalContactError(error) {
  return {type: REMOVE_TECHNICAL_CONTACT_ERROR, error}
}

export function addTechnicalContactSuccess(response) {
  return {type: ADD_TECHNICAL_CONTACT_SUCCESS, response}
}

export function addTechnicalContactError(error) {
  return {type: ADD_TECHNICAL_CONTACT_ERROR, error}
}

export function setLegalContactSuccess(response) {
  return {type: SET_LEGAL_CONTACT_SUCCESS, response}
}

export function setLegalContactError(error) {
  return {type: SET_LEGAL_CONTACT_ERROR, error}
}

export function unsetLegalContactSuccess(response) {
  return {type: UNSET_LEGAL_CONTACT_SUCCESS, response}
}

export function unsetLegalContactError(error) {
  return {type: UNSET_LEGAL_CONTACT_ERROR, error}
}


