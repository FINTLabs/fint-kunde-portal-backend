class ComponentApi {

  static getApis() {
    const url = '/api/components';
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }

}

export default ComponentApi;
