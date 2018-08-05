import {
  CREATE_ASSET_SUCCESS,
  FETCH_ASSETS_SUCCESS,
  UPDATE_ASSET_SUCCESS,
  DELETE_ASSET_SUCCESS
} from "../actions/types";

export default function asset(state = [], action) {

  switch (action.type) {
    case FETCH_ASSETS_SUCCESS:
      return {...state, assets: action.payload};
    case UPDATE_ASSET_SUCCESS:
      return state;
    case CREATE_ASSET_SUCCESS:
      return {...state, assets: [...state.assets, action.asset]};
    case DELETE_ASSET_SUCCESS:
        return {...state, assets: state.assets.filter(asset => action.asset !== asset)};
    default:
      return state
  }
}

