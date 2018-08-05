import {
  CREATE_ASSET_SUCCESS,
  DELETE_ASSET_SUCCESS,
  FETCH_ASSETS_ERROR,
  FETCH_ASSETS_SUCCESS,
  UPDATE_ASSET_SUCCESS,
  ADD_ADAPER_TO_ASSET,
  DELETE_ADAPTER_FROM_ASSET,
  ADD_CLIENT_TO_ASSET,
  DELETE_CLIENT_FROM_ASSET,
} from "./types";


export function fetchAssetsSuccess(payload) {
  return {type: FETCH_ASSETS_SUCCESS, payload}
}

export function fetchAssetError() {
  return {type: FETCH_ASSETS_ERROR}
}

export function createAssetSuccess(asset) {
  return {type: CREATE_ASSET_SUCCESS, asset}
}

export function updateAssetSuccess(asset) {
  return {type: UPDATE_ASSET_SUCCESS, asset}
}

export function deleteAssetSuccess(asset) {
	  return {type: DELETE_ASSET_SUCCESS, asset}
}

export function addAdapterToAssetSuccess(asset) {
	  return {type: ADD_ADAPER_TO_ASSET, asset}
}
export function deleteAdapterFromAsset(asset) {
	  return {type: DELETE_ADAPTER_FROM_ASSET, asset}
}
export function addClientToAssetSuccess(payload) {
	  return {type: ADD_CLIENT_TO_ASSET, payload}
}
export function deleteClientFromAssetSuccess(payload) {
	  return {type: DELETE_CLIENT_FROM_ASSET, payload}
}



