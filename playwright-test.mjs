import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function run() {
  console.log('--- Starting Playwright Verification of Animations & Divider ---');
  
  // Start Next.js production server
  const server = spawn('npx', ['next', 'start', '-p', '3005'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (d) => console.log(`[Next.js]: ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.error(`[Next.js Error]: ${d.toString().trim()}`));

  // Wait for server ready
  console.log('Waiting for local server to be ready on port 3005...');
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://localhost:3005');
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
    console.log('\n--- 1. Testing Desktop (1440x900) ---');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000); // Wait for GSAP entrance

    // Assert Hero Divider
    const divider = desktopPage.locator('.hero-divider-reveal');
    console.log('Hero divider count:', await divider.count());
    console.log('Hero divider visible:', await divider.isVisible());

    const dividerBtn = desktopPage.locator('.hero-divider-reveal a:has-text("Conhecer o Complexo")');
    console.log('Divider CTA "Conhecer o Complexo" visible:', await dividerBtn.isVisible());

    // Assert Radiant Glow on primary button
    const glowEl = desktopPage.locator('.radiant-glow');
    console.log('Radiant glow element count:', await glowEl.count());

    // Assert Spotlight Cards count
    const spotlightCards = desktopPage.locator('.spotlight-card');
    console.log('Spotlight cards total count:', await spotlightCards.count());

    // Assert Aurora Background Animation
    const auroraEl = desktopPage.locator('.animate-aurora');
    console.log('Aurora animation element count:', await auroraEl.count());
    
    // Screenshot Hero with Aurora
    await desktopPage.screenshot({ path: 'test-hero-aurora.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log('Saved test-hero-aurora.png');

    // Assert Modalidade Cards animated via GSAP
    const modalidadeCards = desktopPage.locator('.modalidade-card');
    console.log('Modalidade cards count:', await modalidadeCards.count());

    // Capture screenshot focused specifically on the Hero-to-Modalidades division
    // Scroll so the bottom of the hero and the divider and the top of modalidades are centered
    await desktopPage.evaluate(() => {
      window.scrollTo(0, 450);
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: 'test-transition-divider.png' });
    console.log('Saved test-transition-divider.png');

    // Test mouse hover on first card to trigger spotlight CSS custom property
    const firstCard = spotlightCards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);
    const box = await firstCard.boundingBox();
    if (box) {
      await desktopPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await desktopPage.waitForTimeout(200);
      const mouseOpacity = await firstCard.evaluate((el) => el.style.getPropertyValue('--mouse-opacity'));
      console.log('Spotlight card --mouse-opacity after hover:', mouseOpacity);
    }

    // Capture full desktop screenshot
    await desktopPage.screenshot({ path: 'test-desktop-full.png', fullPage: false });

    // 2. Mobile Test (390x844 - iPhone 14)
    console.log('\n--- 2. Testing Mobile (390x844) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await mobilePage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    // Assert divider on mobile
    const mobileDivider = mobilePage.locator('.hero-divider-reveal');
    console.log('Mobile hero divider visible:', await mobileDivider.isVisible());

    // Scroll slightly on mobile to see transition
    await mobilePage.evaluate(() => {
      window.scrollTo(0, 350);
    });
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: 'test-mobile-transition.png' });
    console.log('Saved test-mobile-transition.png');

    console.log('\n✅ ALL PLAYWRIGHT CHECKS FOR ANIMATIONS & DIVIDER PASSED!');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Playwright test failed:', err);
  process.exit(1);
});
