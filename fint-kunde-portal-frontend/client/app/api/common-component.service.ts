import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

export interface IComponentClient {
  id: number;
  componentId: number;
  name: string;
  apiKey: string;
  apiSecret: string;
  isConfirmed: boolean;
}
export interface IComponentAdapter {
  id: number;
  componentId: number;
  name: string;
  apiKey: string;
  apiSecret: string;
  isConfirmed: boolean;
}
export interface ICommonComponent {
  id: number;
  name: string;
  status: boolean;
  isConfigured: boolean;
  clients: IComponentClient[];
  adapters: IComponentAdapter;
}
export interface IEditableComponent extends ICommonComponent {
  isEdit: boolean;
  isUpdated: boolean;
  isSelected: boolean;
};

function UUID() {
  function s(n) { return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n); }
  function h(n) { return (n | 0).toString(16); }
  return [
    s(4) + s(4), s(4),
    '4' + s(3),                    // UUID version 4
    h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
    // s(4) + s(4) + s(4),
    Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
  ].join('-');
}


function generate_key() {
  let cc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+:<>{}[]".split('');
  let key = '';
  for (let i = 0; i < 50; i++) key += cc[Math.floor(Math.random() * cc.length)];
  return key;
}

@Injectable()
export class CommonComponentService {
  components: ICommonComponent[];

  constructor(private http: Http) {
    this.components = [
      {
        id: 0, name: 'Arbeidstaker', status: true, isConfigured: true,
        adapters: { id: 0, componentId: 0, isConfirmed: true, apiKey: '60acb466-ab58-4ac2-8b9a-e37983a03b97', apiSecret: 'fint7xguq6_10ith3v3e!9=-0^p%w)y**afe_7n85(+gi=qr0%f2(p', name: 'Aggresso' },
        clients: [
          { id: 0, componentId: 0, isConfirmed: true, apiKey: '', apiSecret: '', name: 'VFS' },
          { id: 1, componentId: 0, isConfirmed: true, apiKey: '', apiSecret: '', name: 'BizTalk' },
          { id: 2, componentId: 0, isConfirmed: true, apiKey: '', apiSecret: '', name: 'VigoBAS' },
          { id: 3, componentId: 0, isConfirmed: true, apiKey: '', apiSecret: '', name: 'QM Plus' }]
      },
      {
        id: 1, name: 'Variable transaksjoner', status: true, isConfigured: true,
        adapters: { id: 1, componentId: 1, isConfirmed: true, apiKey: '67dfbaca-9561-4f53-ba6c-84a17d35db86', apiSecret: 'fint3p&dfma#6edm$c__mxgmaqg#mp-7113#(fix9o9eta+k97@^_#', name: 'Visma' },
        clients: [
          { id: 4, componentId: 1, isConfirmed: true, apiKey: '', apiSecret: '', name: 'VFS' }]
      },

      {
        id: 2, name: 'Elev', status: true, isConfigured: true,
        adapters: { id: 2, componentId: 2, isConfirmed: true, apiKey: '6981932b-910e-4b9b-9c4e-ac0d66c8f934', apiSecret: 'fint(5y4-6xq1l+&ullmq(hs10)!aabk=p(+^@c!rw+h19+=f9%a30', name: 'VFS' },
        clients: [
          { id: 5, componentId: 2, isConfirmed: true, apiKey: '', apiSecret: '', name: 'VigoBAS' },
          { id: 6, componentId: 2, isConfirmed: true, apiKey: '', apiSecret: '', name: 'Varsling' },
          { id: 7, componentId: 2, isConfirmed: true, apiKey: '', apiSecret: '', name: 'Skoleskyss' }]
      },
      {
        id: 3, name: 'Undervisningsgrupper', status: false, isConfigured: true,
        adapters: { id: 3, componentId: 3, isConfirmed: true, apiKey: '0de13f7f-e8e0-466d-8875-aa0e044d2155', apiSecret: 'fint#apf7=1vg(r5x(jj6!je&4)$ac1)58fr7p1m_!-m*(*d1m#_c+', name: 'VFS' },
        clients: [
          { id: 8, componentId: 3, isConfirmed: true, apiKey: '', apiSecret: '', name: 'It\'s Learning' },
          { id: 9, componentId: 3, isConfirmed: true, apiKey: '', apiSecret: '', name: 'VigoBAS' }]
      },
      { id: 4, name: 'Organisasjonsstruktur', status: true, isConfigured: false, adapters: null, clients: [] },
      { id: 5, name: 'Kodeverk', status: false, isConfigured: false, adapters: null, clients: [] }
    ];
  }

  generateUUID() {
    return UUID();
  }

  generateSecret() {
    return generate_key();
  }

  all() {
    return this.components;
  }

  allConfigured() {
    return this.components.filter(comp => comp.isConfigured);
  }

  get(id: number) {
    let index = this.components.findIndex(comp => comp.id === id);
    if (index > -1) {
      return this.components[index];
    }
    return null;
  }

  allClients() {
    return Array.from(this.components, comp => comp.clients).reduce((a, b) => a.concat(b));
  }

  allAdapters() {
    return Array.from(this.components, comp => comp.adapters);
  }

  getClient(id: number): IComponentClient {
    let component = this.components.filter(comp => comp.clients.filter(client => client.id === id).length);
    if (component.length) {
      return component[0].clients.filter(client => client.id === id)[0];
    }
    return null;
  }

  saveClient(client: IComponentClient) {
    let component = this.get(client.componentId);
    if (!client.id) { client.id = this.allClients().length + 1; }
    let index = component.clients.findIndex(c => c.id === client.id);
    if (index > -1) {
      component.clients[index] = client;
    } else {
      component.clients.push(client);
    }
  }

  removeAdapter(adapter: IComponentAdapter) {
    this.get(adapter.componentId).adapters = null;
  }

  saveAdapter(adapter: IComponentAdapter) {
    let component = this.get(adapter.componentId);
    if (!adapter.id) { adapter.id = this.allAdapters().length + 1; }
    component.adapters = adapter;
  }

  save(component: ICommonComponent) {
    if (isNaN(component.id)) {
      this.add(component);
    } else {
      this.update(component);
    }
  }

  private add(component: ICommonComponent) {
    this.components.push(component);
  }

  private update(component: ICommonComponent) {
    let index = this.components.findIndex(comp => comp.id === component.id);
    this.components[index] = component;
  }

  revokeAccess(component: ICommonComponent) {
    let index = this.components.findIndex(comp => comp.id === component.id);
    this.components.splice(index, 1);
  }
}
