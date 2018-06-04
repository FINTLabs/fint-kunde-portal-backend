class LogApi {

  static fetchLog(organisation, query) {

	const url = `http://ucp.rogfk.no:8102/audit/events/search/${query}`;
	console.log(url)
    return fetch(url, {method: 'GET'})
      .then(response => Promise.all([response, response.json()]));
  }
}
export default LogApi;
