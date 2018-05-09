import PropTypes from 'prop-types';

class AdaptersApi {
	
  static getAdapters(org) {
 
	  const url='http://localhost:8080/api/adapters/'.concat(org);
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static updateAdapter(Adapter, org) {

    const request = new Request(`http://localhost:8080/api/adapters/${org}/${Adapter.name}`, {
      method: 'PUT',
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
    	console.log("response")
    	console.log(response)
      return response.json();
    }).catch(error => {
      return error;
    });
  }
  
  static createAdapter(Adapter, org) {
	  
    const request = new Request(`http://localhost:8080/api/adapters/${org}`, {
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

  static addAdapterToComponent(Adapter, component, org) {
  	  
	    const request = new Request(`http://localhost:8080/api/components/${component.value}/${org}/adapters/${Adapter.name}`, {
	      method: 'PUT',
	      headers: {
	          'Accept': '*/*',
	          'Content-Type': 'application/json'
	        }, 
	      body: JSON.stringify({
	    	  name: Adapter.name})
	    });
	    return fetch(request).then(response => {
	      return response.json();
	    }).catch(error => {
	      return error;
	    });
	  }
  
  static deleteAdapter(Adapter, org) {
    const request = new Request(`http://localhost:8080/api/adapters/${org}/${Adapter.name}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
  static deleteAdapterFromComponent(adapter, component, org) {

	    const request = new Request(`http://localhost:8080/api/components/${component}/${org}/adapters/${adapter.name}`, {
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