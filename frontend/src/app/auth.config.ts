import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: "http://localhost:8085/realms/mtsl",
  redirectUri: window.location.origin,
  clientId: 'mtsl-spa-client',
  responseType: 'code',
  strictDiscoveryDocumentValidation: true,
  scope: 'openid profile email offline_access',
}
