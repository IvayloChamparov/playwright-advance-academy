import { Page, Locator } from '@playwright/test';

export class LoginPopup {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  usernameField(): Locator {
  return this.page.getByRole('textbox', { name: 'E-mail' });
  }

  passwordField(): Locator {
    return this.page.getByPlaceholder('Парола');
  }

  loginButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  formErrorMessage() {
  return this.page.getByText('Моля, проверете полетата отново!');
  }

  invalidCredentialsMessage() {
  return this.page.locator('div.d-flex.align-items-center', {
    hasText: 'Предоставените данни за вход са невалидни.'
  });
  }

  passwordTooShortError() {
    return this.page.locator('.invalid-feedback', {
      hasText: 'Паролата не може да бъде под 8 символа'
    });
  }

  requiredFieldErrors() {
    return this.page.locator('.invalid-feedback', {
      hasText: 'Задължително поле'
    });
  }

  invalidEmailFormatError() {
    return this.page.locator('.invalid-feedback', {
      hasText: 'Невалиден адрес'
    });
  }

  invalidLoginFieldError() {
  return this.page.locator('.invalid-feedback', {
    hasText: 'Невалидна парола или E-mail'
  });
  }
  
  async clickLogin(): Promise<void> {
  await this.loginButton().waitFor({ state: 'visible' });
  await this.loginButton().click();
  }

  async login(username: string, password: string): Promise<void> {
  await this.usernameField().waitFor({ state: 'visible' });
  await this.usernameField().fill(username);
  await this.passwordField().fill(password);
  await this.loginButton().click();
  }

  async loginWithEnv(
    env: Record<string, string>,
    usernameKey: string,
    passwordKey: string
  ): Promise<void> {
    await this.login(env[usernameKey], env[passwordKey]);
  }
}
