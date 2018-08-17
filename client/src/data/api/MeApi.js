class MeApi {
  static getMe() {
    const url = "/api/me";
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => Promise.all([response, response.json()]));
  }
}

export default MeApi;