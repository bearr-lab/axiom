import { expect, test } from '@playwright/test';

const viewportCases = [
  { name: 'short desktop', width: 1280, height: 720 },
  { name: 'standard desktop', width: 1440, height: 900 },
  { name: 'portrait tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const viewport of viewportCases) {
  test(`keeps the onboarding action and disclosure inside a ${viewport.name} viewport`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const submit = page.getByTestId('onboarding-submit');
    const disclosure = page.getByTestId('onboarding-disclosure');
    await expect(submit).toBeVisible();
    await expect(disclosure).toBeVisible();
    await expect(submit).toBeInViewport();
    await expect(disclosure).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('keeps a locked assessment response after a browser refresh', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Learner name').fill('Mira');
  await page.getByLabel('Class').selectOption('8');
  await page.getByRole('button', { name: /begin calibration/i }).click();
  const firstPrompt = await page.locator('.question-header h1').textContent();
  await page.locator('.answer-option').first().click();
  await page.getByRole('button', { name: /lock response/i }).click();
  await page.reload();
  await expect(page.getByText('Saved locally')).toBeVisible();
  await expect(page.locator('.question-header h1')).not.toHaveText(firstPrompt ?? '');
  await expect(page.getByText(/response 2/i)).toBeVisible();
});
