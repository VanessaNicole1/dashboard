// TODO check this variable.
import { LESSON_PLAN_BASE_URL } from 'src/config-global';
import { PATH_AUTH } from '../routes/paths';
import axios from '../utils/axios';

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  
  const jwtDecoded = JSON.parse(jsonPayload);
  return jwtDecoded;
}

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// TODO: Check if this function meets our needs. 
export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    // alert('Token expired');
    localStorage.removeItem('accessToken');
    window.location.href = LESSON_PLAN_BASE_URL;
  }, timeLeft);
};

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
