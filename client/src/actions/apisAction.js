import ApisApi from '../api/ApisApi';
export const FETCH_REQUEST="FETCH_REQUEST";
export const FETCHORG_REQUEST="FETCHORG_REQUEST";
export const FETCH_SUCCESS="FETCH_SUCCESS";
export const FETCHORG_SUCCESS="FETCHORG_SUCCESS";
export const FETCHTECHNICALCONTACTS_SUCCESS="FETCHTECHNICALCONTACTS_SUCCESS";
export const FETCHLEGALCONTACT_SUCCESS="FETCHLEGALCONTACT_SUCCESS";
export const FETCH_ERROR="FETCH_ERROR";
export const UPDATE_REQUEST="UPDATE_REQUEST";
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR="UPDATE_ERROR";
export const UNLINK_REQUEST="UNLINK_REQUEST";
export const UNLINK_SUCCESS = 'UNLINK_SUCCESS';
export const UNLINK_ERROR="UNLINK_ERROR";

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

function fetchTechnicalContactsSuccess(payload) {
	  return {
	    type: FETCHTECHNICALCONTACTS_SUCCESS,
	    payload
	  }
	}

function fetchLegalContactSuccess(payload) {
	  return {
	    type: FETCHLEGALCONTACT_SUCCESS,
	    payload
	  }
	}

function fetchPostsError() {
	  return {
	    type: FETCH_ERROR
	  }
	}


function fetchOrgSuccess(payload) {
	  return {
	    type: FETCHORG_SUCCESS,
	    payload
	  }
	}

function fetchOrgError() {
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

export function fetchTechnicalContacts() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return ApisApi.getTechnicalContacts().then(([response, json]) =>{
      	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
    	if(response.status === 200){
    		dispatch(fetchTechnicalContactsSuccess(json));
      }
      else{
    	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
        dispatch(fetchPostsError());
      }
    })
  }
}

export function fetchLegalContact() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return ApisApi.getLegalContact().then(([response, json]) =>{
      	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
    	if(response.status === 200){
			console.log(json)
    		dispatch(fetchLegalContactSuccess(json));
      }
      else{
    	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
        dispatch(fetchPostsError());
      }
    })
  }
}

export function fetchOrganisation() {

	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return ApisApi.getOrganisation().then(([response, json]) =>{
      	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
    	if(response.status === 200){
        dispatch(fetchOrgSuccess(json));
      }
      else{
    	console.log('fetching', "background: blue; color: yellow; padding-left:10px;");	
        dispatch(fetchOrgError());
      }
    })
  }
}

export function linkComponent(api) {
	  return function (dispatch) {
	    return ApisApi.linkComponent(api).then(responseApi => {
	      dispatch(linkComponentSuccess(responseApi));
		    //eslint-disable-next-line
	      location.assign("/apis/apis");
	      return responseApi;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function linkComponentSuccess(api) {
	return {type: UPDATE_SUCCESS, api}
}

export function unlinkComponent(api) {
	  return function (dispatch) {
	    return ApisApi.unlinkComponent(api).then(responseApi => {
	      dispatch(unlinkComponentSuccess(responseApi));
		    //eslint-disable-next-line
	      location.assign("/apis/apis");
	      return responseApi;
	    }).catch(error => {
	      throw(error);
	    });
	  };
}


export function unlinkComponentSuccess(api) {
	return {type: UPDATE_SUCCESS, api}
}


export function removeTechnicalContact(kontakt) {
	  return function (dispatch) {
	    return ApisApi.removeTechnicalContact(kontakt).then(responseKontakt => {
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function addTechnicalContact(nin) {
	  return function (dispatch) {
	    return ApisApi.addTechnicalContact(nin).then(responseKontakt => {
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function setLegalContact(nin) {
	  return function (dispatch) {
	    return ApisApi.setLegalContact(nin).then(responseKontakt => {
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

export function unsetLegalContact(kontakt) {
	  return function (dispatch) {
	    return ApisApi.unsetLegalContact(kontakt).then(responseKontakt => {
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}

//export function addKlientToComponent(api) {
//	  return function (dispatch) {
//	    return ApisApi.addKlient(api).then(responseApi => {
//	      dispatch(addKlientToComponentSuccess(responseApi));
//		    //eslint-disable-next-line
//	      location.reload();
//	      return responseApi;
//	    }).catch(error => {
//	      throw(error);
//	    });
//	  };
//}
//
//export function addKlientToComponentSuccess(api) {
//	  return {type: LINK_SUCCESS, api}
//}
//
//
//export function deleteKlientFromComponent(api) {
//	  return function(dispatch) {
//	    return ApisApi.deleteKlient(api).then(() => {
//	      dispatch(deleteKlientFromComponentSuccess(api));
//	    //eslint-disable-next-line
//	      location.reload();
//	      return;
//	    }).catch(error => {
//	      throw(error);
//	    })
//	  }
//	}
//export function deleteKlientFromComponentSuccess(api) {
//	  return {type: DELETE_SUCCESS, api}
//}
//
