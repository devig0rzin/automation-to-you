import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = process.env.TARGET_URL || 'http://127.0.0.1:3001/';
const outputDir = path.resolve('responsive-report');

const profiles = [
  { name: 'android-360', width: 360, height: 800, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { name: 'android-393', width: 393, height: 851, deviceScaleFactor: 2.75, isMobile: true, hasTouch: true },
  { name: 'ipad-768', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'desktop-1366', width: 1366, height: 768, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

const results = [];

try {
  for (const profile of profiles) {
    const page = await browser.newPage();
    const consoleIssues = [];
    const failedRequests = [];

    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        consoleIssues.push({ type: message.type(), text: message.text() });
      }
    });
    page.on('pageerror', (error) => {
      consoleIssues.push({ type: 'pageerror', text: error.message });
    });
    page.on('requestfailed', (request) => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        error: request.failure()?.errorText,
      });
    });

    await page.setViewport(profile);
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('main', { timeout: 30000 });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= scrollHeight; y += Math.floor(profile.height * 0.7)) {
      await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((resolve) => setTimeout(resolve, 700));

    const audit = await page.evaluate(() => {
      const isVisible = (el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      };
      const badTextRegex = /[ÃÂ�]|â€|â€œ|â€|â€™|â€“|â€”/;
      const texts = Array.from(document.body.querySelectorAll('*'))
        .filter(isVisible)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' '),
        }))
        .filter((item) => item.text);

      const suspiciousText = texts.filter((item) => badTextRegex.test(item.text)).slice(0, 20);
      const overflowElements = Array.from(document.body.querySelectorAll('*'))
        .filter(isVisible)
        .filter((el) => {
          const style = getComputedStyle(el);
          return (
            el.scrollWidth > el.clientWidth + 2 &&
            !['HTML', 'BODY', 'SVG', 'VIDEO'].includes(el.tagName) &&
            style.overflowX !== 'hidden'
          );
        })
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            className: String(el.className || '').slice(0, 160),
            text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 220),
            clientWidth: el.clientWidth,
            scrollWidth: el.scrollWidth,
            x: Math.round(rect.x),
            y: Math.round(rect.y),
          };
        })
        .slice(0, 30);

      const emptyControls = Array.from(document.querySelectorAll('button, a[href], input, textarea'))
        .filter(isVisible)
        .filter((el) => {
          const label = [el.getAttribute('aria-label'), el.getAttribute('title'), el.innerText, el.value, el.placeholder]
            .filter(Boolean)
            .join(' ')
            .trim();
          return !label;
        })
        .map((el) => ({ tag: el.tagName.toLowerCase(), className: String(el.className || '').slice(0, 140) }))
        .slice(0, 20);

      return {
        title: document.title,
        viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
        bodyScrollWidth: document.documentElement.scrollWidth,
        bodyClientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        suspiciousText,
        overflowElements,
        emptyControls,
        visibleTextSample: texts.map((item) => item.text).slice(0, 80),
      };
    });

    const screenshotPath = path.join(outputDir, `${profile.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    results.push({
      profile: profile.name,
      ...audit,
      consoleIssues,
      failedRequests,
      screenshot: screenshotPath,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outputDir, 'report.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results.map((result) => ({
  profile: result.profile,
  viewport: result.viewport,
  hasHorizontalOverflow: result.hasHorizontalOverflow,
  suspiciousTextCount: result.suspiciousText.length,
  overflowElementsCount: result.overflowElements.length,
  emptyControlsCount: result.emptyControls.length,
  consoleIssuesCount: result.consoleIssues.length,
  failedRequestsCount: result.failedRequests.length,
  screenshot: result.screenshot,
})), null, 2));
