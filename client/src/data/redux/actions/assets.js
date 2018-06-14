import {
  CREATE_ASSET_SUCCESS,
  DELETE_ASSET_SUCCESS,
  FETCH_ASSETS_ERROR,
  FETCH_ASSETS_SUCCESS,
  UPDATE_ASSET_SUCCESS,
  ADD_ADAPER_TO_ASSET,
  DELETE_ADAPTER_FROM_ASSET,
} from "./types";


export function fetchAssetsSuccess(payload) {
  return {type: FETCH_ASSETS_SUCCESS, payload}
}

export function fetchAssetError() {
  return {type: FETCH_ASSETS_ERROR}
}

export function createAssetSuccess(payload) {
  return {type: CREATE_ASSET_SUCCESS, payload}
}

export function updateAssetSuccess(payload) {
  return {type: UPDATE_ASSET_SUCCESS, payload}
}

export function deleteAssetSuccess(payload) {
	  return {type: DELETE_ASSET_SUCCESS, payload}
}
export function addAdapterToAssetSuccess(payload) {
	  return {type: ADD_ADAPER_TO_ASSET, payload}
}
export function deleteAdapterFromAsset(payload) {
	  return {type: DELETE_ADAPTER_FROM_ASSET, payload}
}




