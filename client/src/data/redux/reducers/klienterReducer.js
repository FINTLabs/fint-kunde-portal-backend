import * as types from '../../../actions/actionTypes';
import initialState from './initialState';


export default function klienterReducer(state = initialState.klienter, action) {

  switch (action.type) {

    case types.FETCH_CLIENT_SUCCESS:
      return {...state, clients: action.payload};

      default:
      return state;
  }
}
