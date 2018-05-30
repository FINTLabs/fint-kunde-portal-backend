/** @module Clients */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get  all  clients
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getAllClientsUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getAllClientsUsingGET_1Operation, parameters)
}

/**
 * Add  client
 * 
 * @param {string} orgName orgName
 * @param {module:types.Client} client client
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function addClientUsingPOST_1(orgName, client) {
  const parameters = {
    path: {
      orgName
    },
    body: {
      client
    }
  }
  return gateway.request(addClientUsingPOST_1Operation, parameters)
}

/**
 * Get  client
 * 
 * @param {string} orgName orgName
 * @param {string} clientName clientName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getClientUsingGET_1(orgName, clientName) {
  const parameters = {
    path: {
      orgName,
      clientName
    }
  }
  return gateway.request(getClientUsingGET_1Operation, parameters)
}

/**
 * Update  client
 * 
 * @param {string} orgName orgName
 * @param {string} clientName clientName
 * @param {module:types.Client} client client
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function updateClientUsingPUT_1(orgName, clientName, client) {
  const parameters = {
    path: {
      orgName,
      clientName
    },
    body: {
      client
    }
  }
  return gateway.request(updateClientUsingPUT_1Operation, parameters)
}

/**
 * Delete  client
 * 
 * @param {string} orgName orgName
 * @param {string} clientName clientName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function deleteClientUsingDELETE_1(orgName, clientName) {
  const parameters = {
    path: {
      orgName,
      clientName
    }
  }
  return gateway.request(deleteClientUsingDELETE_1Operation, parameters)
}

/**
 * Reset  client  password
 * 
 * @param {string} orgName orgName
 * @param {string} clientName clientName
 * @param {string} newPassword newPassword
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function resetClientPasswordUsingPUT_1(orgName, clientName, newPassword) {
  const parameters = {
    path: {
      orgName,
      clientName
    },
    body: {
      newPassword
    }
  }
  return gateway.request(resetClientPasswordUsingPUT_1Operation, parameters)
}

/**
 * Get   client   open id   secret
 * 
 * @param {string} orgName orgName
 * @param {string} clientName clientName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getClientSecretUsingGET_1(orgName, clientName) {
  const parameters = {
    path: {
      orgName,
      clientName
    }
  }
  return gateway.request(getClientSecretUsingGET_1Operation, parameters)
}

const getAllClientsUsingGET_1Operation = {
  path: '/api/clients/{orgName}',
  method: 'get'
}

const addClientUsingPOST_1Operation = {
  path: '/api/clients/{orgName}',
  contentTypes: ['application/json'],
  method: 'post'
}

const getClientUsingGET_1Operation = {
  path: '/api/clients/{orgName}/{clientName}',
  method: 'get'
}

const updateClientUsingPUT_1Operation = {
  path: '/api/clients/{orgName}/{clientName}',
  contentTypes: ['application/json'],
  method: 'put'
}

const deleteClientUsingDELETE_1Operation = {
  path: '/api/clients/{orgName}/{clientName}',
  method: 'delete'
}

const resetClientPasswordUsingPUT_1Operation = {
  path: '/api/clients/{orgName}/{clientName}/password',
  contentTypes: ['application/json'],
  method: 'put'
}

const getClientSecretUsingGET_1Operation = {
  path: '/api/clients/{orgName}/{clientName}/secret',
  method: 'get'
}
