import {
  addKlientToComponentSuccess,
  createKlientSuccess,
  deleteKlientFromComponentSuccess,
  fetchClientError,
  fetchClientSuccess,
  updateKlientSuccess
} from "../actions/client";
import {DELETE_CLIENT_SUCCESS} from "../actions/types";
import ClientApi from "../../api/ClientApi";


export function fetchClients(organisation) {

  return (dispatch) => {
    return ClientApi.getKlienter(organisation).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchClientSuccess(json));
      }
      else {
        dispatch(fetchClientError());
      }
    })
  }
}

export function createClient(client, organisation) {
  return function (dispatch) {
    return ClientApi.createClient(client, organisation.name).then(responseKlient => {
      dispatch(createKlientSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateClient(client, organisation) {
  return function (dispatch) {
    return ClientApi.updateClient(client, organisation).then(responseClient => {
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

export function deleteClient(klient, organisation) {
  return function (dispatch) {
    return ClientApi.deleteKlient(klient, organisation).then(() => {
      dispatch(deleteKlientSuccess(klient));
    }).catch(error => {
      throw(error);
    })
  }
}


export function addClientToComponent(klient) {
  return function (dispatch) {
    return ClientApi.addKlient(klient).then(responseKlient => {
      dispatch(addKlientToComponentSuccess(responseKlient));
      return responseKlient;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteClientFromComponent(klient) {
  return function (dispatch) {
    return ClientApi.deleteKlientFromComponent(klient).then(() => {
      dispatch(deleteKlientFromComponentSuccess(klient));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
