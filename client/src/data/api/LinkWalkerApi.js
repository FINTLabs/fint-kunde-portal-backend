class LinkWalkerApi {

  static getTests(baseUrl, organisationName) {
    console.log(baseUrl);
    console.log(`${baseUrl}/tests/${organisationName}`);
    const url = `${baseUrl}/tests/${organisationName}`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }

  static addTest(baseUrl, test, organisationName) {
    const request = new Request(`${baseUrl}/tests/${organisationName}`, {
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
    const request = new Request(`${baseUrl}/tests/${organisationName}`, {
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
