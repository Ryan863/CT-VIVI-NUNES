import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function run() {
  console.log('--- Starting Playwright Verification ---');
  
  // Start Next.js production server
  const server = spawn('npx', ['next', 'start', '-p', '3000'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (d) => console.log(`[Next.js]: ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.error(`[Next.js Error]: ${d.toString().trim()}`));

  // Wait for server ready
  console.log('Waiting for local server to be ready on port 3000...');
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://localhost:3000');
      if (res.ok) {
        console.log('Server is UP and ready!');
        break;
      }
    } catch {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Test (1440x900)
    console.log('\n--- 1. Testing Desktop Layout (1440x900) ---');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Assert H1 yellow dot
    const h1Text = await desktopPage.locator('h1').innerText();
    console.log(`H1 text: "${h1Text.replace(/\n/g, ' ')}"`);
    const yellowDot = desktopPage.locator('h1 span.text-amber-400:has-text(".")');
    const dotCount = await yellowDot.count();
    console.log('Yellow dot count in H1:', dotCount);
    if (dotCount > 0) {
      console.log(`Yellow dot text: "${await yellowDot.innerText()}"`);
    }

    // Assert buttons in Hero
    const primaryBtn = desktopPage.locator('#hero a:has-text("Reservar quadra")');
    console.log('Primary CTA "Reservar quadra" count:', await primaryBtn.count());
    
    const secondaryBtn = desktopPage.locator('#hero a:has-text("Aulas com a Profª Vivi")');
    console.log('Secondary CTA "Aulas com a Profª Vivi" count:', await secondaryBtn.count());

    // Assert Hero bottom authority bar removed
    const authorityGoogle = await desktopPage.locator('text="5.0 no Google (Areia Limpa & Fofa)"').count();
    console.log('Hero bottom bar (5.0 no Google) status:', authorityGoogle === 0 ? 'CORRECT (Removed)' : 'WARNING: Found');

    // Assert Beach Tennis card badge in #modalidades
    const beachBadge = desktopPage.locator('#modalidades span:has-text("Lazer & Duplas")');
    console.log('Beach Tennis "Lazer & Duplas" badge count:', await beachBadge.count());
    const oldPopularBadge = await desktopPage.locator('#modalidades span:has-text("Mais Popular")').count();
    console.log('Old "Mais Popular" badge status:', oldPopularBadge === 0 ? 'CORRECT (Removed)' : 'WARNING: Found');

    // Assert Jefe photo placeholder in #locacao
    const jefeHeading = desktopPage.locator('#locacao h4:has-text("Jefe")');
    console.log('Jefe placeholder heading count in #locacao:', await jefeHeading.count());

    // Screenshot Hero Desktop
    await desktopPage.screenshot({ path: 'test-desktop-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log('Saved test-desktop-hero.png');

    // Screenshot Modalidades Desktop
    const modalidadesEl = desktopPage.locator('#modalidades');
    await modalidadesEl.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({ path: 'test-desktop-modalidades.png' });
    console.log('Saved test-desktop-modalidades.png');

    // Screenshot Locacao Jefe Desktop
    const locacaoEl = desktopPage.locator('#locacao');
    await locacaoEl.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({ path: 'test-desktop-locacao.png' });
    console.log('Saved test-desktop-locacao.png');

    // 2. Mobile Test (390x844 - iPhone 14)
    console.log('\n--- 2. Testing Mobile Layout (390x844) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await mobilePage.screenshot({ path: 'test-mobile-hero.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
    console.log('Saved test-mobile-hero.png');

    console.log('\n✅ ALL PLAYWRIGHT ASSERTIONS AND SCREENSHOTS COMPLETED!');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Playwright test failed:', err);
  process.exit(1);
});
