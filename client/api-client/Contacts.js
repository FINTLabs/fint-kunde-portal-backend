/** @module Contacts */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get  all  contacts
 */
export function getContactsUsingGET_1() {
  return gateway.request(getContactsUsingGET_1Operation)
}

/**
 * Create  new  contact
 * 
 * @param {module:types.Contact} contact contact
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function createContactUsingPOST_1(contact) {
  const parameters = {
    body: {
      contact
    }
  }
  return gateway.request(createContactUsingPOST_1Operation, parameters)
}

/**
 * Get  contact  by  nin
 * 
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getContactUsingGET_1(nin) {
  const parameters = {
    path: {
      nin
    }
  }
  return gateway.request(getContactUsingGET_1Operation, parameters)
}

/**
 * Update  contact
 * 
 * @param {module:types.Contact} contact contact
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function updateContactUsingPUT_1(contact, nin) {
  const parameters = {
    body: {
      contact
    },
    path: {
      nin
    }
  }
  return gateway.request(updateContactUsingPUT_1Operation, parameters)
}

/**
 * Delete  a  contact
 * 
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function deleteContactsUsingDELETE_1(nin) {
  const parameters = {
    path: {
      nin
    }
  }
  return gateway.request(deleteContactsUsingDELETE_1Operation, parameters)
}

const getContactsUsingGET_1Operation = {
  path: '/api/contacts',
  method: 'get'
}

const createContactUsingPOST_1Operation = {
  path: '/api/contacts',
  contentTypes: ['application/json;charset=UTF-8'],
  method: 'post'
}

const getContactUsingGET_1Operation = {
  path: '/api/contacts/{nin}',
  method: 'get'
}

const updateContactUsingPUT_1Operation = {
  path: '/api/contacts/{nin}',
  contentTypes: ['application/json;charset=UTF-8'],
  method: 'put'
}

const deleteContactsUsingDELETE_1Operation = {
  path: '/api/contacts/{nin}',
  method: 'delete'
}
