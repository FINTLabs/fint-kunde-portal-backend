import components from '../../api/components';
import {
	  CREATE_COMPONENT_SUCCESS,
	  DELETE_COMPONENT_SUCCESS,
	  FETCH_COMPONENTS_ERROR,
	  FETCH_COMPONENTS_REQUEST,
	  FETCH_COMPONENTS_SUCCESS,
	  UPDATE_COMPONENT_SUCCESS,
	  FETCH_TECHNICALCONTACTS_REQUEST,
	  FETCH_TECHNICALCONTACTS_SUCCESS,
	  FETCH_TECHNICALCONTACTS_ERROR,
	  FETCH_LEGALCONTACT_REQUEST,
	  FETCH_LEGALCONTACT_SUCCESS,
	  FETCH_LEGALCONTACT_ERROR,
	  FETCH_ORG_REQUEST,
	  FETCH_ORG_SUCCESS,
	  FETCH_ORG_ERROR,
	  LINK_COMPONENT_SUCCESS,
	  UNLINK_COMPONENT_SUCCESS
	  
	} from "./actionTypes";

function fetchComponentsRequest(){
	  return {
	    type: FETCH_COMPONENTS_REQUEST
	  }
	}

function fetchComponentsSuccess(payload) {
	  return {
	    type: FETCH_COMPONENTS_SUCCESS,
	    payload
	  }
	}
function fetchComponentsError() {
	  return {
	    type: FETCH_COMPONENTS_ERROR
	  }
	}

function fetchTechnicalContactsRequest(){
	  return {
	    type: FETCH_TECHNICALCONTACTS_REQUEST
	  }
	}

function fetchTechnicalContactsSuccess(payload) {
	  return {
	    type: FETCH_TECHNICALCONTACTS_SUCCESS,
	    payload
	  }
	}
function fetchTechnicalContactsError() {
	  return {
	    type: FETCH_TECHNICALCONTACTS_ERROR
	  }
	}

function fetchLegalContactRequest(){
	  return {
	    type: FETCH_LEGALCONTACT_REQUEST
	  }
	}

function fetchLegalContactSuccess(payload) {
	  return {
	    type: FETCH_LEGALCONTACT_SUCCESS,
	    payload
	  }
	}
function fetchLegalContactError() {
	  return {
	    type: FETCH_LEGALCONTACT_ERROR
	  }
	}

export function fetchComponents() {

	return (dispatch) => {
  	dispatch(fetchComponentsRequest());
    return components.getComponents().then(([response, json]) =>{
    	if(response.status === 200){
        dispatch(fetchComponentsSuccess(json));
      }
      else{
        dispatch(fetchComponentsError());
      }
    })
  }
}

export function fetchTechnicalContacts() {

	return (dispatch) => {
  	dispatch(fetchTechnicalContactsRequest());
    return components.getTechnicalContacts().then(([response, json]) =>{
    	if(response.status === 200){
    		dispatch(fetchTechnicalContactsSuccess(json));
      }
      else{
        dispatch(fetchTechnicalContactsError());
      }
    })
  }
}

export function fetchLegalContact() {

	return (dispatch) => {
  	dispatch(fetchLegalContactRequest());
    return components.getLegalContact().then(([response, json]) =>{
    	if(response.status === 200){
    		dispatch(fetchLegalContactSuccess(json));
      }
      else{
        dispatch(fetchLegalContactError());
      }
    })
  }
}

export function fetchOrganisation() {

	return (dispatch) => {
  	dispatch(fetchOrgRequest());
    return components.getOrganisation().then(([response, json]) =>{
    	if(response.status === 200){
        dispatch(fetchOrgSuccess(json));
      }
      else{
        dispatch(fetchOrgError());
      }
    })
  }
}

function fetchOrgRequest(payload) {
	  return {
	    type: FETCH_ORG_REQUEST,
	    payload
	  }
	}

function fetchOrgSuccess(payload) {
	  return {
	    type: FETCH_ORG_SUCCESS,
	    payload
	  }
	}

function fetchOrgError() {
	  return {
	    type: FETCH_ORG_ERROR
	  }
	}

export function linkComponent(api) {
	  return function (dispatch) {
	    return components.linkComponent(api).then(responseApi => {
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
	return {type: LINK_COMPONENT_SUCCESS, api}
}

export function unlinkComponent(api) {
	  return function (dispatch) {
	    return components.unlinkComponent(api).then(responseApi => {
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
	return {type: UNLINK_COMPONENT_SUCCESS, api}
}


export function removeTechnicalContact(kontakt) {
	  return function (dispatch) {
	    return components.removeTechnicalContact(kontakt).then(responseKontakt => {
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
	    return components.addTechnicalContact(nin).then(responseKontakt => {
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
	    return components.setLegalContact(nin).then(responseKontakt => {
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
	    return components.unsetLegalContact(kontakt).then(responseKontakt => {
	    //eslint-disable-next-line
	      location.assign("/kontakter/kontakter");
	      return responseKontakt;
	    }).catch(error => {
	      throw(error);
	    });
	  };
	}
