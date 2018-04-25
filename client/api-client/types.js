/** @module types */
// Auto-generated, edits will be overwritten

/**
 * @typedef Adapter
 * @memberof module:types
 * 
 * @property {string} clientId OAuth client id
 * @property {string[]} components 
 * @property {string} dn DN of the adapter. This is automatically set.
 * @property {string} name Username for the adapter. This is automatically set.
 * @property {string} note A note of the adapter.
 * @property {string} secret 
 * @property {string} shortDescription Short description of the adapter
 */

/**
 * @typedef Asset
 * @memberof module:types
 * 
 * @property {string[]} adapters 
 * @property {string} assetId 
 * @property {string[]} clients 
 * @property {string} description A description of what the component does.
 * @property {string} dn 
 * @property {string} name Technical name of the component.
 * @property {string} organisation 
 */

/**
 * @typedef Client
 * @memberof module:types
 * 
 * @property {string} asset DN of the organisation the client is connected to. This is automatically set.
 * @property {string} assetId OrgId of the organisation the client is connected to. This is automatically set.
 * @property {string} clientId OAuth client id
 * @property {string[]} components 
 * @property {string} dn DN of the client. This is automatically set.
 * @property {string} name Username for the client.
 * @property {string} note A note of the client.
 * @property {string} secret 
 * @property {string} shortDescription Short description of the client
 */

/**
 * @typedef Contact
 * @memberof module:types
 * 
 * @property {string} dn DN of the contact. This is automatically set.
 * @property {string} firstName First name of the contact.
 * @property {string} lastName Last name of the contact.
 * @property {string[]} legal Indicates if the contact is the primary legal contact for the organisation.
 * @property {string} mail Internet email address for the contact.
 * @property {string} mobile Mobile number of the contact. Should include landcode.
 * @property {string} nin National Idenitification Number (NIN). This would be fodselsnummer (11 digits)
 * @property {string[]} technical Indicates if the contact is the primary technical contact for the organisation.
 */

/**
 * @typedef Organisation
 * @memberof module:types
 * 
 * @property {string[]} components 
 * @property {string} displayName The official name of the organisation. See Enhetsregisteret (https://w2.brreg.no/enhet/sok/index.jsp)
 * @property {string} dn 
 * @property {string} legalContact 
 * @property {string} name Unique identifier for the organisation (UUID). This is automatically generated and should not be set.
 * @property {string} orgNumber The organisation number from Enhetsregisteret (https://w2.brreg.no/enhet/sok/index.jsp)
 * @property {string[]} techicalContacts 
 */

/**
 * @typedef ResponseEntity
 * @memberof module:types
 * 
 * @property {object} body 
 * @property {string} statusCode 
 * @property {number} statusCodeValue 
 */
