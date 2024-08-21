import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SsoAuthService {
  private readonly oAuthService = inject(OAuthService);
  private readonly $user = signal<Record<string, any> | null>(null);
  public readonly $$userData = this.$user.asReadonly();
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.oAuthService.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data instanceof OAuthSuccessEvent) {
          this.$user.set(this.oAuthService.getIdentityClaims());
        }
      });
  }

  initialize(): Observable<boolean> {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    return fromPromise(this.oAuthService.loadDiscoveryDocumentAndTryLogin());
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  async refreshToken() {
    await this.oAuthService.refreshToken();
  }

  refreshUser() {
    this.$user.set(this.oAuthService.getIdentityClaims());
  }

  async logout() {
    await this.oAuthService.revokeTokenAndLogout();
    this.$user.set(null);
  }

  getAccessToken(): string {
    return this.oAuthService.getAccessToken();
  }

  getAccessTokenAndKeys() {
    return {
      accessToken: this.oAuthService.getAccessToken(),
      keys: this.oAuthService.jwks,
    };
  }

  private checkToken() {
    return (
      this.oAuthService.hasValidIdToken() &&
      this.oAuthService.hasValidAccessToken()
    );
  }
}
