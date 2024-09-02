import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  DefaultOAuthInterceptor,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { corsInterceptor } from './cors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([corsInterceptor]),
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOAuthInterceptor,
      multi: true,
    },
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: [
          'http://localhost:5161/ping',
          'http://localhost:8085/realms/mtsl/account',
        ],
      },
    }),
  ],
};
