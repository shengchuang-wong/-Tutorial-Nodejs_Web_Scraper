const request = require('request-promise');
request.debug = 1; // debug log

(async () => {
  console.log('Initial Request');
  try {
    const test = await request({
      uri: 'https://httpbin.org/status/300',
      resolveWithFullResponse: true
    });
    console.log(test);
  } catch(response) {
    if(response.statusCode === 300) {
      console.log('Everything is ok');
    } else {
      console.log(`Something happened: ${response}`);
      process.exit(1);
    }
    debugger;
  }
})();