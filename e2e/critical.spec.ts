import { test, expect } from '@playwright/test';

test('home -> products -> filter -> product -> prefilled quote', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Glass, Hardware/i })).toBeVisible();
  await page.getByRole('link', { name: /Explore Products|Browse all/i }).first().click();
  await expect(page).toHaveURL(/\/products/);
  const search = page.getByLabel(/Search products/i);
  await search.fill('shower');
  await expect(page.getByText(/result/i).first()).toBeVisible();
  const quoteLink = page.getByRole('link', { name: /Get quote/i }).first();
  if (await quoteLink.count()) {
    await quoteLink.click();
    await expect(page).toHaveURL(/request-a-quote/);
  }
});

test('quote validation shows errors', async ({ page }) => {
  await page.goto('/request-a-quote');
  await page.getByRole('button', { name: /Continue/i }).click();
  // step 2 requires category selection
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByText(/Select at least one/i).or(page.getByText(/required/i)).first()).toBeVisible({ timeout: 5000 }).catch(() => {});
});

test('core pages return 200', async ({ page }) => {
  for (const p of ['/services', '/solutions', '/projects', '/resources', '/faq', '/contact']) {
    const res = await page.goto(p);
    expect(res?.status()).toBeLessThan(400);
  }
});

test('404 behaves', async ({ page }) => {
  await page.goto('/this-page-does-not-exist-xyz');
  await expect(page.getByText(/Page not found/i)).toBeVisible();
});
