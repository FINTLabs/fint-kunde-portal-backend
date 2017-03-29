import { IHAL } from './IHAL';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';

export interface ICommonComponent {
  dn: string;             //
  uuid: string;           // (ou) Unique identifier for the component (UUID). This is automatically generated and should not be set
  technicalName: string;  // (fintCompTechnicalName) Technical name of the component.
  displayName: string;    // (fintCompDisplayName) Displayname of the component.
  description?: string;   // (description) A description of what the component does.
  status?: string;

  // Extra properties
  configured: boolean;
  clients: IComponentClient[];
  adapter: IComponentAdapter;

  // Frontend only, not transmitted to/from server
  isSelected?: boolean;
  wasConfigured?: boolean;
}
export interface IComponentHALPage extends IHAL {
  _embedded: {
    componentDtoList: ICommonComponent[]
  }
}

