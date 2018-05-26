import {
  addTechnicalContactError,
  addTechnicalContactSuccess,
  fetchLegalContactError,
  fetchLegalContactSuccess,
  fetchOrganisationError,
  fetchOrganisationSuccess,
  fetchTechnicalContactsError,
  fetchTechnicalContactsSuccess,
  removeTechnicalContactError,
  removeTechnicalContactSuccess,
  setLegalContactError,
  setLegalContactSuccess,
  unlinkComponentFromOrganisationSuccess,
  unsetLegalContactError,
  unsetLegalContactSuccess
} from "../actions/organisation";
import OrganisationApi from "../../api/OrganisationApi";
import {fetchComponents} from "./component";

export function fetchTechnicalContacts(organisation) {

  return (dispatch) => {
    return OrganisationApi.getTechnicalContacts(organisation).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchTechnicalContactsSuccess(json));
      }
      else {
        dispatch(fetchTechnicalContactsError());
      }
    })
  }
}

export function fetchLegalContact(organisation) {

  return (dispatch) => {
    return OrganisationApi.getLegalContact(organisation).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchLegalContactSuccess(json));
      }
      else {
        dispatch(fetchLegalContactError());
      }
    })
  }
}

export function fetchOrganisation(organisation) {

  return function (dispatch) {
    return OrganisationApi.getOrganisation(organisation).then(([response, json]) => {
      dispatch(fetchOrganisationSuccess(json));
      return json;
    }).catch(error => {
      dispatch(fetchOrganisationError())

    });
  }
}

export function linkComponentToOrganisation(api) {
  return function (dispatch) {
    return OrganisationApi.linkComponent(api).then(responseApi => {
      //dispatch(linkComponentToOrganisationSuccess(responseApi));
      fetchOrganisation();
      fetchComponents();
      //return responseApi;
    }).catch(error => {
      //dispatch(linkComponentToOrganisationError(error))
    });
  };
}

export function unlinkComponentFromOrganisation(api) {
  return function (dispatch) {
    return OrganisationApi.unlinkComponent(api).then(responseApi => {
      dispatch(unlinkComponentFromOrganisationSuccess(responseApi));
      fetchOrganisation();
      fetchComponents();
      //return responseApi;
    }).catch(error => {
      throw(error);
    });
  };
}

/*
export function removeTechnicalContact(kontakt) {
  return function (dispatch) {
    return OrganisationApi.removeTechnicalContact(kontakt).then(response => {
      dispatch(removeTechnicalContactSuccess(response));
      return response;
    }).catch(error => {
      dispatch(removeTechnicalContactError(error));
    });
  };
}
*/

/*
export function addTechnicalContact(nin) {
  return function (dispatch) {
    return OrganisationApi.addTechnicalContact(nin).then(responseKontakt => {
      dispatch(addTechnicalContactSuccess(responseKontakt));
      return responseKontakt;
    }).catch(error => {
      dispatch(addTechnicalContactError(error))
    });
  };
}
*/


/*
export function setLegalContact(nin) {
  return function (dispatch) {
    return OrganisationApi.setLegalContact(nin).then(response => {
      dispatch(setLegalContactSuccess(response));
      return response;
    }).catch(error => {
      dispatch(setLegalContactError(error));
    });
  };
}

export function unsetLegalContact(kontakt) {
  return function (dispatch) {
    return OrganisationApi.unsetLegalContact(kontakt).then(responseKontakt => {
      dispatch(unsetLegalContactSuccess(responseKontakt));
      return responseKontakt;
    }).catch(error => {
      dispatch(unsetLegalContactError(error));
    });
  };
}
*/
