const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
  const USERNAME = 'shengchuang1996@gmail.com';
  const PASSWORD = '123456qwe';

  await twitter.initialize();

  await twitter.login(USERNAME, PASSWORD);

  // await twitter.postTweet('Hello, this is a test message');

  let details = await twitter.getUser('udemy');

  debugger;

  // await twitter.end();

})();