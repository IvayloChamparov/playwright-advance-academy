import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginModal } from '../pages/loginModal';
import env from '../playwright.env.json';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await expect(page).toHaveURL(/advanceacademy\.bg/);
    await home.clickLogin();
  });

  test('Login with invalid password', async ({ page }) => {
    const loginModal = new LoginModal(page);

    await loginModal.loginWithEnv(env, 'usernameIvayloOne', 'passwordInvalid');

    // Example assertion (adjust selector)
    await expect(page.locator('text=грешна парола')).toBeVisible();
  });

  test('Login with invalid username', async ({ page }) => {
    const loginModal = new LoginModal(page);

    await loginModal.loginWithEnv(env, 'usernameInvalid', 'passwordIvayloOne');

    // Example assertion (adjust selector)
    await expect(page.locator('text=невалиден')).toBeVisible();
  });
});