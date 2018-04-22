import ApisApi from '../api/ApisApi';
export const FETCH_REQUEST="FETCH_REQUEST";
export const FETCH_SUCCESS="FETCH_SUCCESS";
export const FETCH_ERROR="FETCH_ERROR";
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

export function fetchApis() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return ApisApi.getApis().then(([response, json]) =>{
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


export function addAdapterToComponent(api) {
	  return function (dispatch) {
	    return ApisApi.addAdapter(api).then(responseApi => {
	      dispatch(addAdapterToComponentSuccess(responseApi));
		    //eslint-disable-next-line
	      location.reload();
	      return responseApi;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function addAdapterToComponentSuccess(api) {
	  return {type: CREATE_SUCCESS, api}
}


export function deleteAdapterFromComponent(api) {
	  return function(dispatch) {
	    return ApisApi.deleteAdapter(api).then(() => {
	      dispatch(deleteAdapterFromComponentSuccess(api));
	    //eslint-disable-next-line
	      location.reload();
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}
export function deleteAdapterFromComponentSuccess(api) {
	  return {type: CREATE_SUCCESS, api}
}

export function addKlientToComponent(api) {
	  return function (dispatch) {
	    return ApisApi.addKlient(api).then(responseApi => {
	      dispatch(addKlientToComponentSuccess(responseApi));
		    //eslint-disable-next-line
	      location.reload();
	      return responseApi;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function addKlientToComponentSuccess(api) {
	  return {type: CREATE_SUCCESS, api}
}


export function deleteKlientFromComponent(api) {
	  return function(dispatch) {
	    return ApisApi.deleteKlient(api).then(() => {
	      dispatch(deleteKlientFromComponentSuccess(api));
	    //eslint-disable-next-line
	      location.reload();
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}
export function deleteKlientFromComponentSuccess(api) {
	  return {type: CREATE_SUCCESS, api}
}

