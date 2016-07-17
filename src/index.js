const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const GET = 'GET';
const POST = 'POST';
const DONE = 4;
const OK = [200, 299];


function get(url) {
  return new Promise((resolve, reject) => {
    makeCall(GET, url).then(({response, status}) => {
      const result = status === SUCCESS ? resolve(response) : reject(response);
    });
  });
}

function post(url, postData) {
  const objectToSend = {
    postData,
  };
  return new Promise((resolve, reject) => {
    makeCall(POST, url, objectToSend).then(({response, status}) => {
      const result = status === SUCCESS ? resolve(response) : reject(response);
    });
  });
}

function makeCall(type = GET, url, data) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open(type, url);
    if (data && data.setHeaders && data.setHeaders.length) {
      data.setHeaders.forEach((header) => {
        for (const item in header) {
          request.setRequestHeader(item, header[item]);
        }
      });
    }
    request.send(data && data.postData);
    request.onreadystatechange = () => {

      if (request.readyState === DONE) {
        if (request.status >= OK[0] && request.status <= OK[1]) {
          resolve({
            response: request.responseText,
            status: SUCCESS
          });
        }
        resolve({
          response: request.status,
          status: FAILED
        });
      }
    };
  });
}

module.exports = {get, post};
