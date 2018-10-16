class LinkWalkerApi {

  static getTests(baseUrl, organisationName) {
    const url = `${baseUrl}/api/tests/links/${organisationName}`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static getFailedTestResults(baseUrl, organisationName, id) {
    const url = `${baseUrl}/api/tests/links/${organisationName}/${id}?status=FAILED`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static getAllTestResults(baseUrl, organisationName, id) {
    const url = `${baseUrl}/api/tests/links/${organisationName}/${id}`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static addTest(baseUrl, test, organisationName) {
    const request = new Request(`${baseUrl}/api/tests/links/${organisationName}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(test)
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static clearTests(baseUrl, organisationName) {
    const request = new Request(`${baseUrl}/api/tests/links/${organisationName}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      //body: JSON.stringify({})
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

}

export default LinkWalkerApi;
