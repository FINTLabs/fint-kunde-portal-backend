import * as types from './actionTypes';
import AdaptersApi from '../api/AdaptersApi';

export function loadAdaptersSuccess(adapters) {
  return {type: types.LOAD_ADAPTERS_SUCCESS, adapters};
}

export function updateAdapterSuccess(adapter) {
  return {type: types.UPDATE_ADAPTER_SUCCESS, adapter}
}

export function createAdapterSuccess(adapter) {
  return {type: types.CREATE_ADAPTER_SUCCESS, adapter}
}

export function deleteAdapterSuccess(adapter) {
  return {type: types.DELETE_ADAPTER_SUCCESS, adapter}
}

export function loadAdapters() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return AdaptersApi.getAllAdapters().then(adapters => {
      dispatch(loadAdaptersSuccess(adapters));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateAdapter(adapter) {
  return function (dispatch) {
    return AdaptersApi.updateAdapter(adapter).then(responseAdapter => {
      dispatch(updateAdapterSuccess(responseAdapter));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createAdapter(adapter) {
  return function (dispatch) {
    return AdaptersApi.createAdapter(adapter).then(responseAdapter => {
      dispatch(createAdapterSuccess(responseAdapter));
      return responseAdapter;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteAdapter(adapter) {
  return function(dispatch) {
    return AdaptersApi.deleteAdapter(adapter).then(() => {
      console.log(`Deleted ${adapter.name}`)
      dispatch(deleteAdapterSuccess(adapter));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
