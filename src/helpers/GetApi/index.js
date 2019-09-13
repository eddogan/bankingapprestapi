export default function getApi(requrl) {
  return {
    method: 'GET',
    url: requrl,
    crossdomain: true,
    crossorigin: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${sessionStorage.access_token}`
    }
  };
}
