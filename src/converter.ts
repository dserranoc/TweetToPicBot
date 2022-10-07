import puppeteer from 'puppeteer'

const converter = {
  toPNG: async (text = 'Texto de prueba') => {
    const url = `http://localhost:3000/tweet/${text}`
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('#container-custom')
    const el = await page.$('#container-custom')
    const screenshot = await el?.screenshot()
    await page.close()
    await browser.close()
  
    return screenshot
  
  }
}


export default converter
