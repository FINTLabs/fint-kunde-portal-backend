/** @module action/Components */
// Auto-generated, edits will be overwritten
import * as Components from '../Components'

export const GET_COMPONENTS_USING_GET_1_START = 's/Components/GET_COMPONENTS_USING_GET_1_START'
export const GET_COMPONENTS_USING_GET_1 = 's/Components/GET_COMPONENTS_USING_GET_1'


export function getComponentsUsingGET_1(info) {
  return dispatch => {
    dispatch({ type: GET_COMPONENTS_USING_GET_1_START, meta: { info } })
    return Components.getComponentsUsingGET_1()
      .then(response => dispatch({
        type: GET_COMPONENTS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_COMPONENT_USING_GET_1_START = 's/Components/GET_COMPONENT_USING_GET_1_START'
export const GET_COMPONENT_USING_GET_1 = 's/Components/GET_COMPONENT_USING_GET_1'


export function getComponentUsingGET_1(compName, info) {
  return dispatch => {
    dispatch({ type: GET_COMPONENT_USING_GET_1_START, meta: { info } })
    return Components.getComponentUsingGET_1(compName)
      .then(response => dispatch({
        type: GET_COMPONENT_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const ADD_ADAPTER_TO_COMPONENT_USING_PUT_1_START = 's/Components/ADD_ADAPTER_TO_COMPONENT_USING_PUT_1_START'
export const ADD_ADAPTER_TO_COMPONENT_USING_PUT_1 = 's/Components/ADD_ADAPTER_TO_COMPONENT_USING_PUT_1'


export function addAdapterToComponentUsingPUT_1(adapterName, compName, orgName, info) {
  return dispatch => {
    dispatch({ type: ADD_ADAPTER_TO_COMPONENT_USING_PUT_1_START, meta: { info } })
    return Components.addAdapterToComponentUsingPUT_1(adapterName, compName, orgName)
      .then(response => dispatch({
        type: ADD_ADAPTER_TO_COMPONENT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1_START = 's/Components/REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1_START'
export const REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1 = 's/Components/REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1'


export function removeAdapterFromComponentUsingDELETE_1(adapterName, compName, orgName, info) {
  return dispatch => {
    dispatch({ type: REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1_START, meta: { info } })
    return Components.removeAdapterFromComponentUsingDELETE_1(adapterName, compName, orgName)
      .then(response => dispatch({
        type: REMOVE_ADAPTER_FROM_COMPONENT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const ADD_CLIENT_TO_COMPONENT_USING_PUT_1_START = 's/Components/ADD_CLIENT_TO_COMPONENT_USING_PUT_1_START'
export const ADD_CLIENT_TO_COMPONENT_USING_PUT_1 = 's/Components/ADD_CLIENT_TO_COMPONENT_USING_PUT_1'


export function addClientToComponentUsingPUT_1(clientName, compName, orgName, info) {
  return dispatch => {
    dispatch({ type: ADD_CLIENT_TO_COMPONENT_USING_PUT_1_START, meta: { info } })
    return Components.addClientToComponentUsingPUT_1(clientName, compName, orgName)
      .then(response => dispatch({
        type: ADD_CLIENT_TO_COMPONENT_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1_START = 's/Components/REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1_START'
export const REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1 = 's/Components/REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1'


export function removeClientFromComponentUsingDELETE_1(clientName, compName, orgName, info) {
  return dispatch => {
    dispatch({ type: REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1_START, meta: { info } })
    return Components.removeClientFromComponentUsingDELETE_1(clientName, compName, orgName)
      .then(response => dispatch({
        type: REMOVE_CLIENT_FROM_COMPONENT_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
