export const environment = {
  production: false,
  baseUrl: 'https://localhost:6001',
  appUrl: 'http://localhost:4200',

  clientId: 'Client1',
  redirectUri: 'http://localhost:4200/auth-callback',
  client_secret:'SuperSecretPassword',
  sessionStorage: 'oidc.user:https://localhost:5001:Client1',
  postLogoutRedirectUri: 'http://localhost:4200/logout-callback'
};
