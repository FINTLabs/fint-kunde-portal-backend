import KlienterApi from '../../api/KlienterApi';
import {
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENT_ERROR,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS
} from "./actionTypes";

// TODO:
// - Should we split this in to files?
// - Rename all norwegian names to eng.

function fetchClientRequest() {
  return {
    type: FETCH_CLIENT_REQUEST
  }
}

function fetchClientSuccess(payload) {
  return {
    type: FETCH_CLIENT_SUCCESS,
    payload
  }
}

function fetchClientError() {
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

export function fetchKlienter() {

  return (dispatch) => {
    dispatch(fetchClientRequest());
    return KlienterApi.getKlienter().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchClientSuccess(json));
      }
      else {
        dispatch(fetchClientError());
      }
    })
  }
}

export function createKlient(klient) {
  return function (dispatch) {
    return KlienterApi.createKlient(klient).then(responseKlient => {
      dispatch(createKlientSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateClient(client) {
  return function (dispatch) {
    return KlienterApi.updateClient(client).then(responseClient => {
      dispatch(updateKlientSuccess(responseClient));
      return responseClient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteKlientSuccess(client) {
  return {type: DELETE_CLIENT_SUCCESS, client}
}

export function deleteKlient(klient) {
  return function (dispatch) {
    return KlienterApi.deleteKlient(klient).then(() => {
      dispatch(deleteKlientSuccess(klient));
    }).catch(error => {
      throw(error);
    })
  }
}


export function addKlientToComponent(klient) {
  return function (dispatch) {
    return KlienterApi.addKlient(klient).then(responseKlient => {
      dispatch(addKlientToComponentSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteKlientFromComponent(klient) {
  return function (dispatch) {
    return KlienterApi.deleteKlientFromComponent(klient).then(() => {
      dispatch(deleteKlientFromComponentSuccess(klient));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

