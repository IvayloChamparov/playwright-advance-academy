import { Page, Locator } from '@playwright/test';

export class LoginModal {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  usernameField(): Locator {
    return this.page.locator('#login-username');
  }

  passwordField(): Locator {
    return this.page.locator('#login-password');
  }

  loginButton(): Locator {
    return this.page.locator('form button[type="submit"]').first();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);

    await this.loginButton().click();

    // Some flows require an extra confirmation step after the initial submit.
    const authorizeBtn = this.page.locator('#authorize-with-password-submit');
    if (await authorizeBtn.count()) {
      await authorizeBtn.click();
    }
  }

  async loginWithEnv(
    env: Record<string, string>,
    usernameKey: string,
    passwordKey: string
  ): Promise<void> {
    await this.login(env[usernameKey], env[passwordKey]);
  }
}
