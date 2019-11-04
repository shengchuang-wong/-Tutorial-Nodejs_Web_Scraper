const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const request = require('request')

const URLS = [
  { url: 'https://www.imdb.com/title/tt0454848', id: 'firstURL' }, 
  { url: 'https://www.imdb.com/title/tt2267998', id: 'secondURL' }
];

(async () => {
  try {
  const headers = {
    // ':authority': 'www.imdb.com',
    // ':method': 'GET',
    // ':path': '/title/tt0454848/?ref_=nv_sr_6?ref_=nv_sr_6',
    // ':scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,es;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': 'uu=BCYuERhbk-2r7wRT0necw7Ma9uBk5otYSL1ie_kcQKWXkhJ2Vl3G4rPNNjUt0XQVjTAmvo3iY87x%0D%0AmRFxuVGsx3nYE75IfhkNYQ_XByrMyFTCuBSfpiXiPy_tsWbj4BmP6sx9oLrC0Gjl4ZW-r1fpLwEQ%0D%0A9Q%0D%0A; session-id=139-1759049-3534037; session-id-time=2203336632; adblk=adblk_no; ubid-main=132-8926918-7470612; session-token=lygjDEzLPjPiZSdI5k1Dxo8U9lAuJkzITTpAAzqgTiuA50HUorJMhdaWRCCrmSDFKkv+CHdF2EpVWr2RTlmoW/S0Wzp7TvUq+gVOckFZSYnsVFtw7JFoRZEn9XV4h6wZWQma4zilZvZtUjpiBN6fQ2SBLIwFmG00xY3dIgDFxsQMo767IAuiOxXtuwt4Jz+o; csm-hit=tb:P4C8KN72EWSW3G0MV9PT+s-8ZW4XXSC982E46SWVQXF|1572620337852&t:1572620337852&adb:adblk_no',
    'referer': 'https://www.imdb.com/title/tt0424774/?ref_=nv_sr_8?ref_=nv_sr_8',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1 ',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
  };

  let moviesData = [];
  for (let movie of URLS) {
    const response = await requestPromise({
      uri: movie.url,
      headers,
      gzip: true
    });
    const $ = cheerio.load(response);

    const title = $('div[class="title_wrapper"] > h1').text().trim()
    const rating = $('span[itemprop="ratingValue"]').text()
    const imageSrc = $('div.poster > a > img')[0].attribs.src
    const ratingCount = $('span[itemprop="ratingCount"]').text()
    const releaseDate = $('a[title="See more release dates"]').text().trim()
    let popularity = $('#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span').text().trim()
    const genres = []
    $('div.title_wrapper a[href^="/search/title?genres"]').each((i, el) => {
      let genre = $(el).text()
      genres.push(genre)
    })

    moviesData.push({
      title,
      rating,
      imageSrc,
      ratingCount,
      releaseDate,
      genres,
      popularity
    })

    let file = fs.createWriteStream(`${movie.id}.jpg`)

    await new Promise((resolve, reject) => {
      let stream = request({
        uri: imageSrc,
        headers,
        gzip: true
      }).pipe(file)
      .on('finish', () => {
        console.log(`Finish downloading the image ${image.id}.`)
        resolve()
      })
      .on('error', error => {
        reject(error)
      })
    })
    .catch(error => {
      console.log(`${movie.id} has an error on download.. ${error}`)
    })
    
  }

  // const fields = ['title', 'rating', 'imageSrc', 'ratingCount', 'releaseDate', 'genres', 'popularity'];
  // const json2csvParser = new Json2csvParser({ fields });
  // const csv = json2csvParser.parse(moviesData)

  // fs.writeFileSync('./data.json', JSON.stringify(moviesData), 'utf-8')
  // fs.writeFileSync('./data.csv', csv, 'utf-8')

  // console.log(csv)
  } catch(err) {
    console.log(err)
  }
})()