import { expect, test } from '@playwright/test';

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
