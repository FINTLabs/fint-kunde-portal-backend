class TestAuthApi {

  static authInit(baseUrl, test) {
    const request = new Request(`${baseUrl}/api/tests/auth-init`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'x-client-dn': test.client,
        'x-base-url': test.baseUrl,
      },
      credentials: 'same-origin',
    });

    return fetch(request).then(response => Promise.all([response]));

  }

}

export default TestAuthApi;
