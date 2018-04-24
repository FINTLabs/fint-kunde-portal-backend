class ApisApi {

  static getApis() {
	  const url='http://localhost:8080/api/components';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static getOrganisation() {
	  const url='http://localhost:8080/api/organisations/testing/';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static linkComponent(api) {
    const request = new Request(`http://localhost:8080/api/organisations/testing/components/${api}`, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({
      	  name: api.name})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static unlinkComponent(api) {
	    const request = new Request(`http://localhost:8080/api/organisations/testing/components/${api}`, {
	      method: 'DELETE',
	      headers: new Headers({
	          'Content-Type': 'application/json'
	        }), 
	        body: JSON.stringify({
	      	  name: api.name})
	      });


	    return fetch(request).then(response => {
	      return response.json();
	    }).catch(error => {
	      return error;
	    });
  }
}
export default ApisApi;