import { inject, Injectable, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class SsoAuthService {
  private readonly oAuthService = inject(OAuthService);
  private readonly $user = signal<Record<string, any> | null>(null);
  public readonly $$userData = this.$user.asReadonly();

  constructor() {
    this.oAuthService.configure(authConfig);
  }

  async initializeLogIn(): Promise<void> {
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    this.oAuthService.setupAutomaticSilentRefresh();
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.initCodeFlow();
    }
  }

  async login() {
    if (!this.checkToken()) {
      await this.initializeLogIn();
    }
    this.refreshUser();
  }

  refreshUser() {
    this.$user.set(this.oAuthService.getIdentityClaims());
  }

  async logout() {
    await this.oAuthService.revokeTokenAndLogout();
    this.$user.set(null);
  }

  private checkToken() {
    return (
      this.oAuthService.hasValidIdToken() &&
      this.oAuthService.hasValidAccessToken()
    );
  }

  getAccessToken(): string {
    return this.oAuthService.getAccessToken();
  }
}
