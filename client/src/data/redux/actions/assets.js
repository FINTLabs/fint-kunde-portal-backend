import {
  CREATE_ASSET_SUCCESS,
  FETCH_ASSETS_ERROR,
  FETCH_ASSETS_SUCCESS,
  UPDATE_ASSET_SUCCESS
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






