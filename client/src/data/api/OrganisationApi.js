class OrganisationApi {

  static getTechnicalContacts(organisation) {
    const url = `/api/organisations/${organisation}/contacts/technical`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(response => Promise.all([response, response.json()]));
  }

  static getLegalContact(organisation) {
    const url = `/api/organisations/${organisation}/contacts/legal`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(response => Promise.all([response, response.json()]));
  }

  static getOrganisation(organisation) {
    const url = `/api/organisations/${organisation}/`;

    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static linkComponent(component, organisation) {
    const request = new Request(`/api/organisations/${organisation}/components/${component.name}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        name: component.name
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static unlinkComponent(component, organisation) {
    const request = new Request(`/api/organisations/${organisation}/components/${component.name}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        name: component.name
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static addTechnicalContact(nin, organisation) {
    const request = new Request(`/api/organisations/${organisation}/contacts/technical/${nin}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        nin: nin
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static removeTechnicalContact(contact, organisation) {
    const request = new Request(`/api/organisations/${organisation}/contacts/technical/${contact.nin}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        nin: contact.nin
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static setLegalContact(contact, organisation) {
    const request = new Request(`/api/organisations/${organisation}/contacts/legal/${contact.nin}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        name: contact.nin
      })
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static unsetLegalContact(contact, organisation) {
    const request = new Request(`/api/organisations/${organisation}/contacts/legal/${contact.nin}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      body: JSON.stringify({
        name: contact.nin
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default OrganisationApi;
