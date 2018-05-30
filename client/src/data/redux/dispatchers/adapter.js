import AdapterApi from "../../api/AdapterApi";
import {
  createAdapterSuccess,
  deleteAdapterSuccess,
  fetchAdapersSuccess,
  fetchAdaptersError,
  updateAdapterSuccess
} from "../actions/adapter";
import {fetchComponents} from "./component";


export function deleteAdapterFromComponent(adapter, component, org) {

  return function (dispatch) {
    return AdapterApi.deleteAdapterFromComponent(adapter, component, org).then(() => {
      //dispatch(removeAdapterFromComponentSuccess(adapter));
      fetchAdapters(org);
      fetchComponents();
      //return;
    }).catch(error => {
      throw(error);
    })
  };
}

export function deleteAdapter(adapter, org) {
  return function (dispatch) {
    return AdapterApi.deleteAdapter(adapter, org).then(() => {
      dispatch(deleteAdapterSuccess(adapter));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function addAdapterToComponent(adapter, component, org) {
  return function (dispatch) {
    return AdapterApi.addAdapterToComponent(adapter, component, org).then(responseAdapter => {
      //dispatch(addAdapterToComponentSuccess(responseAdapter));
      fetchAdapters(org);
      fetchComponents();
      //return responseAdapter;
    }).catch(error => {
      throw(error);
    });
  }
}

export function updateAdapter(adapter, organisation) {
  console.log(`org: ${organisation}`);
  console.log(`adapter: ${adapter}`);

  return function (dispatch) {
    console.log(`org: ${organisation}`);

    return AdapterApi.updateAdapter(adapter, organisation).then(responseAdapter => {
      dispatch(updateAdapterSuccess(responseAdapter));
      return responseAdapter;

    }).catch(error => {
      throw(error);
    });
  };
}

export function createAdapter(adapter, org) {

  return function (dispatch) {
    return AdapterApi.createAdapter(adapter, org).then(responseAdapter => {
      dispatch(createAdapterSuccess(responseAdapter));
      return responseAdapter;
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchAdapters(org) {

  return (dispatch) => {
    return AdapterApi.getAdapters(org).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchAdapersSuccess(json));
      }
      else {
        dispatch(fetchAdaptersError());
      }
    })
  }
}
