import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loginButton(): Locator {
  return this.page.getByRole('link', { name: 'Вход' });
  }
  
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async clickLogin(): Promise<void> {
    await this.loginButton().click();
  }
}
