import axios from 'axios';

const prodServer = 'https://super.agendei.io/api/';
// const localServer = 'http://192.168.0.189:3000/api/';
const VERSION = 'v1';

export const api = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

export const login = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

// Add a request interceptor for api
api.interceptors.request.use((config) => {
  if (config.url === '/auth/sign_out') {
    window.sessionStorage.setItem('user', null);
    window.sessionStorage.setItem('salon', null);
    window.sessionStorage.setItem('agendeiAuth', null);
    return config;
  }
  const agendeiAuth = JSON.parse(window.sessionStorage.getItem('agendeiAuth')) || {};
  if (agendeiAuth && agendeiAuth.token) {
    const newConfig = config;
    const { headers } = newConfig;
    newConfig.headers = {
      ...headers,
      'access-token': agendeiAuth.token,
      client: agendeiAuth.client,
      uid: agendeiAuth.uid,
    };
    return newConfig;
  }
  window.location = '/login';
  return null;
}, error => Promise.reject(error));

// Add a response interceptor for others api requests
api.interceptors.response.use(response => response, (error) => {
  const { status } = error && error.response ? error.response : 0;
  if (status === 401 || status === 403) {
    window.sessionStorage.setItem('user', null);
    window.sessionStorage.setItem('salon', null);
    window.sessionStorage.setItem('agendeiAuth', null);
    window.location = '/login';
    return null;
  }
  return Promise.reject(error);
});

// Add a response interceptor for login
login.interceptors.response.use((response) => {
  const { data } = response;
  const user = { ...data };
  const agendeiAuthorization = {
    token: response.headers['access-token'],
    client: response.headers.client,
    uid: response.headers.uid,
  };
  window.sessionStorage.setItem(
    'agendeiAuth',
    JSON.stringify(agendeiAuthorization),
  );
  window.sessionStorage.setItem(
    'user',
    JSON.stringify(user),
  );
  window.sessionStorage.setItem(
    'salon',
    JSON.stringify(user.salon),
  );
  return response;
}, error => Promise.reject(error));
