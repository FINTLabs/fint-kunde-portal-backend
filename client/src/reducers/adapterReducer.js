import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function adapterReducer(state = initialState.adapters, action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.LOAD_ADAPTERS_SUCCESS:
      // return action.adapters;
     // return action.adapters.map(adapter => Object.assign({}, adapter, Object.assign([])))
 //    return Object.assign([], state, action.adapters)
     return {...state,posts:action.payload};
    case types.CREATE_ADAPTER_SUCCESS:
      browserHistory.push(`/adapters/${action.adapter.id}`)
      return [
        ...state.filter(adapter => adapter.id !== action.adapter.id),
        Object.assign({}, action.adapter)
      ]
    case types.UPDATE_ADAPTER_SUCCESS:
      return [
        ...state.filter(adapter => adapter.id !== action.adapter.id),
        Object.assign({}, action.adapter)
      ]
    case types.DELETE_ADAPTER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfAdapterToDelete = state.findIndex(adapter => {return adapter.id == action.adapter.id})
      newState.splice(indexOfAdapterToDelete, 1);
      browserHistory.push('/adapters');
      return newState;
    }
    default: 
      return state;
  }
}
