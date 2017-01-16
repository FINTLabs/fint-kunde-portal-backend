import { IHAL } from 'app/api/IHAL';

export interface IContact {
  oldNin?: string;            // Backup of nin.
  dn: string;                 // DN of the contact. This is automatically set.
  nin: string;                // National Idenitification Number (NIN). This would be fødselsnummer (11 digits)
  firstName: string;          // First name of the contact.
  lastName: string;           // Last name of the contact.
  mail: string;               // Internet email address for the contact.
  mobile: string;             // Mobile number of the contact. Should include landcode.
  orgId?: string;             // OrgId of the organisation the contact is connected to.
  primaryTechnical?: boolean; // Indicates if the contact is the primary technical contact for the organisation.
  primaryLegal?: boolean;     // Indicates if the contact is the primary legal contact for the organisation.
  isEditing?: boolean;        // Used only for ux
}
export interface IContactHALPage extends IHAL {
  _embedded: {
    contactList: IContact[]
  }
}

export class EmptyContact implements IContact {
  uuid = null;
  dn = null;
  nin = null;
  firstName = null;
  lastName = null;
  mail = null;
  mobile = null;
  orgId = null;
  primaryTechnical = false;
  primaryLegal = false;
}
