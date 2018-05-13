import {
  CREATE_ADAPTER_SUCCESS,
  DELETE_ADAPTER_SUCCESS,
  FETCH_ADAPTERS_SUCCESS,
  UPDATE_ADAPTER_SUCCESS
} from "../actions/types";

export default function adapter(state = [], action) {
  switch (action.type) {
    case FETCH_ADAPTERS_SUCCESS:
      return {...state, adapters: action.payload};
    case UPDATE_ADAPTER_SUCCESS:
      return state;
    case CREATE_ADAPTER_SUCCESS:
      return {...state, adapters: [...state.clients, action.adapter]};
    case DELETE_ADAPTER_SUCCESS:
      return {...state, adapters: state.clients.filter(adapter => action.adapter !== adapter)};
    default:
      return state
  }
}
