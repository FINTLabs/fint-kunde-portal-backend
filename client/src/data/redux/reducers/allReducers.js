import {
  CREATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  FETCH_CLIENT_REQUEST,
  FETCH_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS
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

    case "FETCH_ADAPTERS_SUCCESS":
      return {...state, adapters: action.payload};
    case "FETCHTECHNICALCONTACTS_SUCCESS":
      return {...state, technicalContacts: action.payload};
    case "FETCHLEGALCONTACT_SUCCESS":
      return {...state, legalContact: action.payload};
    case "FETCHORG_REQUEST":
      return state;
    case "FETCHORG_SUCCESS":
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
      const newState = Object.assign([], state);
      const indexOfAdapterToSave = state.posts.findIndex(({id}) => id === action.payload);
      newState.splice(indexOfAdapterToSave, 1);
      return newState;
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

