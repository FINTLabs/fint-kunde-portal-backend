class ClientApi {

  static fetchKlienter(organisation) {
    const request = new Request(`/api/clients/${organisation}`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getKlienter(organisation) {
    const url = `/api/clients/${organisation}`;
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }

  static updateClient(client, organisation) {
    const request = new Request(`/api/clients/${organisation}/${client.name}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name: client.name,
        note: client.note,
        shortDescription: client.shortDescription
      })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createClient(client, organisation) {
    const request = new Request(`/api/clients/${organisation}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: client.name,
        note: client.note,
        shortDescription: client.shortDescription
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

  static deleteKlient(client, organisation) {
    const request = new Request(`/api/clients/${organisation}/${client.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static addClientToComponent(Adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/clients/${Adapter.name}`, {
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

  static deleteClientFromComponent(adapter, component, organisation) {

    const request = new Request(`/api/components/${component.name}/${organisation}/clients/${adapter.name}`, {
      method: 'DELETE'
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getOpenIdSecret(adapter, organisation) {

    const request = new Request(`/api/clients/${organisation}/${adapter.name}/secret`,
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

    const request = new Request(`/api/clients/${organisation}/${adapter.name}/password`, {
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

export default ClientApi;
