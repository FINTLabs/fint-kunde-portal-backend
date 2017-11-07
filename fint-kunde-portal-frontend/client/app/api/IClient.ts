export interface IClient {
  dn: string;               // DN of the client. This is automatically set.
  name: string;             // (cn) Username for the client. This is automatically set.
  shortDescription: string; // (sn) Short description of the client
  orgId: string;            // (company) OrgId of the organisation the client is connected to. This is automatically set.
  note: string;             // (description) A note of the client.
  secret: string;         // (userPassword) Client secret.
  clientId: string;
  clientSecret: string;
}

export class EmptyClient implements IClient {
  dn = null;
  name = null;
  shortDescription = null;
  orgId = null;
  note = null;
  secret = null;
  clientId = null;
  clientSecret = null;
}
