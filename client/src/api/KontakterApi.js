class KontakterApi {


  static getAllKontakter() {
    const request = new Request(`localhost:8080/api/contacts/testing`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateKontakter(Kontakter) {
    const request = new Request(`localhost:8080/api/contacts/testing/${Kontakter.name}`, {
      method: 'PUT',
      body: JSON.stringify({Kontakter: Kontakter})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createKontakter(Kontakter) {
    const request = new Request(`localhost:8080/api/contacts/testing`, {
      method: 'POST',
      body: JSON.stringify({Kontakter: Kontakter})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteKontakter(Kontakter) {
    const request = new Request(`http://localhost:8080/api/contacts/testing/${Kontakter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default KontakterApi;