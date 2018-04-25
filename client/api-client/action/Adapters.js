/** @module action/Adapters */
// Auto-generated, edits will be overwritten
import * as Adapters from '../Adapters'

export const GET_ALL_ADAPTERS_USING_GET_1_START = 's/Adapters/GET_ALL_ADAPTERS_USING_GET_1_START'
export const GET_ALL_ADAPTERS_USING_GET_1 = 's/Adapters/GET_ALL_ADAPTERS_USING_GET_1'


export function getAllAdaptersUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_ALL_ADAPTERS_USING_GET_1_START, meta: { info } })
    return Adapters.getAllAdaptersUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_ALL_ADAPTERS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const ADD_ADAPTER_USING_POST_1_START = 's/Adapters/ADD_ADAPTER_USING_POST_1_START'
export const ADD_ADAPTER_USING_POST_1 = 's/Adapters/ADD_ADAPTER_USING_POST_1'


export function addAdapterUsingPOST_1(orgName, adapter, info) {
  return dispatch => {
    dispatch({ type: ADD_ADAPTER_USING_POST_1_START, meta: { info } })
    return Adapters.addAdapterUsingPOST_1(orgName, adapter)
      .then(response => dispatch({
        type: ADD_ADAPTER_USING_POST_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_ADAPTER_USING_GET_1_START = 's/Adapters/GET_ADAPTER_USING_GET_1_START'
export const GET_ADAPTER_USING_GET_1 = 's/Adapters/GET_ADAPTER_USING_GET_1'


export function getAdapterUsingGET_1(orgName, adapterName, info) {
  return dispatch => {
    dispatch({ type: GET_ADAPTER_USING_GET_1_START, meta: { info } })
    return Adapters.getAdapterUsingGET_1(orgName, adapterName)
      .then(response => dispatch({
        type: GET_ADAPTER_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UPDATE_ADAPTER_USING_PUT_1_START = 's/Adapters/UPDATE_ADAPTER_USING_PUT_1_START'
export const UPDATE_ADAPTER_USING_PUT_1 = 's/Adapters/UPDATE_ADAPTER_USING_PUT_1'


export function updateAdapterUsingPUT_1(orgName, adapterName, adapter, info) {
  return dispatch => {
    dispatch({ type: UPDATE_ADAPTER_USING_PUT_1_START, meta: { info } })
    return Adapters.updateAdapterUsingPUT_1(orgName, adapterName, adapter)
      .then(response => dispatch({
        type: UPDATE_ADAPTER_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const DELETE_ADAPTER_USING_DELETE_1_START = 's/Adapters/DELETE_ADAPTER_USING_DELETE_1_START'
export const DELETE_ADAPTER_USING_DELETE_1 = 's/Adapters/DELETE_ADAPTER_USING_DELETE_1'


export function deleteAdapterUsingDELETE_1(orgName, adapterName, info) {
  return dispatch => {
    dispatch({ type: DELETE_ADAPTER_USING_DELETE_1_START, meta: { info } })
    return Adapters.deleteAdapterUsingDELETE_1(orgName, adapterName)
      .then(response => dispatch({
        type: DELETE_ADAPTER_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const RESET_ADAPTER_PASSWORD_USING_PUT_1_START = 's/Adapters/RESET_ADAPTER_PASSWORD_USING_PUT_1_START'
export const RESET_ADAPTER_PASSWORD_USING_PUT_1 = 's/Adapters/RESET_ADAPTER_PASSWORD_USING_PUT_1'


export function resetAdapterPasswordUsingPUT_1(orgName, adapterName, newPassword, info) {
  return dispatch => {
    dispatch({ type: RESET_ADAPTER_PASSWORD_USING_PUT_1_START, meta: { info } })
    return Adapters.resetAdapterPasswordUsingPUT_1(orgName, adapterName, newPassword)
      .then(response => dispatch({
        type: RESET_ADAPTER_PASSWORD_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_ADAPTER_SECRET_USING_GET_1_START = 's/Adapters/GET_ADAPTER_SECRET_USING_GET_1_START'
export const GET_ADAPTER_SECRET_USING_GET_1 = 's/Adapters/GET_ADAPTER_SECRET_USING_GET_1'


export function getAdapterSecretUsingGET_1(orgName, adapterName, info) {
  return dispatch => {
    dispatch({ type: GET_ADAPTER_SECRET_USING_GET_1_START, meta: { info } })
    return Adapters.getAdapterSecretUsingGET_1(orgName, adapterName)
      .then(response => dispatch({
        type: GET_ADAPTER_SECRET_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
