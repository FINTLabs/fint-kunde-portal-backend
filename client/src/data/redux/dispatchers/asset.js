import AssetApi from "../../api/AssetApi";
import {
  createAssetSuccess,
  fetchAssetError,
  fetchAssetsSuccess,
  updateAssetSuccess,
  deleteAssetSuccess
} from "../actions/assets";
import {fetchKlienter} from "./client";
import {fetchAdapters} from "./adapter";
export function fetchAssets(org) {
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

export function createAsset(asset,org) {
  return function (dispatch) {
    return AssetApi.createAsset(asset,org).then(response => {
      dispatch(createAssetSuccess(asset));
      return;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateAsset(asset,org) {
  return function (dispatch) {
    return AssetApi.updateAsset(asset,org).then(response => {
      dispatch(updateAssetSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
} 

export function deleteAsset(asset,org) {
	  return function (dispatch) {
	    return AssetApi.deleteAsset(asset,org).then(response => {
	    	fetchAssets(org);
	    }).catch(error => {
	      throw(error);
	    });
	  };
}

export function deleteAdapterFromAsset(adapter, asset,  org) {
	  return function (dispatch) {
	    return AssetApi.deleteAdapterFromAsset(asset, adapter, org).then(() => {
      fetchAssets(org);
      fetchAdapters();
    }).catch(error => {
      throw(error);
    })
  };
}

export function addAdapterToAsset(adapter, asset, org) {
  return function (dispatch) {
    return AssetApi.addAdapterToAsset(asset, adapter, org).then(responseAdapter => {
      fetchAssets(org);
      fetchAdapters();
    }).catch(error => {
      throw(error);
    });
  }
}  

export function deleteClientFromAsset(client, asset,  org) {
	  return function (dispatch) {
	    return AssetApi.deleteClientFromAsset(asset, client, org).then(() => {
    fetchAssets(org);
    fetchKlienter();
  }).catch(error => {
    throw(error);
  })
 };
}

export function addClientToAsset(client, asset, org) {
	return function (dispatch) {
	  return AssetApi.addAdapterToAsset(asset, client, org).then(responseAdapter => {
	    fetchAssets(org);
	    fetchKlienter();
	  }).catch(error => {
	    throw(error);
	  });
 }
} 


