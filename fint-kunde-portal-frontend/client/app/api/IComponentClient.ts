export interface IComponentClient {
  dn: string;               // DN of the client. This is automatically set.
  uuid: string;             // (cn) Username for the client. This is automatically set.
  shortDescription: string; // (sn) Short description of the client
  orgId: string;            // (company) OrgId of the organisation the client is connected to. This is automatically set.
  note: string;             // (description) A note of the client.
  password: string;         // (userPassword) Client password.

  confirmation?: boolean;   // Only for frontend. Do not transmit this to server
}

export class EmptyClient implements IComponentClient {
  dn = null;
  uuid = null;
  shortDescription = null;
  orgId = null;
  note = null;
  password = null;
}
