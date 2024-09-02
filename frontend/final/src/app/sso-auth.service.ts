import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { from, Observable, of, pipe, switchMap } from 'rxjs';
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

    return from(this.oAuthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      switchMap((val) => {
        if (val) {
          this.oAuthService.setupAutomaticSilentRefresh();
          return of(true);
        }
        return of(false);
      }),
    );
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  async userDetails() {
    return await this.oAuthService.loadUserProfile();
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
