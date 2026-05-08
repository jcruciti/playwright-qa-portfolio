import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage;

  const USER = process.env.SAUCE_USER;
  const PASSWORD = process.env.SAUCE_PASSWORD;

  const INVALID_USER = {
    username: 'error_user',
    password: 'inv@l!d',
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(USER, PASSWORD);
    });

    await test.step('Validate successful login', async () => {
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test('should display error message using invalid credentials', async () => {
    await test.step('Login with invalid credentials', async () => {
      await loginPage.login(INVALID_USER.username, INVALID_USER.password);
    });

    await test.step('Validate login error message', async () => {
      await expect(loginPage.getErrorMessage()).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });
});
