const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  try {
    console.log('Initial request to get the csrf_token value...');
    let initialRequest = await request({
      uri: 'http://quotes.toscrape.com/login',
      method: 'GET',
      gzip: true,
      resolveWithFullResponse: true
    })
  
    // parsing the cookies
    let cookie = initialRequest.headers['set-cookie'].map(value => value.split(';')[0]).join(' ')
  
    let $ = cheerio.load(initialRequest.body);
  
    // get csrf token
    let csrfToken = $('input[name="csrf_token"]').val();
  
    console.log(`POST Request to login on the form`);
    let loginRequest = await request({
      uri: 'http://quotes.toscrape.com/login',
      method: 'POST',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,es;q=0.6',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'quotes.toscrape.com',
        'Origin': 'http://quotes.toscrape.com',
        'Referer': 'http://quotes.toscrape.com/login',
        'Upgrade-Insecure-Requests': '1',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
      },
      form: {
        'csrf_token': csrfToken,
        'username': 'admin',
        'password': 'password'
      },
      resolveWithFullResponse: true,
      gzip: true
    })
  
  } catch (response) {
    cookie = response.response.headers['set-cookie'].map(value => value.split(';')[0]).join(' ')
  }

  let loggedInResponse = await request({
    uri: 'http://quotes.toscrape.com',
    method: 'GET',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,es;q=0.6',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Host': 'quotes.toscrape.com',
      'Origin': 'http://quotes.toscrape.com',
      'Referer': 'http://quotes.toscrape.com/login',
      'Upgrade-Insecure-Requests': '1',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
    },
  })
  
  debugger

})();