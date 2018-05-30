/** @module action/Clients */
// Auto-generated, edits will be overwritten
import * as Clients from '../Clients'

export const GET_ALL_CLIENTS_USING_GET_1_START = 's/Clients/GET_ALL_CLIENTS_USING_GET_1_START'
export const GET_ALL_CLIENTS_USING_GET_1 = 's/Clients/GET_ALL_CLIENTS_USING_GET_1'


export function getAllClientsUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_ALL_CLIENTS_USING_GET_1_START, meta: { info } })
    return Clients.getAllClientsUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_ALL_CLIENTS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const ADD_CLIENT_USING_POST_1_START = 's/Clients/ADD_CLIENT_USING_POST_1_START'
export const ADD_CLIENT_USING_POST_1 = 's/Clients/ADD_CLIENT_USING_POST_1'


export function addClientUsingPOST_1(orgName, client, info) {
  return dispatch => {
    dispatch({ type: ADD_CLIENT_USING_POST_1_START, meta: { info } })
    return Clients.addClientUsingPOST_1(orgName, client)
      .then(response => dispatch({
        type: ADD_CLIENT_USING_POST_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_CLIENT_USING_GET_1_START = 's/Clients/GET_CLIENT_USING_GET_1_START'
export const GET_CLIENT_USING_GET_1 = 's/Clients/GET_CLIENT_USING_GET_1'


export function getClientUsingGET_1(orgName, clientName, info) {
  return dispatch => {
    dispatch({ type: GET_CLIENT_USING_GET_1_START, meta: { info } })
    return Clients.getClientUsingGET_1(orgName, clientName)
      .then(response => dispatch({
        type: GET_CLIENT_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UPDATE_CLIENT_USING_PUT_1_START = 's/Clients/UPDATE_CLIENT_USING_PUT_1_START'
export const UPDATE_CLIENT_USING_PUT_1 = 's/Clients/UPDATE_CLIENT_USING_PUT_1'


export function updateClientUsingPUT_1(orgName, clientName, client, info) {
  return dispatch => {
    dispatch({ type: UPDATE_CLIENT_USING_PUT_1_START, meta: { info } })
    return Clients.updateClientUsingPUT_1(orgName, clientName, client)
      .then(response => dispatch({
        type: UPDATE_CLIENT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const DELETE_CLIENT_USING_DELETE_1_START = 's/Clients/DELETE_CLIENT_USING_DELETE_1_START'
export const DELETE_CLIENT_USING_DELETE_1 = 's/Clients/DELETE_CLIENT_USING_DELETE_1'


export function deleteClientUsingDELETE_1(orgName, clientName, info) {
  return dispatch => {
    dispatch({ type: DELETE_CLIENT_USING_DELETE_1_START, meta: { info } })
    return Clients.deleteClientUsingDELETE_1(orgName, clientName)
      .then(response => dispatch({
        type: DELETE_CLIENT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const RESET_CLIENT_PASSWORD_USING_PUT_1_START = 's/Clients/RESET_CLIENT_PASSWORD_USING_PUT_1_START'
export const RESET_CLIENT_PASSWORD_USING_PUT_1 = 's/Clients/RESET_CLIENT_PASSWORD_USING_PUT_1'


export function resetClientPasswordUsingPUT_1(orgName, clientName, newPassword, info) {
  return dispatch => {
    dispatch({ type: RESET_CLIENT_PASSWORD_USING_PUT_1_START, meta: { info } })
    return Clients.resetClientPasswordUsingPUT_1(orgName, clientName, newPassword)
      .then(response => dispatch({
        type: RESET_CLIENT_PASSWORD_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_CLIENT_SECRET_USING_GET_1_START = 's/Clients/GET_CLIENT_SECRET_USING_GET_1_START'
export const GET_CLIENT_SECRET_USING_GET_1 = 's/Clients/GET_CLIENT_SECRET_USING_GET_1'


export function getClientSecretUsingGET_1(orgName, clientName, info) {
  return dispatch => {
    dispatch({ type: GET_CLIENT_SECRET_USING_GET_1_START, meta: { info } })
    return Clients.getClientSecretUsingGET_1(orgName, clientName)
      .then(response => dispatch({
        type: GET_CLIENT_SECRET_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
