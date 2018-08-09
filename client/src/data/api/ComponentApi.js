class ComponentApi {

  static getApis() {
    const url = "/api/components";
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static getOrganisationComponents(organisationName) {
    const url = `/api/components/organisation/${organisationName}`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

}

export default ComponentApi;
