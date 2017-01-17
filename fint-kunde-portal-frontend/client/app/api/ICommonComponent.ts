import { IHAL } from './IHAL';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';

export interface ICommonComponent {
  dn: string;
  uuid: string;           // Unique identifier for the component (UUID). This is automatically generated and should not be set
  displayName: string;    // Displayname of the component.
  technicalName: string;  // Technical name of the component.
  description?: string;    // A description of what the component does.

  isConfigured: boolean;
  clients: IComponentClient[];
  adapter: IComponentAdapter;

  // Frontend only, not transmitted to/from server
  isEdit?: boolean;
}
export interface IComponentHALPage extends IHAL {
  _embedded: {
    componentDtoList: ICommonComponent[]
  }
}

