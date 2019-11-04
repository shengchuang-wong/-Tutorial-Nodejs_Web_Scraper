const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/';
const HOME_URL = 'https://twitter.com/home';
const LOGIN_URL = 'https://twitter.com/login';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

const USERNAME = 'shengchuang1996@gmail.com';
const PASSWORD = '123456qwe';

let browser = null;
let page = null;

const twitter = {
  initialize: async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto(BASE_URL);
  },
  login: async (username, password) => {
    await page.goto(LOGIN_URL);
    await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', username);
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', password);

    await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');
    await page.waitFor('#react-root > div > div > div > header > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms')
  },
  postTweet: async (message) => {
    let url = await page.url();

    if (url !== HOME_URL) {
      await page.goto(HOME_URL);
    }

    // click post button for popup
    await page.waitFor('#react-root > div > div > div > header > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms');
    await page.click('#react-root > div > div > div > header > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms');

    await page.waitFor('div[data-testid="tweetTextarea_0"]');
    // await page.type('div[data-testid="tweetTextarea_0"]', 'Sample Post');
    await page.click('div[data-testid="tweetTextarea_0"]');
    await page.waitFor(500)
    await page.keyboard.type(message, { delay: 50 });

    await page.click('div[data-testid="tweetButton"]');
  },
  getUser: async (username) => {
    let url = await page.url();

    if (url !== USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    await page.waitFor('#react-root > div > div > div > main > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div.css-1dbjc4n.r-15d164r.r-1g94qm0 > div > div > div.css-1dbjc4n.r-18u37iz.r-dnmrzs > div > span:nth-child(1) > span');

    let user = await page.evaluate(() => {
      return {
        fullName: document.querySelector('#react-root > div > div > div > main > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div.css-1dbjc4n.r-15d164r.r-1g94qm0 > div > div > div.css-1dbjc4n.r-18u37iz.r-dnmrzs > div > span:nth-child(1) > span').textContent,
        description: document.querySelector('#react-root > div > div > div > main > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(3) > div > span').textContent,
        followersCount: document.querySelector('#react-root > div > div > div > main > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(5) > div.css-1dbjc4n.r-1joea0r > a > span.css-901oao.css-16my406.r-1qd0xha.r-vw2c0b.r-ad9z0x.r-bcqeeo.r-qvutc0 > span').textContent,
      }
    });

    return user;
  },
  getTweets: async (username, count = 10) => {

    let url = await page.url();

    if (url != USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    await page.waitFor('#stream-items-id');

    let tweetsArray = await page.$$('#stream-items-id > li');
    let lastTweetsArrayLength = 0;
    let tweets = [];

    while (tweetsArray.length < count) {
      await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
      await page.waitFor(3000);

      tweetsArray = await page.$$('#stream-items-id > li');

      if (lastTweetsArrayLength == tweetsArray.length) break;

      lastTweetsArrayLength = tweetsArray.length;
    }

    for (let tweetElement of tweetsArray) {

      let tweet = await tweetElement.$eval('div[class="js-tweet-text-container"]', element => element.innerText);
      let postedDate = await tweetElement.$eval('a[class="tweet-timestamp js-permalink js-nav js-tooltip"]', element => element.getAttribute('title'));
      let repliesCount = await tweetElement.$eval('span[class="ProfileTweet-actionCountForPresentation"]', element => element.innerText);
      let retweetsCount = await tweetElement.$eval('div[class="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt"] span[class="ProfileTweet-actionCountForPresentation"]', element => element.innerText);
      let likesCount = await tweetElement.$eval('div[class="ProfileTweet-action ProfileTweet-action--favorite js-toggleState"] span[class="ProfileTweet-actionCountForPresentation"]', element => element.innerText);

      tweets.push({ tweet, postedDate, repliesCount, retweetsCount, likesCount });
    }

    tweets = tweets.slice(0, count);

    return tweets;
  },
  end: async () => {
    await browser.close()
  }
};

module.exports = twitter;