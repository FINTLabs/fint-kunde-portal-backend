/** @module Components */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get  all  components
 */
export function getComponentsUsingGET_1() {
  return gateway.request(getComponentsUsingGET_1Operation)
}

/**
 * Get  component  by  name
 * 
 * @param {string} compName compName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getComponentUsingGET_1(compName) {
  const parameters = {
    path: {
      compName
    }
  }
  return gateway.request(getComponentUsingGET_1Operation, parameters)
}

/**
 * Add  adapter  to  component
 * 
 * @param {string} adapterName adapterName
 * @param {string} compName compName
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function addAdapterToComponentUsingPUT_1(adapterName, compName, orgName) {
  const parameters = {
    path: {
      adapterName,
      compName,
      orgName
    }
  }
  return gateway.request(addAdapterToComponentUsingPUT_1Operation, parameters)
}

/**
 * Remove  adapter  from  component
 * 
 * @param {string} adapterName adapterName
 * @param {string} compName compName
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function removeAdapterFromComponentUsingDELETE_1(adapterName, compName, orgName) {
  const parameters = {
    path: {
      adapterName,
      compName,
      orgName
    }
  }
  return gateway.request(removeAdapterFromComponentUsingDELETE_1Operation, parameters)
}

/**
 * Add  client  to  component
 * 
 * @param {string} clientName clientName
 * @param {string} compName compName
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function addClientToComponentUsingPUT_1(clientName, compName, orgName) {
  const parameters = {
    path: {
      clientName,
      compName,
      orgName
    }
  }
  return gateway.request(addClientToComponentUsingPUT_1Operation, parameters)
}

/**
 * Remove  client  from  component
 * 
 * @param {string} clientName clientName
 * @param {string} compName compName
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function removeClientFromComponentUsingDELETE_1(clientName, compName, orgName) {
  const parameters = {
    path: {
      clientName,
      compName,
      orgName
    }
  }
  return gateway.request(removeClientFromComponentUsingDELETE_1Operation, parameters)
}

const getComponentsUsingGET_1Operation = {
  path: '/api/components',
  method: 'get'
}

const getComponentUsingGET_1Operation = {
  path: '/api/components/{compName}',
  method: 'get'
}

const addAdapterToComponentUsingPUT_1Operation = {
  path: '/api/components/{compName}/{orgName}/adapters/{adapterName}',
  method: 'put'
}

const removeAdapterFromComponentUsingDELETE_1Operation = {
  path: '/api/components/{compName}/{orgName}/adapters/{adapterName}',
  method: 'delete'
}

const addClientToComponentUsingPUT_1Operation = {
  path: '/api/components/{compName}/{orgName}/clients/{clientName}',
  method: 'put'
}

const removeClientFromComponentUsingDELETE_1Operation = {
  path: '/api/components/{compName}/{orgName}/clients/{clientName}',
  method: 'delete'
}
