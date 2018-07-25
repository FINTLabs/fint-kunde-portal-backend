class AdapterApi {

  static getAdapters(organisation) {
    const url = `/api/adapters/${organisation}`; //.concat(org);
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }

  static updateAdapter(adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}/${adapter.name}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: adapter.name,
        note: adapter.note,
        shortDescription: adapter.shortDescription
      })
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createAdapter(Adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}`, {
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
      return response;
    }).catch(error => {
      return error;
    });
    /*
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
    */
  }

  static addAdapterToComponent(Adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/adapters/${Adapter.name}`, {
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

  static deleteAdapter(Adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}/${Adapter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapterFromComponent(adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/adapters/${adapter.name}`, {
      method: 'DELETE'
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getOpenIdSecret(adapter, organisation) {

    const request = new Request(`/api/adapters/${organisation}/${adapter.name}/secret`,
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

  static setPassword(adapter, password, organisation) {

    const request = new Request(`/api/adapters/${organisation}/${adapter.name}/password`, {
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
