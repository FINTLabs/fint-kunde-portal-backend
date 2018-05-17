class AdapterApi {

  static getAdapters(org) {

    const url = '/api/adapters/testing'; //.concat(org);
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }

  static updateAdapter(Adapter, org) {

    const request = new Request(`/api/adapters/testing/${Adapter.name}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Adapter.name,
        note: Adapter.note,
        shortDescription: Adapter.shortDescription
      })
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createAdapter(Adapter, org) {

    const request = new Request(`/api/adapters/testing`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Adapter.name,
        note: Adapter.note,
        shortDescription: Adapter.shortDescription
      })
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static addAdapterToComponent(Adapter, component, org) {

    const request = new Request(`/api/components/${component.name}/${org}/adapters/${Adapter.name}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Adapter.name
      })
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapter(Adapter, org) {
    const request = new Request(`/api/adapters/testing/${Adapter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapterFromComponent(adapter, component, org) {

    const request = new Request(`/api/components/${component.name}/${org}/adapters/${adapter.name}`, {
      method: 'DELETE'
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getOpenIdSecret(adapter, org) {
    org = 'testing';
    const request = new Request(`/api/adapters/${org}/${adapter.name}/secret`,
      {
        method: 'GET'
      });
    return fetch(request)
      .then(response => {
          return response.text();
        }
      )
      .catch(error => {
        return error
      });
  }

  static setPassword(adapter, password, org) {

    const request = new Request(`/api/adapters/${org}/${adapter.name}/password`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'text/plain'
      },
      body: password
    });
    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }
}

export default AdapterApi;
