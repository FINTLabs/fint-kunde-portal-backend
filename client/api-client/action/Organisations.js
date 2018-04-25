/** @module action/Organisations */
// Auto-generated, edits will be overwritten
import * as Organisations from '../Organisations'

export const GET_ORGANISATION_DETAILS_USING_GET_1_START = 's/Organisations/GET_ORGANISATION_DETAILS_USING_GET_1_START'
export const GET_ORGANISATION_DETAILS_USING_GET_1 = 's/Organisations/GET_ORGANISATION_DETAILS_USING_GET_1'


export function getOrganisationDetailsUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_ORGANISATION_DETAILS_USING_GET_1_START, meta: { info } })
    return Organisations.getOrganisationDetailsUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_ORGANISATION_DETAILS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UPDATE_ORGANISATION_USING_PUT_1_START = 's/Organisations/UPDATE_ORGANISATION_USING_PUT_1_START'
export const UPDATE_ORGANISATION_USING_PUT_1 = 's/Organisations/UPDATE_ORGANISATION_USING_PUT_1'


export function updateOrganisationUsingPUT_1(orgName, organisation, info) {
  return dispatch => {
    dispatch({ type: UPDATE_ORGANISATION_USING_PUT_1_START, meta: { info } })
    return Organisations.updateOrganisationUsingPUT_1(orgName, organisation)
      .then(response => dispatch({
        type: UPDATE_ORGANISATION_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const LINK_COMPONENT_USING_PUT_1_START = 's/Organisations/LINK_COMPONENT_USING_PUT_1_START'
export const LINK_COMPONENT_USING_PUT_1 = 's/Organisations/LINK_COMPONENT_USING_PUT_1'


export function linkComponentUsingPUT_1(orgName, compName, info) {
  return dispatch => {
    dispatch({ type: LINK_COMPONENT_USING_PUT_1_START, meta: { info } })
    return Organisations.linkComponentUsingPUT_1(orgName, compName)
      .then(response => dispatch({
        type: LINK_COMPONENT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UN_LINK_COMPONENT_USING_DELETE_1_START = 's/Organisations/UN_LINK_COMPONENT_USING_DELETE_1_START'
export const UN_LINK_COMPONENT_USING_DELETE_1 = 's/Organisations/UN_LINK_COMPONENT_USING_DELETE_1'


export function unLinkComponentUsingDELETE_1(orgName, compName, info) {
  return dispatch => {
    dispatch({ type: UN_LINK_COMPONENT_USING_DELETE_1_START, meta: { info } })
    return Organisations.unLinkComponentUsingDELETE_1(orgName, compName)
      .then(response => dispatch({
        type: UN_LINK_COMPONENT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_LEGAL_CONTACT_USING_GET_1_START = 's/Organisations/GET_LEGAL_CONTACT_USING_GET_1_START'
export const GET_LEGAL_CONTACT_USING_GET_1 = 's/Organisations/GET_LEGAL_CONTACT_USING_GET_1'


export function getLegalContactUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_LEGAL_CONTACT_USING_GET_1_START, meta: { info } })
    return Organisations.getLegalContactUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_LEGAL_CONTACT_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const LINK_LEGAL_CONTACT_USING_PUT_1_START = 's/Organisations/LINK_LEGAL_CONTACT_USING_PUT_1_START'
export const LINK_LEGAL_CONTACT_USING_PUT_1 = 's/Organisations/LINK_LEGAL_CONTACT_USING_PUT_1'


export function linkLegalContactUsingPUT_1(orgName, nin, info) {
  return dispatch => {
    dispatch({ type: LINK_LEGAL_CONTACT_USING_PUT_1_START, meta: { info } })
    return Organisations.linkLegalContactUsingPUT_1(orgName, nin)
      .then(response => dispatch({
        type: LINK_LEGAL_CONTACT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UN_LINK_LEGAL_CONTACT_USING_DELETE_1_START = 's/Organisations/UN_LINK_LEGAL_CONTACT_USING_DELETE_1_START'
export const UN_LINK_LEGAL_CONTACT_USING_DELETE_1 = 's/Organisations/UN_LINK_LEGAL_CONTACT_USING_DELETE_1'


export function unLinkLegalContactUsingDELETE_1(orgName, nin, info) {
  return dispatch => {
    dispatch({ type: UN_LINK_LEGAL_CONTACT_USING_DELETE_1_START, meta: { info } })
    return Organisations.unLinkLegalContactUsingDELETE_1(orgName, nin)
      .then(response => dispatch({
        type: UN_LINK_LEGAL_CONTACT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_TECHNICAL_CONTACTS_USING_GET_1_START = 's/Organisations/GET_TECHNICAL_CONTACTS_USING_GET_1_START'
export const GET_TECHNICAL_CONTACTS_USING_GET_1 = 's/Organisations/GET_TECHNICAL_CONTACTS_USING_GET_1'


export function getTechnicalContactsUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_TECHNICAL_CONTACTS_USING_GET_1_START, meta: { info } })
    return Organisations.getTechnicalContactsUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_TECHNICAL_CONTACTS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const LINK_TECHNICAL_CONTACT_USING_PUT_1_START = 's/Organisations/LINK_TECHNICAL_CONTACT_USING_PUT_1_START'
export const LINK_TECHNICAL_CONTACT_USING_PUT_1 = 's/Organisations/LINK_TECHNICAL_CONTACT_USING_PUT_1'


export function linkTechnicalContactUsingPUT_1(orgName, nin, info) {
  return dispatch => {
    dispatch({ type: LINK_TECHNICAL_CONTACT_USING_PUT_1_START, meta: { info } })
    return Organisations.linkTechnicalContactUsingPUT_1(orgName, nin)
      .then(response => dispatch({
        type: LINK_TECHNICAL_CONTACT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1_START = 's/Organisations/UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1_START'
export const UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1 = 's/Organisations/UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1'


export function unLinkTechnicalContactUsingDELETE_1(orgName, nin, info) {
  return dispatch => {
    dispatch({ type: UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1_START, meta: { info } })
    return Organisations.unLinkTechnicalContactUsingDELETE_1(orgName, nin)
      .then(response => dispatch({
        type: UN_LINK_TECHNICAL_CONTACT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
