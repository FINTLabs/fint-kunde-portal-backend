class TestAuthApi {

  static authInit(baseUrl, test) {

    const request = new Request(`${baseUrl}/api/tests/auth/init`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(test),
    });


    return fetch(request)
      .then(response => Promise.all([response]));
  }

  static clearAuth(baseUrl, organisationName) {
    const url = `${baseUrl}/api/tests/auth/clear/${organisationName}`; //.concat(org);
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(response => Promise.all([response]));
  }

}

export default TestAuthApi;
