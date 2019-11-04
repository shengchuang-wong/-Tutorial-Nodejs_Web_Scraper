const request = require('request-promise').defaults({
  // proxy: 'http://user:password@ip:port'
  proxy: 'http://202.150.143.59:52341'
});

(async() => {
  const response = await request('https://httpbin.org/ip');
  console.log(response)
})()