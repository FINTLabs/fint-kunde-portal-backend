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


//const BASE_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8080' : '';
//export const url='https://jsonplaceholder.typicode.com/posts';
//export const url='http://localhost:8080/api/adapters/testing';

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

export function fetchPostsWithRedux() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return fetchPosts().then(([response, json]) =>{
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

function fetchPosts() {
  const url='http://localhost:8080/api/adapters/testing';
  return fetch(url, { method: 'GET'})
     .then( response => Promise.all([response,response.json()]));
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

export function createAdapterSuccess(adapter) {
	  return {type: CREATE_SUCCESS, adapter}
}

export function updateAdapterSuccess(adapter) {
	  return {type: UPDATE_SUCCESS, adapter}
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

export function deleteAdapterSuccess(adapter) {
	  return {type: DELETE_SUCCESS, adapter}
	}
export function deleteAdapter(adapter) {
	  return function(dispatch) {
	    return AdaptersApi.deleteAdapter(adapter).then(() => {
	      console.log(`Deleted ${adapter.id}`)
	      dispatch(deleteAdapterSuccess(adapter));
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}