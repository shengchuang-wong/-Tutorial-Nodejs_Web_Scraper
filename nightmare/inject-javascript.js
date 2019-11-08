const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true
});
const jqueryPath = './jquery-3.2.1.min.js';

(async () => {
  await nightmare.goto('https://learnscraping.com/blog');
  await nightmare.inject('js', jqueryPath);

  let title = await nightmare.evaluate(() => {

    return $('p[class="site-title"]').text();

  })

  console.log(title); 

})();

