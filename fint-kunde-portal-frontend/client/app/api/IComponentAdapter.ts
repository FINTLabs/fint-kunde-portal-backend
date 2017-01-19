export interface IComponentAdapter {
  dn: string;               // DN of the adapter. This is automatically set.
  uuid: string;             // (cn) Username for the adapter. This is automatically set.
  shortDescription: string; // (sn) Short description of the adapter
  orgId: string;            // (company) OrgId of the organisation the adapter is connected to. This is automatically set.
  note: string;             // (description) A note of the adapter.
  password: string;         // (userPassword) Adapter password.

  confirmation?: boolean;   // Only for frontend. Do not transmit this to server
}
