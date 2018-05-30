import {
  CREATE_ADAPTER_SUCCESS,
  DELETE_ADAPTER_SUCCESS,
  FETCH_ADAPTERS_ERROR,
  FETCH_ADAPTERS_SUCCESS,
  REMOVE_ADAPTER_FROM_COMPONENT,
  UPDATE_ADAPTER_SUCCESS
} from "./types";


export function fetchAdapersSuccess(payload) {
  return {type: FETCH_ADAPTERS_SUCCESS, payload}
}

export function fetchAdaptersError() {
  return {type: FETCH_ADAPTERS_ERROR}
}


export function createAdapterSuccess(adapter) {
  return {type: CREATE_ADAPTER_SUCCESS, adapter}
}

export function updateAdapterSuccess(adapter) {
  return {type: UPDATE_ADAPTER_SUCCESS, adapter}
}


export function deleteAdapterSuccess(adapter) {
  return {type: DELETE_ADAPTER_SUCCESS, adapter}
}

export function addAdapterToComponentSuccess(adapter) {
  return {type: CREATE_ADAPTER_SUCCESS, adapter}
}

export function removeAdapterFromComponentSuccess(adapter) {
  return {type: REMOVE_ADAPTER_FROM_COMPONENT, adapter}
}












