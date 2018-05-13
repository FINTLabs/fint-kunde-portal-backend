import {
  addKlientToComponentSuccess,
  createKlientSuccess,
  deleteKlientFromComponentSuccess, fetchClientError, fetchClientSuccess,
  updateKlientSuccess
} from "../actions/client";
import {DELETE_CLIENT_SUCCESS} from "../actions/types";
import ClientApi from "../../api/ClientApi";


export function fetchKlienter() {

  return (dispatch) => {
    return ClientApi.getKlienter().then(([response, json]) => {
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
    return ClientApi.createKlient(klient).then(responseKlient => {
      dispatch(createKlientSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateClient(client) {
  return function (dispatch) {
    return ClientApi.updateClient(client).then(responseClient => {
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
    return ClientApi.deleteKlient(klient).then(() => {
      dispatch(deleteKlientSuccess(klient));
    }).catch(error => {
      throw(error);
    })
  }
}


export function addKlientToComponent(klient) {
  return function (dispatch) {
    return ClientApi.addKlient(klient).then(responseKlient => {
      dispatch(addKlientToComponentSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteKlientFromComponent(klient) {
  return function (dispatch) {
    return ClientApi.deleteKlientFromComponent(klient).then(() => {
      dispatch(deleteKlientFromComponentSuccess(klient));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
