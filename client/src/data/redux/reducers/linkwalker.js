import {FETCH_LINKWALKER_TESTS_SUCCESS} from "../actions/types";

export default function linkwalker(state = [], action) {
  switch (action.type) {
    case FETCH_LINKWALKER_TESTS_SUCCESS:
      return {...state, tests: action.payload};
    default:
      return state
  }
}
