export default {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  pkce: Boolean(process.env.REACT_APP_OKTA_PKCE)
};
