import {
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENT_ERROR,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS
} from "./types";

// TODO:
// - Should we split this in to files?
// - Rename all norwegian names to eng.

export function fetchClientRequest() {
  return {
    type: FETCH_CLIENT_REQUEST
  }
}

export function fetchClientSuccess(payload) {
  return {
    type: FETCH_CLIENT_SUCCESS,
    payload
  }
}

export function fetchClientError() {
  return {
    type: FETCH_CLIENT_ERROR
  }
}

export function createKlientSuccess(client) {
  return {type: CREATE_CLIENT_SUCCESS, client}
}

export function updateKlientSuccess(klient) {
  return {type: UPDATE_CLIENT_SUCCESS, klient}
}


export function addKlientToComponentSuccess(klient) {
  return {type: CREATE_CLIENT_SUCCESS, klient}
}

export function deleteKlientFromComponentSuccess(klient) {
  return {type: DELETE_CLIENT_SUCCESS, klient}
}



