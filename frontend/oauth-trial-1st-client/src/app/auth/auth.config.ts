import {LogLevel, PassedInitialConfig} from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    configId: 'global',
    authority: 'http://127.0.0.1:8085/realms/mtsl',
    redirectUrl: 'http://127.0.0.1:4200',
    postLogoutRedirectUri: 'http://127.0.0.1:4200',
    clientId: 'mtsl-spa-client-1',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    disablePkce: false,
    historyCleanupOff: false,
    logLevel: LogLevel.Debug,
    secureRoutes: ["http://localhost:5161/ping"]
  },
};
