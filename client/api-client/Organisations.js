/** @module Organisations */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * Get   organisation
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getOrganisationDetailsUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getOrganisationDetailsUsingGET_1Operation, parameters)
}

/**
 * Update   organisation
 * 
 * @param {string} orgName orgName
 * @param {module:types.Organisation} organisation organisation
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function updateOrganisationUsingPUT_1(orgName, organisation) {
  const parameters = {
    path: {
      orgName
    },
    body: {
      organisation
    }
  }
  return gateway.request(updateOrganisationUsingPUT_1Operation, parameters)
}

/**
 * Link   component
 * 
 * @param {string} orgName orgName
 * @param {string} compName compName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function linkComponentUsingPUT_1(orgName, compName) {
  const parameters = {
    path: {
      orgName,
      compName
    }
  }
  return gateway.request(linkComponentUsingPUT_1Operation, parameters)
}

/**
 * Unlink   component
 * 
 * @param {string} orgName orgName
 * @param {string} compName compName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function unLinkComponentUsingDELETE_1(orgName, compName) {
  const parameters = {
    path: {
      orgName,
      compName
    }
  }
  return gateway.request(unLinkComponentUsingDELETE_1Operation, parameters)
}

/**
 * Get   legal   contact
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getLegalContactUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getLegalContactUsingGET_1Operation, parameters)
}

/**
 * Set   legal   contact
 * 
 * @param {string} orgName orgName
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function linkLegalContactUsingPUT_1(orgName, nin) {
  const parameters = {
    path: {
      orgName,
      nin
    }
  }
  return gateway.request(linkLegalContactUsingPUT_1Operation, parameters)
}

/**
 * Unset   legal   contact
 * 
 * @param {string} orgName orgName
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function unLinkLegalContactUsingDELETE_1(orgName, nin) {
  const parameters = {
    path: {
      orgName,
      nin
    }
  }
  return gateway.request(unLinkLegalContactUsingDELETE_1Operation, parameters)
}

/**
 * Get   technical   contacts
 * 
 * @param {string} orgName orgName
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function getTechnicalContactsUsingGET_1(orgName) {
  const parameters = {
    path: {
      orgName
    }
  }
  return gateway.request(getTechnicalContactsUsingGET_1Operation, parameters)
}

/**
 * Add   technical   contact
 * 
 * @param {string} orgName orgName
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function linkTechnicalContactUsingPUT_1(orgName, nin) {
  const parameters = {
    path: {
      orgName,
      nin
    }
  }
  return gateway.request(linkTechnicalContactUsingPUT_1Operation, parameters)
}

/**
 * Remove   technical   contact
 * 
 * @param {string} orgName orgName
 * @param {string} nin nin
 * @return {Promise<module:types.ResponseEntity>} OK
 */
export function unLinkTechnicalContactUsingDELETE_1(orgName, nin) {
  const parameters = {
    path: {
      orgName,
      nin
    }
  }
  return gateway.request(unLinkTechnicalContactUsingDELETE_1Operation, parameters)
}

const getOrganisationDetailsUsingGET_1Operation = {
  path: '/api/organisations/{orgName}/',
  method: 'get'
}

const updateOrganisationUsingPUT_1Operation = {
  path: '/api/organisations/{orgName}/',
  contentTypes: ['application/json'],
  method: 'put'
}

const linkComponentUsingPUT_1Operation = {
  path: '/api/organisations/{orgName}/components/{compName}',
  method: 'put'
}

const unLinkComponentUsingDELETE_1Operation = {
  path: '/api/organisations/{orgName}/components/{compName}',
  method: 'delete'
}

const getLegalContactUsingGET_1Operation = {
  path: '/api/organisations/{orgName}/contacts/legal',
  method: 'get'
}

const linkLegalContactUsingPUT_1Operation = {
  path: '/api/organisations/{orgName}/contacts/legal/{nin}',
  method: 'put'
}

const unLinkLegalContactUsingDELETE_1Operation = {
  path: '/api/organisations/{orgName}/contacts/legal/{nin}',
  method: 'delete'
}

const getTechnicalContactsUsingGET_1Operation = {
  path: '/api/organisations/{orgName}/contacts/technical',
  method: 'get'
}

const linkTechnicalContactUsingPUT_1Operation = {
  path: '/api/organisations/{orgName}/contacts/technical/{nin}',
  method: 'put'
}

const unLinkTechnicalContactUsingDELETE_1Operation = {
  path: '/api/organisations/{orgName}/contacts/technical/{nin}',
  method: 'delete'
}
