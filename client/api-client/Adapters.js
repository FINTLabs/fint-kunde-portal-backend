/** @module Adapters */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get  all  adapters
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAllAdaptersUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getAllAdaptersUsingGET_1Operation, parameters)
}

/**
 * Add  adapter
 * 
 * @param {string} orgName orgName
 * @param {module:types.Adapter} adapter adapter
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function addAdapterUsingPOST_1(orgName, adapter) {
  const parameters = {
    path: {
      orgName
    },
    body: {
      adapter
    }
  }
  return gateway.request(addAdapterUsingPOST_1Operation, parameters)
}

/**
 * Get  adapter
 * 
 * @param {string} orgName orgName
 * @param {string} adapterName adapterName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAdapterUsingGET_1(orgName, adapterName) {
  const parameters = {
    path: {
      orgName,
      adapterName
    }
  }
  return gateway.request(getAdapterUsingGET_1Operation, parameters)
}

/**
 * Update  adapter
 * 
 * @param {string} orgName orgName
 * @param {string} adapterName adapterName
 * @param {module:types.Adapter} adapter adapter
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function updateAdapterUsingPUT_1(orgName, adapterName, adapter) {
  const parameters = {
    path: {
      orgName,
      adapterName
    },
    body: {
      adapter
    }
  }
  return gateway.request(updateAdapterUsingPUT_1Operation, parameters)
}

/**
 * Delete  adapter
 * 
 * @param {string} orgName orgName
 * @param {string} adapterName adapterName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function deleteAdapterUsingDELETE_1(orgName, adapterName) {
  const parameters = {
    path: {
      orgName,
      adapterName
    }
  }
  return gateway.request(deleteAdapterUsingDELETE_1Operation, parameters)
}

/**
 * Reset  adapter  password
 * 
 * @param {string} orgName orgName
 * @param {string} adapterName adapterName
 * @param {string} newPassword newPassword
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function resetAdapterPasswordUsingPUT_1(orgName, adapterName, newPassword) {
  const parameters = {
    path: {
      orgName,
      adapterName
    },
    body: {
      newPassword
    }
  }
  return gateway.request(resetAdapterPasswordUsingPUT_1Operation, parameters)
}

/**
 * Get   adapter   open id   secret
 * 
 * @param {string} orgName orgName
 * @param {string} adapterName adapterName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAdapterSecretUsingGET_1(orgName, adapterName) {
  const parameters = {
    path: {
      orgName,
      adapterName
    }
  }
  return gateway.request(getAdapterSecretUsingGET_1Operation, parameters)
}

const getAllAdaptersUsingGET_1Operation = {
  path: '/api/adapters/{orgName}',
  method: 'get'
}

const addAdapterUsingPOST_1Operation = {
  path: '/api/adapters/{orgName}',
  contentTypes: ['application/json'],
  method: 'post'
}

const getAdapterUsingGET_1Operation = {
  path: '/api/adapters/{orgName}/{adapterName}',
  method: 'get'
}

const updateAdapterUsingPUT_1Operation = {
  path: '/api/adapters/{orgName}/{adapterName}',
  contentTypes: ['application/json'],
  method: 'put'
}

const deleteAdapterUsingDELETE_1Operation = {
  path: '/api/adapters/{orgName}/{adapterName}',
  method: 'delete'
}

const resetAdapterPasswordUsingPUT_1Operation = {
  path: '/api/adapters/{orgName}/{adapterName}/password',
  contentTypes: ['text/plain'],
  method: 'put'
}

const getAdapterSecretUsingGET_1Operation = {
  path: '/api/adapters/{orgName}/{adapterName}/secret',
  method: 'get'
}
