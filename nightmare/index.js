const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true, openDevTools: { mode: 'detach ' } });

(async () => {

  try {

    await nightmare.viewport(1200, 600)
    await nightmare.goto('https://duckduckgo.com')
    await nightmare.type('#search_form_input_homepage', 'github nightmare')
    await nightmare.click('#search_button_homepage')
    await nightmare.wait('#r1-0 a.result__a')
    const link = await nightmare.evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    await nightmare.end();

  /* Scrolling to the bottom of the page */
  let height = await nightmare.evaluate(() => document.body.scrollHeight);
  await nightmare.scrollTo(height, 0);

  /* Waits for a specific selector to be found on a page */
  await nightmare.wait('#selector');

  /* Clicks on a selector */
  await nightmare.click('#selector');

  /* Typing just as a normal keyboard would */
  await nightmare.type('#selector', 'STRING TO TYPE');

  /* Returns true if selector is found on the page, else false */
  let is_selector = await nightmare.exists('#selector');

  /* Returns true if selector is visible and not hidden, else false */
  let is_visible = await nightmare.visible('#selector');

  /* Returns current url of the page */
  let current_url = await nightmare.url();

  /* Returns the current title */
  let current_title = await nightmare.title();

  /* Returns array with all the cookies */
  let cookies = await nightmare.cookies.get();
  

    console.log(link);
  } catch (error) {
    console.log(`Something wrong: ${error}`)
  }

})();

