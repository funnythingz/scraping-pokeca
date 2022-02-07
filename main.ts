import { chromium } from '@playwright/test'

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = 'https://www.pokemon-card.com/deck/confirm.html/deckID/'
  const deckID = 'nQnngg-kSz0DZ-ngLQnL'

  await page.goto(`${url}${deckID}`)
  const content = await page.evaluate(() => {
    const table = document.querySelectorAll('#cardImagesView .KSTable')
    return Array.from(table).map(function (v) {
      return {
        image: v.querySelectorAll('img')[0].getAttribute('src'),
        count: v.querySelectorAll('.cPos > span')[0].innerHTML.replace('枚', '')
      }
    })
  })

  console.log({
    response: content
  })

  await browser.close()
})();