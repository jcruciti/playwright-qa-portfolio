import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('@setupauthenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);

  await page.context().storageState({
    path: authFile,
  });
});
