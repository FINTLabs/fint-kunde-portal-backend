class AdaptersApi {


  static getAllAdapters() {
    const request = new Request(`localhost:8080/api/adapters/testing`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateAdapter(Adapter) {
    const request = new Request(`localhost:8080/api/adapters/testing/${Adapter.name}`, {
      method: 'PUT',
      body: JSON.stringify({Adapter: Adapter})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createAdapter(Adapter) {
    const request = new Request(`localhost:8080/api/adapters/testing`, {
      method: 'POST',
 //     body: JSON.stringify({Adapter: Adapter}
      body: JSON.stringify({
    	    name: 'Adapter.name',
    	    note: 'Adapter.note',
    	  })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapter(Adapter) {
    const request = new Request(`http://localhost:8080/api/adapters/testing/${Adapter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default AdaptersApi;