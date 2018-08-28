class TestAuthApi {

  static authInit(baseUrl, test) {

    const request = new Request(`${baseUrl}/api/tests/auth-init`, {
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

}

export default TestAuthApi;
