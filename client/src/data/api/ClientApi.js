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

  static createKlient(client, organisation) {
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
      return response.json();
    }).catch(error => {
      return error;
    });
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
}

export default ClientApi;
