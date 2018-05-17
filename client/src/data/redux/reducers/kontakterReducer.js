import * as types from '../../../actions/actionTypes';
import initialState from './initialState';


export default function kontakterReducer(state = initialState.kontakter, action) {
  // state variable here reps just an array of courses
  switch (action.type) {
    case types.LOAD_KONTAKTER_SUCCESS:
      // return action.kontakter;
      // return action.kontakter.map(kontakter => Object.assign({}, kontakter, Object.assign([])))
      //    return Object.assign([], state, action.kontakter)
      return {...state, posts: action.payload};
    case types.CREATE_KONTAKTER_SUCCESS:
      //     browserHistory.push(`/kontakter/${action.kontakter.id}`)
      return [
        ...state.filter(kontakter => kontakter.id !== action.kontakter.id),
        Object.assign({}, action.kontakter)
      ]
    case types.UPDATE_KONTAKTER_SUCCESS:
      return [
        ...state.filter(kontakter => kontakter.id !== action.kontakter.id),
        Object.assign({}, action.kontakter)
      ]
    case types.DELETE_KONTAKTER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfKontakterToDelete = state.findIndex(kontakter => {
        return kontakter.id == action.kontakter.id
      })
      newState.splice(indexOfKontakterToDelete, 1);
//      browserHistory.push('/kontakter');
      return newState;
    }
    default:
      return state;
  }
}
