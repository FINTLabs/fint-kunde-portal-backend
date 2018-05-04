import AdaptersApi from '../api/AdaptersApi';
export const FETCH_ADAPTERS_REQUEST="FETCH_ADAPTERS_REQUEST";
export const FETCH_ADAPTERS_SUCCESS="FETCH_ADAPTERS_SUCCESS";
export const FETCH_ADAPTERS_ERROR="FETCH_ADAPTERS_ERROR";
export const UPDATE_REQUEST="UPDATE_REQUEST";
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR="UPDATE_ERROR";
export const CREATE_REQUEST="CREATE_REQUEST";
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR="CREATE_ERROR";
export const DELETE_REQUEST="DELETE_REQUEST";
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR="DELETE_ERROR";

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
		    //eslint-disable-next-line
	      location.reload();
	      return responseAdapter;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function createAdapterSuccess(adapter) {
	  return {type: CREATE_SUCCESS, adapter}
}

export function updateAdapterSuccess(adapter) {
	  return {type: UPDATE_SUCCESS, adapter}
	}
export function updateAdapter(adapter, org) {

	  return function (dispatch) {
	    return AdaptersApi.updateAdapter(adapter, org).then(responseAdapter => {
	    //  dispatch(updateAdapterSuccess(responseAdapter));
  	    //eslint-disable-next-line
	      location.assign("/adapters/adapters");
	      return responseAdapter;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function deleteAdapterSuccess(adapter) {
	  return {type: DELETE_SUCCESS, adapter}
	}
export function deleteAdapter(adapter, org) {
	  return function(dispatch) {
	    return AdaptersApi.deleteAdapter(adapter, org).then(() => {
	      console.log(`Deleted ${adapter.name}`)
	      dispatch(deleteAdapterSuccess(adapter));
	    //eslint-disable-next-line
	      location.reload();
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}

export function addAdapterToComponent(adapter, org, component) {
return function (dispatch) {
  return AdaptersApi.addAdapterToComponent(adapter, org).then(responseAdapter => {
    dispatch(addAdapterToComponentSuccess(responseAdapter));
	    //eslint-disable-next-line
    location.reload();
    return responseAdapter;
  }).catch(error => {
    throw(error);
  });
};
}

export function addAdapterToComponentSuccess(adapter) {
return {type: CREATE_SUCCESS, adapter}
}


export function deleteAdapterFromComponent(adapter, org, component) {
return function(dispatch) {
  return AdaptersApi.deleteAdapterFromComponent(adapter).then(() => {
    dispatch(deleteAdapterFromComponentSuccess(adapter));
  //eslint-disable-next-line
    location.reload();
    return;
  }).catch(error => {
    throw(error);
  })
}
}
export function deleteAdapterFromComponentSuccess(adapter) {
return {type: DELETE_SUCCESS, adapter}
}
