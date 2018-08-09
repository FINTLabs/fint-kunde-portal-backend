import {FETCH_CLIENT_ERROR, FETCH_LINKWALKER_TESTS_SUCCESS} from "./types";


export function fetchLinkWalkerTestsSuccess(payload) {
  return {
    type: FETCH_LINKWALKER_TESTS_SUCCESS,
    payload
  }
}

export function fetchLinkWalkerTestsError() {
  return {
    type: FETCH_CLIENT_ERROR
  }
}
