class ClientConfigApi {

  static fetchClientConfig() {
    const url = "/api/config/client";
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(response => {
      return response
    });
  }

}

export default ClientConfigApi;
