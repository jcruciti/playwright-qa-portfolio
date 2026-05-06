import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should login succesfully with valid credentials', async ({ page }) => {
    await loginPage.open();
    await loginPage.login(process.env.USER, process.env.PASSWORD);

    await expect(page).toHaveURL(/inventory/);
  });

  test('should display error message using invalid credentials', async ({
    page,
  }) => {
    await loginPage.open();
    await loginPage.login('error_user', 'inv@l!d');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
