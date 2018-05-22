import {
  createContactSuccess,
  deleteContactSuccess,
  fetchContactError,
  fetchContactsSuccess,
  updateKontaktSuccess
} from "../actions/contacts";
import ContactApi from "../../api/ContactApi";

export function fetchContacts() {
  return (dispatch) => {
    return ContactApi.fetchContacts().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchContactsSuccess(json));
      }
      else {
        dispatch(fetchContactError());
      }
    })
  }
}

export function createContact(kontakt) {
  return function (dispatch) {
    return ContactApi.createContact(kontakt).then(response => {
      dispatch(createContactSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateContact(kontakt) {
  return function (dispatch) {
    return ContactApi.updateContact(kontakt).then(response => {
      dispatch(updateKontaktSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteContact(kontakt) {
  return function (dispatch) {
    return ContactApi.deleteContact(kontakt).then(() => {
      dispatch(deleteContactSuccess(kontakt));
    }).catch(error => {
      throw(error);
    })
  }
}
