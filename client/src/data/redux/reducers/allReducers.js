import {
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  
  CREATE_ADAPTER_SUCCESS,
  DELETE_ADAPTER_SUCCESS,
  FETCH_ADAPTERS_ERROR,
  FETCH_ADAPTERS_REQUEST,
  FETCH_ADAPTERS_SUCCESS,
  UPDATE_ADAPTER_SUCCESS,
  
  CREATE_COMPONENT_SUCCESS,
  DELETE_COMPONENT_SUCCESS,
  FETCH_COMPONENTS_ERROR,
  FETCH_COMPONENTS_REQUEST,
  FETCH_COMPONENTS_SUCCESS,
  UPDATE_COMPONENTS_SUCCESS,
  
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS
  
} from "../actions/actionTypes";

const allReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CLIENT_REQUEST:
      return state;
    case FETCH_CLIENT_SUCCESS:
      return {...state, clients: action.payload};
    case UPDATE_CLIENT_SUCCESS:
      return state;
    case CREATE_CLIENT_SUCCESS:
      return {...state, clients: [...state.clients, action.client]};
    case DELETE_CLIENT_SUCCESS:
      return {...state, clients: state.clients.filter(client => action.client !== client)};
      
    case FETCH_ADAPTERS_SUCCESS:
      return {...state, adapters: action.payload};
    case UPDATE_ADAPTER_SUCCESS:
      return state;
    case CREATE_ADAPTER_SUCCESS:
     return {...state, adapters: [...state.adapters, action.adapter]};
    case DELETE_ADAPTER_SUCCESS:
     return {...state, adapters: state.adapters.filter(adapter => action.adapter !== adapter)};

    case FETCH_COMPONENTS_REQUEST:
        return state;
    case FETCH_COMPONENTS_SUCCESS:
        return {...state, components: action.payload};
 
    case FETCH_CONTACTS_REQUEST:
        return state;
    case FETCH_CONTACTS_SUCCESS:
        return {...state, contacts: action.payload};
        
    case "FETCH_TECHNICALCONTACTS_SUCCESS":
      return {...state, technicalContacts: action.payload};
    case "FETCHLEGALCONTACT_SUCCESS":
      return {...state, legalContact: action.payload};
    case "FETCH_ORG_REQUEST":
      return state;
    case "FETCH_ORG_SUCCESS":
      return {...state, organisation: action.payload};

    case "UPDATE_REQUEST":
      return {
        ...state, updateData: {...state.updateData, [action.updatedDataId]: action.updatedData}
      }

    case "DELETE_SUCCESS": {
      const newState = Object.assign([], state);
      const indexOfAdapterToDelete = state.posts.findIndex(({id}) => id === action.payload);
      newState.splice(indexOfAdapterToDelete, 1);
      return newState;
    }

    case "CREATE_SUCCESS": {
    	return {...state, technicalContacts: action.payload};
    }
    case "UPDATE_SUCCESS": {
      const newState = Object.assign([], state);
      const indexOfAdapterToUpdate = state.posts.findIndex(({id}) => id === action.payload);
      newState.splice(indexOfAdapterToUpdate, 1);
      return newState;
    }
    default:
      return state;
  }
}
export default allReducer

