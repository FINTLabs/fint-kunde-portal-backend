/** @module Assets */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get  all   assets
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAssetsUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getAssetsUsingGET_1Operation, parameters)
}

/**
 * Create   asset
 * 
 * @param {string} orgName orgName
 * @param {module:types.Asset} asset asset
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function addAssetUsingPOST_1(orgName, asset) {
  const parameters = {
    path: {
      orgName
    },
    body: {
      asset
    }
  }
  return gateway.request(addAssetUsingPOST_1Operation, parameters)
}

/**
 * Get   asset  by   name
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAssetByNameUsingGET_1(orgName, assetId) {
  const parameters = {
    path: {
      orgName,
      assetId
    }
  }
  return gateway.request(getAssetByNameUsingGET_1Operation, parameters)
}

/**
 * Update   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @param {module:types.Asset} asset asset
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function updateAssetUsingPUT_1(orgName, assetId, asset) {
  const parameters = {
    path: {
      orgName,
      assetId
    },
    body: {
      asset
    }
  }
  return gateway.request(updateAssetUsingPUT_1Operation, parameters)
}

/**
 * Delete   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function removeAssetUsingDELETE_1(orgName, assetId) {
  const parameters = {
    path: {
      orgName,
      assetId
    }
  }
  return gateway.request(removeAssetUsingDELETE_1Operation, parameters)
}

/**
 * Link   adapter  to   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @param {string} adapterName adapterName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function linkAdapterToAssetUsingPUT_1(orgName, assetId, adapterName) {
  const parameters = {
    path: {
      orgName,
      assetId,
      adapterName
    }
  }
  return gateway.request(linkAdapterToAssetUsingPUT_1Operation, parameters)
}

/**
 * Unlink   adapter  from   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @param {string} adapterName adapterName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function unlinkAdapterFromAssetUsingDELETE_1(orgName, assetId, adapterName) {
  const parameters = {
    path: {
      orgName,
      assetId,
      adapterName
    }
  }
  return gateway.request(unlinkAdapterFromAssetUsingDELETE_1Operation, parameters)
}

/**
 * Link   client  to   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @param {string} clientName clientName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function linkClientToAssetUsingPUT_1(orgName, assetId, clientName) {
  const parameters = {
    path: {
      orgName,
      assetId,
      clientName
    }
  }
  return gateway.request(linkClientToAssetUsingPUT_1Operation, parameters)
}

/**
 * Unlink   client  from   asset
 * 
 * @param {string} orgName orgName
 * @param {string} assetId assetId
 * @param {string} clientName clientName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function unlinkClientFromAssetUsingDELETE_1(orgName, assetId, clientName) {
  const parameters = {
    path: {
      orgName,
      assetId,
      clientName
    }
  }
  return gateway.request(unlinkClientFromAssetUsingDELETE_1Operation, parameters)
}

const getAssetsUsingGET_1Operation = {
  path: '/api/assets/{orgName}/',
  method: 'get'
}

const addAssetUsingPOST_1Operation = {
  path: '/api/assets/{orgName}/',
  contentTypes: ['application/json'],
  method: 'post'
}

const getAssetByNameUsingGET_1Operation = {
  path: '/api/assets/{orgName}/{assetId}',
  method: 'get'
}

const updateAssetUsingPUT_1Operation = {
  path: '/api/assets/{orgName}/{assetId}',
  contentTypes: ['application/json'],
  method: 'put'
}

const removeAssetUsingDELETE_1Operation = {
  path: '/api/assets/{orgName}/{assetId}',
  method: 'delete'
}

const linkAdapterToAssetUsingPUT_1Operation = {
  path: '/api/assets/{orgName}/{assetId}/adapters/{adapterName}',
  method: 'put'
}

const unlinkAdapterFromAssetUsingDELETE_1Operation = {
  path: '/api/assets/{orgName}/{assetId}/adapters/{adapterName}',
  method: 'delete'
}

const linkClientToAssetUsingPUT_1Operation = {
  path: '/api/assets/{orgName}/{assetId}/clients/{clientName}',
  method: 'put'
}

const unlinkClientFromAssetUsingDELETE_1Operation = {
  path: '/api/assets/{orgName}/{assetId}/clients/{clientName}',
  method: 'delete'
}
