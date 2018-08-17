class ContactApi {

  static fetchContacts() {
    const url = "/api/contacts";
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static fetchContactOrganisatons() {
    const url = "/api/contacts/organisations";
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(response => {
      return response;
    });
  }

  static updateContact(contact) {
    const request = new Request(`/api/contacts/${contact.nin}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "same-origin",
      body: JSON.stringify({
        nin: contact.nin,
        firstName: contact.firstName,
        lastName: contact.lastName,
        mail: contact.mail,
        mobile: contact.mobile
      })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createContact(contact) {
    const request = new Request(`/api/contacts`, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        nin: contact.nin,
        firstName: contact.firstName,
        lastName: contact.lastName,
        mail: contact.mail,
        mobile: contact.mobile
      })
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static deleteContact(contact) {
    const request = new Request(`/api/contacts/${contact.nin}`, {
      method: "DELETE",
      credentials: "same-origin"
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ContactApi;
