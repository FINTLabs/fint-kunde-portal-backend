class ClientApi {

  static fetchKlienter() {
    const request = new Request(`/api/clients/testing`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getKlienter() {
    const url = '/api/clients/testing';
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }

  static updateClient(client) {
    const request = new Request(`/api/clients/testing/${client.name}`, {
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

  static createKlient(Klient) {
    const request = new Request(`/api/clients/testing`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Klient.name,
        note: Klient.note,
        shortDescription: Klient.shortDescription
      })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteKlient(Klient) {
    const request = new Request(`/api/clients/testing/${Klient.name}`, {
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
