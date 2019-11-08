const Nightmare = require('nightmare');
require('nightmare-inline-download')(Nightmare);

const nightmare = Nightmare({
  show: true
});

(async () => {
  await nightmare.goto('REPLACE_WITH_YOUR_URL');
  
  await nightmare.click('REPLACE_WITH_YOUR_QUERY_SELECTOR');
  
  let download = await nightmare.download('./file.zip');

  console.log(download);

  debugger;
 

})();

