import KlienterApi from '../api/KlienterApi';
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

export function fetchKlienter() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return KlienterApi.getKlienter().then(([response, json]) =>{
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


export function createKlient(klient) {
	  return function (dispatch) {
	    return KlienterApi.createKlient(klient).then(responseKlient => {
	      dispatch(createKlientSuccess(responseKlient));
		    //eslint-disable-next-line
	      location.reload();
	      return responseKlient;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function createKlientSuccess(klient) {
	  return {type: CREATE_SUCCESS, klient}
}

export function updateKlientSuccess(klient) {
	  return {type: UPDATE_SUCCESS, klient}
	}
export function updateKlienter(klienter) {
	  return function (dispatch) {
	    return KlienterApi.updateKlienter(klienter).then(responseKlienter => {
	    //  dispatch(updateKlienterSuccess(responseKlienter));
  	    //eslint-disable-next-line
	      location.assign("/klienters/klienters");
	      return responseKlienter;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function deleteKlienterSuccess(klienter) {
	  return {type: DELETE_SUCCESS, klienter}
	}
export function deleteKlienter(klienter) {
	  return function(dispatch) {
	    return KlienterApi.deleteKlienter(klienter).then(() => {
	      console.log(`Deleted ${klienter.id}`)
	      dispatch(deleteKlienterSuccess(klienter));
	    //eslint-disable-next-line
	      location.reload();
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}