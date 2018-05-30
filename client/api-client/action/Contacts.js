/** @module action/Contacts */
// Auto-generated, edits will be overwritten
import * as Contacts from '../Contacts'

export const GET_CONTACTS_USING_GET_1_START = 's/Contacts/GET_CONTACTS_USING_GET_1_START'
export const GET_CONTACTS_USING_GET_1 = 's/Contacts/GET_CONTACTS_USING_GET_1'


export function getContactsUsingGET_1(info) {
  return dispatch => {
    dispatch({ type: GET_CONTACTS_USING_GET_1_START, meta: { info } })
    return Contacts.getContactsUsingGET_1()
      .then(response => dispatch({
        type: GET_CONTACTS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const CREATE_CONTACT_USING_POST_1_START = 's/Contacts/CREATE_CONTACT_USING_POST_1_START'
export const CREATE_CONTACT_USING_POST_1 = 's/Contacts/CREATE_CONTACT_USING_POST_1'


export function createContactUsingPOST_1(contact, info) {
  return dispatch => {
    dispatch({ type: CREATE_CONTACT_USING_POST_1_START, meta: { info } })
    return Contacts.createContactUsingPOST_1(contact)
      .then(response => dispatch({
        type: CREATE_CONTACT_USING_POST_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_CONTACT_USING_GET_1_START = 's/Contacts/GET_CONTACT_USING_GET_1_START'
export const GET_CONTACT_USING_GET_1 = 's/Contacts/GET_CONTACT_USING_GET_1'


export function getContactUsingGET_1(nin, info) {
  return dispatch => {
    dispatch({ type: GET_CONTACT_USING_GET_1_START, meta: { info } })
    return Contacts.getContactUsingGET_1(nin)
      .then(response => dispatch({
        type: GET_CONTACT_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UPDATE_CONTACT_USING_PUT_1_START = 's/Contacts/UPDATE_CONTACT_USING_PUT_1_START'
export const UPDATE_CONTACT_USING_PUT_1 = 's/Contacts/UPDATE_CONTACT_USING_PUT_1'


export function updateContactUsingPUT_1(contact, nin, info) {
  return dispatch => {
    dispatch({ type: UPDATE_CONTACT_USING_PUT_1_START, meta: { info } })
    return Contacts.updateContactUsingPUT_1(contact, nin)
      .then(response => dispatch({
        type: UPDATE_CONTACT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const DELETE_CONTACTS_USING_DELETE_1_START = 's/Contacts/DELETE_CONTACTS_USING_DELETE_1_START'
export const DELETE_CONTACTS_USING_DELETE_1 = 's/Contacts/DELETE_CONTACTS_USING_DELETE_1'


export function deleteContactsUsingDELETE_1(nin, info) {
  return dispatch => {
    dispatch({ type: DELETE_CONTACTS_USING_DELETE_1_START, meta: { info } })
    return Contacts.deleteContactsUsingDELETE_1(nin)
      .then(response => dispatch({
        type: DELETE_CONTACTS_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
