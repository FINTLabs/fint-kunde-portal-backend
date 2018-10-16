class HealthTestApi {

  static runTest(baseUrl, test) {
    const request = new Request(`${baseUrl}/api/tests/health`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(test)
    });

    return fetch(request).then(response => Promise.all([response, response.json()]));

  }

}

export default HealthTestApi;
