class LogApi {

  static fetchLog(organisation, query) {

	const url = `http://ucp.rogfk.no:8102/audit/events/search/${query}`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => Promise.all([response, response.json()]));
  }
}
export default LogApi;
