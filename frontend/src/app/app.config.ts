import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { SsoAuthService } from './sso-auth.service';

export function initializeLogIn(
  ssoAuthService: SsoAuthService,
): () => Promise<void> {
  return () => ssoAuthService.initializeLogIn();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLogIn,
      deps: [SsoAuthService],
      multi: true,
    },
  ],
};
