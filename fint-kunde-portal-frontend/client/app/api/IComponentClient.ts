export interface IComponentClient {
  dn: string;
  uuid: string;
  shortDescription: string;
  orgId: string;
  note: string;
  password: string;
}

export class EmptyClient implements IComponentClient {
  dn = null;
  uuid = null;
  shortDescription = null;
  orgId = null;
  note = null;
  password = null;
}
