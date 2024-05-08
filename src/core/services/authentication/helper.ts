import { logout, setAccessToken, setRefreshToken, silentLogin } from './authentication.service';
import { setItem } from 'core/services/common/storage/storage.service';

export const renewAccessToken = async () => {
  try {
    const result = await silentLogin();

    const accessToken = result.access_token;
    const refreshToken = result.refresh_token;
    setItem('expiry', result.expires_at * 1000);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    // If the item is expired, delete the item from storage
    // and return null

    return accessToken;
  } catch (error) {
    if (!navigator.onLine) {
      console.log(error);
    } else {
      localStorage.clear();
      logout();
    }

    return false;
  }
};

export const signOutWhenTokenExpired = async () => {
  try {
    localStorage.clear();
    logout();
    return;
  } catch (error) {}
};
