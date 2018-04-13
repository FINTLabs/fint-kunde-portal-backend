import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { BrowserRouter as Router, Route } from 'react-router-dom'


export default function adaptersReducer(state = initialState.adapters, action) {

  switch(action.type) {
    case types.FETCH_ADAPTERS_SUCCESS:
//       return action.adapters;
     // return action.adapters.map(adapter => Object.assign({}, adapter, Object.assign([])))
//     return Object.assign([], state, action.payload)
//    	console.log("GGGG:"+action.payload);
//    	let posts : action.payload
//    	console.log("GGGG:"+posts)
     return {...state,posts:action.payload};
//    case types.CREATE_SUCCESS:
//      browserHistory.push(`/adapters/${action.adapter.id}`)
//      return [
//        ...state.filter(adapter => adapter.id !== action.adapter.id),
//        Object.assign({}, action.adapter)
//      ]
//    case types.UPDATE_SUCCESS:
//      browserHistory.push(`/adapters/${action.adapter.id}`)
//      return [
//        ...state.filter(adapter => adapter.id !== action.adapter.id),
//        Object.assign({}, action.adapter)
//      ]
//    case types.DELETE_SUCCESS: {
//      const newState = Object.assign([], state);
//      const indexOfAdapterToDelete = state.findIndex(adapter => {return adapter.id == action.adapter.id})
//      newState.splice(indexOfAdapterToDelete, 1);
//      browserHistory.push('/adapters');
//      return newState;
//    }
    default: 
      return state;
  }
}
