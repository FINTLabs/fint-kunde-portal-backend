import {FETCH_COMPONENTS_ERROR, FETCH_COMPONENTS_SUCCESS} from "./types";


export function fetchComponentsSuccess(payload) {
  return {
    type: FETCH_COMPONENTS_SUCCESS,
    payload
  }
}

export function fetchComponentsError() {
  return {
    type: FETCH_COMPONENTS_ERROR,
  }
}

