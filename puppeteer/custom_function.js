const puppeteer = require('puppeteer');

let truncate = (str, length, truncateStr) => {
    truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://learnscraping.com/', { waitUntil: 'networkidle0' });
    
    await page.exposeFunction('truncate', (str, length, truncateStr) =>
        truncate(str, length, truncateStr)
    );

    /* Get details from the page */
    let details = await page.evaluate(async () => {

        let getInnerText = selector => {
            return document.querySelector(selector) ? document.querySelector(selector).innerText : false
        }

        return {
            title: await truncate(getInnerText('h1[class="site-title"]'), 5),
            description: getInnerText('p[class="site-description"]'),
            invalid: getInnerText('test[class="test"]')
        }

    });

    debugger;

    // await browser.close();

})();