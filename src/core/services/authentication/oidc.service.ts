import { UserManagerSettings, UserManager, WebStorageStateStore } from 'oidc-client';
import { renewAccessToken, signOutWhenTokenExpired } from './helper';

let config: UserManagerSettings = {
  authority: '',
  client_id: '',
  redirect_uri: '',
};

config = {
  // the URL of our identity server
  authority: process.env.REACT_APP_AUTHORITY,
  // this ID maps to the client ID in the identity client configuration
  client_id: process.env.REACT_APP_CLIENT_ID,
  // URL to redirect to after login
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  response_type: process.env.REACT_APP_RESPONSE_TYPE,
  // the scopes or resources we would like access to
  scope: process.env.REACT_APP_SCOPE,
  // URL to redirect to after logout
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  //silent_redirect_uri: window.location.pathname,
  //automaticSilentRenew: true,
  silent_redirect_uri: window.location.pathname,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: localStorage }),
};
const userManager = new UserManager(config);

userManager.events.addAccessTokenExpiring(async function () {
  console.log('Access token expiring...');
  await renewAccessToken();
});

// userManager.events.addAccessTokenExpiring(async function () {
//   console.log('Access token expired. Attempting to renew...');
//   try {
//     //Attempt to use the refresh token to obtain a new access token
//     await renewAccessToken();
//   } catch (error) {
//     console.error('Failed to renew access token:', error);
//     //Handle the error, for example, redirect the user to login page
//     //or sign them out if refresh token is also expired
//     await signOutWhenTokenExpired();
//   }
// });

// initialise!
export { userManager };
