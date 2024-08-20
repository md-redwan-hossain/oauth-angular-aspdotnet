import {PassedInitialConfig} from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    configId: "global",
    authority: 'http://localhost:8085/realms/mtsl',
    redirectUrl: 'http://127.0.0.1:4201',
    postLogoutRedirectUri: 'http://127.0.0.1:4201',
    clientId: 'mtsl-spa-client-2',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    disablePkce: false
  },
};
