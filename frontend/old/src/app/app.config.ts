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

export function initializeLogInFactory(ssoAuthService: SsoAuthService) {
  return () => ssoAuthService.initializeLogIn();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLogInFactory,
      deps: [SsoAuthService],
      multi: true,
    },
  ],
};
