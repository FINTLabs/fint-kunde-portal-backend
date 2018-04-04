import * as types from './actionTypes';
import KontakterApi from '../api/KontakterApi';

export function loadKontakterSuccess(kontakter) {
  return {type: types.LOAD_KONTAKTER_SUCCESS, kontakter};
}

export function updateKontakterSuccess(kontakter) {
  return {type: types.UPDATE_KONTAKTER_SUCCESS, kontakter}
}

export function createKontakterSuccess(kontakter) {
  return {type: types.CREATE_KONTAKTER_SUCCESS, kontakter}
}

export function deleteKontakterSuccess(kontakter) {
  return {type: types.DELETE_KONTAKTER_SUCCESS, kontakter}
}

export function loadKontakter() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return KontakterApi.getAllKontakter().then(kontakter => {
      dispatch(loadKontakterSuccess(kontakter));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateKontakter(kontakter) {
  return function (dispatch) {
    return KontakterApi.updateKontakter(kontakter).then(responseKontakter => {
      dispatch(updateKontakterSuccess(responseKontakter));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createKontakter(kontakter) {
  return function (dispatch) {
    return KontakterApi.createKontakter(kontakter).then(responseKontakter => {
      dispatch(createKontakterSuccess(responseKontakter));
      return responseKontakter;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteKontakter(kontakter) {
  return function(dispatch) {
    return KontakterApi.deleteKontakter(kontakter).then(() => {
      console.log(`Deleted ${kontakter.name}`)
      dispatch(deleteKontakterSuccess(kontakter));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
