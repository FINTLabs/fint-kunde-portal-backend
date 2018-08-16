class AdapterApi {

  static getAdapters(organisation) {
    const url = `/api/adapters/${organisation}`; //.concat(org);
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static updateAdapter(adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}/${adapter.name}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
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

  static createAdapter(adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: adapter.name,
        note: adapter.note,
        shortDescription: adapter.shortDescription
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

  static addAdapterToComponent(adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/adapters/${adapter.name}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: adapter.name
      })
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapter(adapter, organisation) {
    const request = new Request(`/api/adapters/${organisation}/${adapter.name}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapterFromComponent(adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/adapters/${adapter.name}`, {
      method: 'DELETE',
      credentials: 'same-origin'
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
        method: 'GET',
        credentials: 'same-origin',
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
      credentials: 'same-origin',
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
