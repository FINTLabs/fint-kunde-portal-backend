import AssetApi from "../../api/AssetApi";
import {
  createAssetSuccess,
  fetchAssetError,
  fetchAssetsSuccess,
  updateAssetSuccess
} from "../actions/assets";


export function fetchAssets(org) {
	  console.log(`org: ${org}`);

  return (dispatch) => {
    return AssetApi.fetchAssets(org).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchAssetsSuccess(json));
      }
      else {
        dispatch(fetchAssetError());
      }
    })
  }
}

export function createAsset(kontakt) {
  return function (dispatch) {
    return AssetApi.createAsset(kontakt).then(response => {
      dispatch(createAssetSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateAsset(kontakt) {
  return function (dispatch) {
    return AssetApi.updateAsset(kontakt).then(response => {
      dispatch(updateAssetSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

