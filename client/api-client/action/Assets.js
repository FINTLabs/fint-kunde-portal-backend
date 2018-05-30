/** @module action/Assets */
// Auto-generated, edits will be overwritten
import * as Assets from '../Assets'

export const GET_ASSETS_USING_GET_1_START = 's/Assets/GET_ASSETS_USING_GET_1_START'
export const GET_ASSETS_USING_GET_1 = 's/Assets/GET_ASSETS_USING_GET_1'


export function getAssetsUsingGET_1(orgName, info) {
  return dispatch => {
    dispatch({ type: GET_ASSETS_USING_GET_1_START, meta: { info } })
    return Assets.getAssetsUsingGET_1(orgName)
      .then(response => dispatch({
        type: GET_ASSETS_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const ADD_ASSET_USING_POST_1_START = 's/Assets/ADD_ASSET_USING_POST_1_START'
export const ADD_ASSET_USING_POST_1 = 's/Assets/ADD_ASSET_USING_POST_1'


export function addAssetUsingPOST_1(orgName, asset, info) {
  return dispatch => {
    dispatch({ type: ADD_ASSET_USING_POST_1_START, meta: { info } })
    return Assets.addAssetUsingPOST_1(orgName, asset)
      .then(response => dispatch({
        type: ADD_ASSET_USING_POST_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const GET_ASSET_BY_NAME_USING_GET_1_START = 's/Assets/GET_ASSET_BY_NAME_USING_GET_1_START'
export const GET_ASSET_BY_NAME_USING_GET_1 = 's/Assets/GET_ASSET_BY_NAME_USING_GET_1'


export function getAssetByNameUsingGET_1(orgName, assetId, info) {
  return dispatch => {
    dispatch({ type: GET_ASSET_BY_NAME_USING_GET_1_START, meta: { info } })
    return Assets.getAssetByNameUsingGET_1(orgName, assetId)
      .then(response => dispatch({
        type: GET_ASSET_BY_NAME_USING_GET_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UPDATE_ASSET_USING_PUT_1_START = 's/Assets/UPDATE_ASSET_USING_PUT_1_START'
export const UPDATE_ASSET_USING_PUT_1 = 's/Assets/UPDATE_ASSET_USING_PUT_1'


export function updateAssetUsingPUT_1(orgName, assetId, asset, info) {
  return dispatch => {
    dispatch({ type: UPDATE_ASSET_USING_PUT_1_START, meta: { info } })
    return Assets.updateAssetUsingPUT_1(orgName, assetId, asset)
      .then(response => dispatch({
        type: UPDATE_ASSET_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const REMOVE_ASSET_USING_DELETE_1_START = 's/Assets/REMOVE_ASSET_USING_DELETE_1_START'
export const REMOVE_ASSET_USING_DELETE_1 = 's/Assets/REMOVE_ASSET_USING_DELETE_1'


export function removeAssetUsingDELETE_1(orgName, assetId, info) {
  return dispatch => {
    dispatch({ type: REMOVE_ASSET_USING_DELETE_1_START, meta: { info } })
    return Assets.removeAssetUsingDELETE_1(orgName, assetId)
      .then(response => dispatch({
        type: REMOVE_ASSET_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const LINK_ADAPTER_TO_ASSET_USING_PUT_1_START = 's/Assets/LINK_ADAPTER_TO_ASSET_USING_PUT_1_START'
export const LINK_ADAPTER_TO_ASSET_USING_PUT_1 = 's/Assets/LINK_ADAPTER_TO_ASSET_USING_PUT_1'


export function linkAdapterToAssetUsingPUT_1(orgName, assetId, adapterName, info) {
  return dispatch => {
    dispatch({ type: LINK_ADAPTER_TO_ASSET_USING_PUT_1_START, meta: { info } })
    return Assets.linkAdapterToAssetUsingPUT_1(orgName, assetId, adapterName)
      .then(response => dispatch({
        type: LINK_ADAPTER_TO_ASSET_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1_START = 's/Assets/UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1_START'
export const UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1 = 's/Assets/UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1'


export function unlinkAdapterFromAssetUsingDELETE_1(orgName, assetId, adapterName, info) {
  return dispatch => {
    dispatch({ type: UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1_START, meta: { info } })
    return Assets.unlinkAdapterFromAssetUsingDELETE_1(orgName, assetId, adapterName)
      .then(response => dispatch({
        type: UNLINK_ADAPTER_FROM_ASSET_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const LINK_CLIENT_TO_ASSET_USING_PUT_1_START = 's/Assets/LINK_CLIENT_TO_ASSET_USING_PUT_1_START'
export const LINK_CLIENT_TO_ASSET_USING_PUT_1 = 's/Assets/LINK_CLIENT_TO_ASSET_USING_PUT_1'


export function linkClientToAssetUsingPUT_1(orgName, assetId, clientName, info) {
  return dispatch => {
    dispatch({ type: LINK_CLIENT_TO_ASSET_USING_PUT_1_START, meta: { info } })
    return Assets.linkClientToAssetUsingPUT_1(orgName, assetId, clientName)
      .then(response => dispatch({
        type: LINK_CLIENT_TO_ASSET_USING_PUT_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}

export const UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1_START = 's/Assets/UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1_START'
export const UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1 = 's/Assets/UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1'


export function unlinkClientFromAssetUsingDELETE_1(orgName, assetId, clientName, info) {
  return dispatch => {
    dispatch({ type: UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1_START, meta: { info } })
    return Assets.unlinkClientFromAssetUsingDELETE_1(orgName, assetId, clientName)
      .then(response => dispatch({
        type: UNLINK_CLIENT_FROM_ASSET_USING_DELETE_1,
        payload: response.data,
        error: response.error,
        meta: {
          res: response.raw,
          info
        }
      }))
  }
}
