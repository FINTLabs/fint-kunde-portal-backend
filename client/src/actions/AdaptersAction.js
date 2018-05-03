import AdaptersApi from '../api/AdaptersApi';
export const FETCH_REQUEST="FETCH_REQUEST";
export const FETCH_SUCCESS="FETCH_SUCCESS";
export const FETCH_ERROR="FETCH_ERROR";
export const UPDATE_REQUEST="UPDATE_REQUEST";
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR="UPDATE_ERROR";
export const CREATE_REQUEST="CREATE_REQUEST";
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR="CREATE_ERROR";
export const DELETE_REQUEST="DELETE_REQUEST";
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR="DELETE_ERROR";


function fetchPostsRequest(){
  return {
    type: FETCH_REQUEST
  }
}

function fetchPostsSuccess(payload) {
  return {
    type: FETCH_SUCCESS,
    payload
  }
}

function fetchPostsError() {
  return {
    type: FETCH_ERROR
  }
}

export function fetchAdapters(org) {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return AdaptersApi.getAdapters(org).then(([response, json]) =>{
      	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
    	if(response.status === 200){
        dispatch(fetchPostsSuccess(json));
      }
      else{
    	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
        dispatch(fetchPostsError());
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

export function addAdapterToComponent(adapter, org) {
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


export function deleteAdapterFromComponent(adapter) {
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
