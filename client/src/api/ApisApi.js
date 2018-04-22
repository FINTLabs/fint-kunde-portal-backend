class ApisApi {


  static fetchApis() {
    const request = new Request(`http://localhost:8080/api/components`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getApis() {
	  const url='http://localhost:8080/api/components';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}


  static updateAdapter(Adapter) {
    const request = new Request(`http://localhost:8080/api/Apis/testing/${Adapter.name}`, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({
      	  name: Adapter.name,
      	  note: Adapter.note,
      	  shortDescription:Adapter.shortDescription})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createAdapter(Adapter) {
    const request = new Request(`http://localhost:8080/api/Apis/testing`, {
      method: 'POST',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }, 
      body: JSON.stringify({
    	  name: Adapter.name,
    	  note: Adapter.note,
    	  shortDescription:Adapter.shortDescription})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteAdapter(Adapter) {
    const request = new Request(`http://localhost:8080/api/Apis/testing/${Adapter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ApisApi;