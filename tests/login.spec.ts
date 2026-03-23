import { test, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPopup as LoginPage } from '../pages/loginPage';
import env from '../playwright.env.json';

test.describe('Login Tests', () => {
  let loginPopup: Page;

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await expect(page).toHaveURL(/advanceacademy\.bg/);

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      home.clickLogin(),
    ]);

    loginPopup = popup;

    await loginPopup.waitForURL(/auth\/login/);
    await loginPopup.locator('input#inputLoginEmail').waitFor();
  });

  test('Login without credentials', async () => {
    const loginPage = new LoginPage(loginPopup);
    await loginPage.clickLogin();
    await expect(loginPage.formErrorMessage()).toBeVisible();
    const requiredErrors = loginPage.requiredFieldErrors();
    await expect(requiredErrors).toHaveCount(2);
  });

  test('Login with invalid email', async () => {
    const loginPage = new LoginPage(loginPopup);
    await loginPage.loginWithEnv(env, 'usernameInvalid', 'passwordValid');
    await expect(loginPage.invalidEmailFormatError()).toBeVisible();
  });
  
  test('Login with valid email, but short password', async () => {
  const loginPage = new LoginPage(loginPopup);
  await loginPage.loginWithEnv(env, 'usernameValid', 'passwordInvalid');
  await expect(loginPage.passwordTooShortError()).toBeVisible();
  });
});