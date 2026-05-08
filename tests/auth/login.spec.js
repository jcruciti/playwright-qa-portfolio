import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should login succesfully with valid credentials', async ({ page }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Validate successful login', async () => {
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test('should display error message using invalid credentials', async () => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Login with invalid credentials', async () => {
      await loginPage.login('error_user', 'inv@l!d');
    });

    await test.step('Validate login error message is displayed', async () => {
      await expect(loginPage.getErrorMessage()).toBeVisible();
    });
  });
});
