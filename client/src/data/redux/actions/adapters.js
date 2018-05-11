import AdaptersApi from "../../api/AdaptersApi";
import {
	  CREATE_ADAPTER_SUCCESS,
	  DELETE_ADAPTER_SUCCESS,
	  FETCH_ADAPTERS_ERROR,
	  FETCH_ADAPTERS_REQUEST,
	  FETCH_ADAPTERS_SUCCESS,
	  UPDATE_ADAPTER_SUCCESS
	} from "./actionTypes";

function fetchAdaptersRequest(){
  return {
    type: FETCH_ADAPTERS_REQUEST
  }
}

function fetchAdapersSuccess(payload) {
	  return {
	    type: FETCH_ADAPTERS_SUCCESS,
	    payload
	  }
	}
function fetchAdaptersError() {
  return {
    type: FETCH_ADAPTERS_ERROR
  }
}

export function fetchAdapters(org) {

	return (dispatch) => {
  	dispatch(fetchAdaptersRequest());
    return AdaptersApi.getAdapters(org).then(([response, json]) =>{
    	if(response.status === 200){
        dispatch(fetchAdapersSuccess(json));
      }
      else{
        dispatch(fetchAdaptersError());
      }
    })
  }
}


export function createAdapter(adapter, org) {
	return function (dispatch) {
	    return AdaptersApi.createAdapter(adapter, org).then(responseAdapter => {
	      dispatch(createAdapterSuccess(responseAdapter));
	      return responseAdapter;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function createAdapterSuccess(adapter) {
	  return {type: CREATE_ADAPTER_SUCCESS, adapter}
}

export function updateAdapterSuccess(adapter) {
	  return {type: UPDATE_ADAPTER_SUCCESS, adapter}
	}
export function updateAdapter(adapter, org) {
	  return function (dispatch) {
	    return AdaptersApi.updateAdapter(adapter, org).then(responseAdapter => {
		     dispatch(updateAdapterSuccess(responseAdapter));
			 return responseAdapter;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function deleteAdapterSuccess(adapter) {
	  return {type: DELETE_ADAPTER_SUCCESS, adapter}
	}
export function deleteAdapter(adapter, org) {
	  return function(dispatch) {
	    return AdaptersApi.deleteAdapter(adapter, org).then(() => {
	      dispatch(deleteAdapterSuccess(adapter));
        //eslint-disable-next-line
        location.reload();
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}

export function addAdapterToComponent(adapter, component, org) {
	return function (dispatch) {
		return AdaptersApi.addAdapterToComponent(adapter, component, org).then(responseAdapter => {
			dispatch(addAdapterToComponentSuccess(responseAdapter));
			//eslint-disable-next-line
			location.assign("/adapters/adapters");
			return responseAdapter;
  }).catch(error => {
    throw(error);
  });
};
}

export function addAdapterToComponentSuccess(adapter) {
	return {type: CREATE_ADAPTER_SUCCESS, adapter}
}


export function deleteAdapterFromComponent(adapter, component, org) {

	return function(dispatch) {
		return AdaptersApi.deleteAdapterFromComponent(adapter, component, org).then(() => {
			dispatch(deleteAdapterFromComponentSuccess(adapter));
			//eslint-disable-next-line
			location.assign("/adapters/adapters");
			return;
	  }).catch(error => {
	    throw(error);
	  })
}
}
export function deleteAdapterFromComponentSuccess(adapter) {
	return {type: DELETE_ADAPTER_SUCCESS, adapter}
}
