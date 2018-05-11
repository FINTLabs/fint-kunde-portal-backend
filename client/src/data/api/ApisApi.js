class ApisApi {

  static getApis() {
	  const url='/api/components';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static getTechnicalContacts() {
	  const url='/api/organisations/testing/contacts/technical';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static getLegalContact() {
	  const url='/api/organisations/testing/contacts/legal';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static getOrganisation() {
	  const url='/api/organisations/testing/';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static linkComponent(api) {
    const request = new Request(`/api/organisations/testing/components/${api.name}`, {
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
	    const request = new Request(`/api/organisations/testing/components/${api}`, {
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


static addTechnicalContact(nin) {
	    const request = new Request(`/api/organisations/testing/contacts/technical/${nin}`, {
	      method: 'PUT',
	      headers: new Headers({
	          'Content-Type': 'application/json'
	        }),
	        body: JSON.stringify({
		  	  nin: nin})
	      });


	    return fetch(request).then(response => {
	      return response.json();
	    }).catch(error => {
	      return error;
	    });
	  }


static removeTechnicalContact(kontakt) {
    const request = new Request(`/api/organisations/testing/contacts/technical/${kontakt.nin}`, {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
	  	  nin: kontakt.nin})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

static setLegalContact(kontakt) {
    const request = new Request(`/api/organisations/testing/contacts/legal/${kontakt.nin}`, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
      	  name: kontakt.nin})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

static unsetLegalContact(kontakt) {
    const request = new Request(`/api/organisations/testing/contacts/legal/${kontakt.nin}`, {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
      	  name: kontakt.nin})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}
export default ApisApi;
