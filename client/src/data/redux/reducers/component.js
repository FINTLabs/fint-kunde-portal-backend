import {FETCH_COMPONENTS_SUCCESS} from "../actions/types";

export default function component(state = [], action) {
  switch (action.type) {
    case FETCH_COMPONENTS_SUCCESS:
      return {...state, components: action.payload};
    default:
      return state
  }
}
