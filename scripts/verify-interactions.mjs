import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = process.env.TARGET_URL || 'http://127.0.0.1:3001/';
const outputDir = path.resolve('responsive-report');

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

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

try {
  await page.setViewport({ width: 393, height: 851, deviceScaleFactor: 2.75, isMobile: true, hasTouch: true });
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#simulador-agente', { timeout: 30000 });
  await page.evaluate(() => document.getElementById('simulador-agente')?.scrollIntoView());
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const formInputs = await page.$$('form input');
  await formInputs[0].type('Igor Teste');
  await formInputs[1].type('11987654321');
  await formInputs[2].type('ATY Teste');
  await formInputs[3].type('Clínica');
  await page.type('form textarea', 'Automatizar atendimento e agendamentos pelo WhatsApp');
  await page.click('form button[type="submit"]');
  await page.waitForFunction(() => !document.querySelector('form'), { timeout: 15000 });

  await page.screenshot({ path: path.join(outputDir, 'interaction-after-lead.png'), fullPage: false });

  const chatInputSelector = '.phone-preview input';
  await page.waitForSelector(chatInputSelector, { timeout: 10000 });
  await page.type(chatInputSelector, 'Quais serviços vocês fazem?');
  await page.click('.phone-preview button[aria-label="Enviar mensagem"]');
  await page.waitForFunction(() => document.body.innerText.includes('Modo demo ativo') || document.body.innerText.includes('serviços'), {
    timeout: 15000,
  });

  await page.screenshot({ path: path.join(outputDir, 'interaction-after-chat.png'), fullPage: false });

  const audit = await page.evaluate(() => ({
    hasLeadForm: Boolean(document.querySelector('form')),
    hasChoosePanel: document.body.innerText.includes('Escolha como quer testar'),
    hasPreview: document.body.innerText.includes('Prévia do atendimento'),
    hasUserMessage: document.body.innerText.includes('Quais serviços vocês fazem?'),
    hasAssistantReply: document.body.innerText.includes('trabalha com') || document.body.innerText.includes('Posso te ajudar'),
    hasStatus: document.body.innerText.includes('Modo demo ativo') || document.body.innerText.includes('OpenRouter'),
    hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
  }));

  const result = {
    ...audit,
    consoleIssues,
    failedRequests,
    screenshots: [
      path.join(outputDir, 'interaction-after-lead.png'),
      path.join(outputDir, 'interaction-after-chat.png'),
    ],
  };

  await fs.writeFile(path.join(outputDir, 'interaction-report.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({
    ...audit,
    consoleIssuesCount: consoleIssues.length,
    failedRequestsCount: failedRequests.length,
    screenshots: result.screenshots,
  }, null, 2));
} finally {
  await browser.close();
}
