import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8085/realms/mtsl',
  redirectUri: 'http://127.0.0.1:4200',
  clientId: 'mtsl-spa-client',
  responseType: 'code',
  strictDiscoveryDocumentValidation: true,
  scope: 'openid profile email offline_access',
  disablePKCE: false,
  useSilentRefresh: true,
  showDebugInformation: true,
};
