class KontakterApi {

  static fetchKontakter() {
    const request = new Request(`http://localhost:8080/api/contacts`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getKontakter() {
	  const url='http://localhost:8080/api/contacts';
	  return fetch(url, { method: 'GET'})
	     .then( response => Promise.all([response,response.json()]));
	}

  static updateKontakt(Kontakt) {
    const request = new Request(`http://localhost:8080/api/contacts/${Kontakt.nin}`, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
	  	  nin: Kontakt.nin,
	  	  firstName: Kontakt.firstName,
	  	  lastName: Kontakt.lastName,
	  	  mail: Kontakt.mail,
	  	  mobile: Kontakt.mobile})
      });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static createKontakt(Kontakt) {
    const request = new Request(`http://localhost:8080/api/contacts`, {
      method: 'POST',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
    	  nin: Kontakt.nin,
    	  firstName: Kontakt.firstName,
    	  lastName: Kontakt.lastName,
    	  mail: Kontakt.mail,
    	  mobile: Kontakt.mobile
    	  })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteKontakt(Kontakt) {
    const request = new Request(`http://localhost:8080/api/contacts/${Kontakt.nin}`, {
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
