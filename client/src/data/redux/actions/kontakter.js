import KontakterApi from "../../api/KontakterApi";

import {
	  FETCH_CONTACTS_REQUEST,
	  FETCH_CONTACTS_SUCCESS,
	  FETCH_CONTACTS_ERROR
	  
	} from "../actions/actionTypes";
	
export const UPDATE_REQUEST="UPDATE_REQUEST";
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR="UPDATE_ERROR";
export const CREATE_REQUEST="CREATE_REQUEST";
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR="CREATE_ERROR";
export const DELETE_REQUEST="DELETE_REQUEST";
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR="DELETE_ERROR";

function fetchContactsRequest(){
	  return {
	    type: FETCH_CONTACTS_REQUEST
	  }
	}

	function fetchContactsSuccess(payload) {
	  return {
	    type: FETCH_CONTACTS_SUCCESS,
	    payload
	  }
	}

	function fetchContactsError() {
	  return {
	    type: FETCH_CONTACTS_ERROR
	  }
	}

export function fetchKontakter() {

	return (dispatch) => {
  	dispatch(fetchContactsRequest());
    return KontakterApi.getKontakter().then(([response, json]) =>{
    	if(response.status === 200){
        dispatch(fetchContactsSuccess(json));
      }
      else{
        dispatch(fetchContactsError());
      }
    })
  }
}


export function createKontakt(kontakt) {
	  return function (dispatch) {
	    return KontakterApi.createKontakt(kontakt).then(responseKontakt => {
	      dispatch(createKontaktSuccess(responseKontakt));
		    //eslint-disable-next-line
	      location.reload();
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function createKontaktSuccess(kontakt) {
	  return {type: CREATE_SUCCESS, kontakt}
}

export function updateKontaktSuccess(kontakt) {
	  return {type: UPDATE_SUCCESS, kontakt}
	}
export function updateKontakt(kontakt) {
	  return function (dispatch) {
	    return KontakterApi.updateKontakt(kontakt).then(responseKontakt => {
	    //  dispatch(updateKontakterSuccess(responseKontakter));
  	    //eslint-disable-next-line
	      location.reload("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}


export function deleteKontaktSuccess(kontakt) {
	  return {type: DELETE_SUCCESS, kontakt}
	}
export function deleteKontakt(kontakt) {
	  return function(dispatch) {
	    return KontakterApi.deleteKontakt(kontakt).then(() => {
	      dispatch(deleteKontaktSuccess(kontakt));
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return;
	    }).catch(error => {
	      throw(error);
	    })
	  }
	}

export function createKontakter(kontakter) {
  return function (dispatch) {
    return KontakterApi.createKontakter(kontakter).then(responseKontakter => {
      dispatch(createKontaktSuccess(responseKontakter));
      return responseKontakter;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteKontakter(kontakter) {
  return function(dispatch) {
    return KontakterApi.deleteKontakter(kontakter).then(() => {
      dispatch(deleteKontaktSuccess(kontakter));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}
